import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      items,
      notes,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !shippingAddress || !items?.length) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Fetch products and validate stock
    const productIds = items.map((item: { productId: string }) => item.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds } },
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { error: "Some products not found" },
        { status: 400 }
      );
    }

    // Check stock
    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        return NextResponse.json(
          { error: `Product not found: ${item.productId}` },
          { status: 400 }
        );
      }
      if (product.stock < item.quantity) {
        return NextResponse.json(
          { error: `Insufficient stock for ${product.name}. Available: ${product.stock}` },
          { status: 400 }
        );
      }
    }

    // Calculate totals
    let subtotal = 0;
    const orderItems = items.map((item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId)!;
      const unitPrice = Number(product.price);
      const total = unitPrice * item.quantity;
      subtotal += total;
      return {
        productId: item.productId,
        quantity: item.quantity,
        unitPrice,
        total,
      };
    });

    const shippingCost = subtotal >= 200 ? 0 : 15;
    const total = subtotal + shippingCost;

    // Generate order number
    const orderNumber = `AG-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;

    // Create order in transaction
    const order = await prisma.$transaction(async (tx) => {
      // Create the order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress: JSON.stringify(shippingAddress),
          subtotal,
          shippingCost,
          total,
          notes: notes || null,
          items: {
            create: orderItems,
          },
        },
        include: {
          items: {
            include: { product: true },
          },
        },
      });

      // Decrease stock
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } },
        });
      }

      return newOrder;
    });

    return NextResponse.json(
      {
        orderNumber: order.orderNumber,
        total: Number(order.total),
        status: order.status,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
