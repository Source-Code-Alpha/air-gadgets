"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Eye, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  total: number;
  status: string;
  paymentStatus: string;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  CONFIRMED: "bg-cyan-500/10 text-cyan-500 border-cyan-500/20",
  PROCESSING: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  SHIPPED: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  DELIVERED: "bg-green-500/10 text-green-500 border-green-500/20",
  CANCELLED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const paymentColors: Record<string, string> = {
  PENDING: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
  PAID: "bg-green-500/10 text-green-500 border-green-500/20",
  REFUNDED: "bg-red-500/10 text-red-500 border-red-500/20",
};

const tabs = ["All", "PENDING", "PROCESSING", "SHIPPED", "DELIVERED"] as const;

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState<string>("All");
  const [loading, setLoading] = useState(true);

  const fetchOrders = useCallback(async () => {
    try {
      const statusParam = activeTab !== "All" ? `&status=${activeTab}` : "";
      const res = await fetch(`/api/admin/orders?limit=50${statusParam}`);
      const data = await res.json();
      setOrders(data.orders || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    setLoading(true);
    fetchOrders();
  }, [fetchOrders]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Orders</h2>
        <p className="text-sm text-gray-400">Track and manage customer orders</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="border border-[#1f2937] bg-[#111827]">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab}
              value={tab}
              className="text-gray-400 data-[state=active]:bg-[#0080FF]/10 data-[state=active]:text-[#0080FF]"
            >
              {tab === "All" ? "All" : tab.charAt(0) + tab.slice(1).toLowerCase()}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <Card className="border-[#1f2937] bg-[#111827]">
        <CardContent className="p-0">
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-6 w-6 animate-spin text-[#0080FF]" />
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="border-[#1f2937] hover:bg-transparent">
                  <TableHead className="text-gray-400">Order #</TableHead>
                  <TableHead className="text-gray-400">Customer</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Total</TableHead>
                  <TableHead className="text-gray-400">Payment</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="border-[#1f2937] hover:bg-white/5">
                    <TableCell className="font-medium text-white">
                      <Link href={`/admin/orders/${order.id}`} className="hover:text-[#0080FF]">
                        {order.orderNumber}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="text-sm text-gray-300">{order.customerName}</p>
                        <p className="text-xs text-gray-500">{order.customerEmail}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="font-medium text-gray-300">
                      ${order.total.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={paymentColors[order.paymentStatus] || ""}>
                        {order.paymentStatus}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusColors[order.status] || ""}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="icon" asChild className="h-8 w-8 text-gray-400 hover:text-white">
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {orders.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={7} className="py-8 text-center text-gray-500">
                      No orders found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
