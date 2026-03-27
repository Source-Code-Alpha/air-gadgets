import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function GET() {
  const authError = await requireAdmin();
  if (authError) return authError;

  try {
    const [
      totalProducts,
      totalOrders,
      revenueResult,
      recentOrders,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.order.count(),
      prisma.order.aggregate({
        _sum: { total: true },
        where: {
          status: { not: "CANCELLED" },
        },
      }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          items: {
            include: { product: true },
          },
        },
      }),
    ]);

    const totalRevenue = Number(revenueResult._sum.total || 0);

    return NextResponse.json({
      totalRevenue,
      totalOrders,
      totalProducts,
      recentOrders: recentOrders.map((o) => ({
        ...o,
        subtotal: Number(o.subtotal),
        shippingCost: Number(o.shippingCost),
        total: Number(o.total),
        items: o.items.map((item) => ({
          ...item,
          unitPrice: Number(item.unitPrice),
          total: Number(item.total),
        })),
      })),
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
