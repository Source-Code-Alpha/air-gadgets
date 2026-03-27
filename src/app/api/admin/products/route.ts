import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { Prisma } from "@prisma/client";
import { parseProduct } from "@/lib/helpers";

export async function GET(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");

    const where: Prisma.ProductWhereInput = search
      ? {
          OR: [
            { name: { contains: search } },
            { sku: { contains: search } },
          ],
        }
      : {};

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return NextResponse.json({
      products: products.map((p) => parseProduct(p as unknown as Record<string, unknown>)),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const body = await request.json();
    const {
      name,
      slug,
      description,
      shortDescription,
      price,
      compareAtPrice,
      sku,
      stock,
      images,
      specs,
      featured,
      active,
      categoryId,
    } = body;

    if (!name || !slug || !description || !shortDescription || !price || !sku || !categoryId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        slug,
        description,
        shortDescription,
        price,
        compareAtPrice: compareAtPrice || null,
        sku,
        stock: stock || 0,
        images: JSON.stringify(images || []),
        specs: specs ? JSON.stringify(specs) : null,
        featured: featured || false,
        active: active !== undefined ? active : true,
        categoryId,
      },
      include: { category: true },
    });

    return NextResponse.json(
      parseProduct(product as unknown as Record<string, unknown>),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating product:", error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return NextResponse.json(
          { error: "Product with this slug or SKU already exists" },
          { status: 409 }
        );
      }
    }
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
