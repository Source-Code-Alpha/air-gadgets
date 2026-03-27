"use client";

import { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Package,
  ArrowRight,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type OrderStatus = "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  CONFIRMED: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  PROCESSING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

interface Stats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  recentOrders: {
    id: string;
    orderNumber: string;
    customerName: string;
    total: number;
    status: OrderStatus;
    createdAt: string;
  }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => setStats(data))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center text-gray-400">Failed to load stats</div>
    );
  }

  const statCards = [
    {
      label: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      icon: DollarSign,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      label: "Total Orders",
      value: stats.totalOrders.toString(),
      icon: ShoppingCart,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      label: "Total Products",
      value: stats.totalProducts.toString(),
      icon: Package,
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="border-[#1f2937] bg-[#111827]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${stat.bg}`}
                  >
                    <Icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-sm text-gray-400">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Orders */}
      <Card className="border-[#1f2937] bg-[#111827]">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Recent Orders</CardTitle>
          <Link
            href="/admin/orders"
            className="flex items-center gap-1 text-sm text-[#0080FF] hover:underline"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#1f2937] hover:bg-transparent">
                <TableHead className="text-gray-400">Order</TableHead>
                <TableHead className="text-gray-400">Customer</TableHead>
                <TableHead className="text-gray-400">Total</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {stats.recentOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-gray-500">
                    No orders yet
                  </TableCell>
                </TableRow>
              ) : (
                stats.recentOrders.map((order) => (
                  <TableRow
                    key={order.id}
                    className="border-[#1f2937] hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      <Link href={`/admin/orders/${order.id}`} className="hover:text-[#0080FF]">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {order.customerName}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusColors[order.status] || ""}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
