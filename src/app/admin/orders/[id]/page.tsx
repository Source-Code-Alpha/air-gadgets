"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderItem {
  id: string;
  quantity: number;
  unitPrice: number;
  total: number;
  product: {
    name: string;
    images: string[];
  };
}

interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: { street: string; city: string; state: string; zip: string; country: string };
  items: OrderItem[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  status: string;
  notes: string | null;
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

const allStatuses = ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED", "CANCELLED"];

export default function OrderDetailPage() {
  const params = useParams();
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    fetch(`/api/admin/orders/${params.id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setOrder(null);
        } else {
          setOrder(data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  const handleUpdateStatus = async () => {
    if (!newStatus || !order) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/orders/${order.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setOrder((prev) => prev ? { ...prev, status: newStatus } : null);
        setNewStatus("");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-lg text-gray-400">Order not found</p>
        <Button asChild variant="link" className="mt-4 text-[#0080FF]">
          <Link href="/admin/orders">Back to Orders</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
            <Link href="/admin/orders"><ArrowLeft className="h-5 w-5" /></Link>
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-bold text-white">{order.orderNumber}</h2>
              <Badge variant="outline" className={statusColors[order.status] || ""}>
                {order.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-400">
              Placed on {new Date(order.createdAt).toLocaleDateString("en-US", {
                year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
              })}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select value={newStatus} onValueChange={setNewStatus}>
            <SelectTrigger className="w-[180px] border-[#1f2937] bg-[#0a0a0a] text-white">
              <SelectValue placeholder="Update status" />
            </SelectTrigger>
            <SelectContent className="border-[#1f2937] bg-[#111827]">
              {allStatuses.map((s) => (
                <SelectItem key={s} value={s} className="text-gray-300 focus:bg-white/10 focus:text-white">
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            className="bg-[#0080FF] hover:bg-[#0066CC]"
            disabled={!newStatus || updating}
            onClick={handleUpdateStatus}
          >
            {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Update"}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader>
              <CardTitle className="text-white">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-[#1f2937] hover:bg-transparent">
                    <TableHead className="text-gray-400">Product</TableHead>
                    <TableHead className="text-center text-gray-400">Qty</TableHead>
                    <TableHead className="text-right text-gray-400">Unit Price</TableHead>
                    <TableHead className="text-right text-gray-400">Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.id} className="border-[#1f2937] hover:bg-white/5">
                      <TableCell>
                        <span className="font-medium text-white">{item.product.name}</span>
                      </TableCell>
                      <TableCell className="text-center text-gray-300">{item.quantity}</TableCell>
                      <TableCell className="text-right text-gray-300">${item.unitPrice.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium text-white">${item.total.toFixed(2)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="border-t border-[#1f2937] p-4">
                <div className="ml-auto w-64 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-gray-300">${order.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shipping</span>
                    <span className="text-gray-300">
                      {order.shippingCost === 0 ? "Free" : `$${order.shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <Separator className="bg-[#1f2937]" />
                  <div className="flex justify-between font-medium">
                    <span className="text-white">Total</span>
                    <span className="text-white">${order.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader><CardTitle className="text-white">Customer</CardTitle></CardHeader>
            <CardContent className="space-y-1">
              <p className="text-sm font-medium text-white">{order.customerName}</p>
              <p className="text-sm text-gray-400">{order.customerEmail}</p>
              <p className="text-sm text-gray-400">{order.customerPhone}</p>
            </CardContent>
          </Card>

          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader><CardTitle className="text-white">Shipping Address</CardTitle></CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                {order.shippingAddress.street}<br />
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                {order.shippingAddress.country}
              </p>
            </CardContent>
          </Card>

          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader><CardTitle className="text-white">Payment</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Method</span>
                <span className="text-gray-300">{order.paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Status</span>
                <Badge
                  variant="outline"
                  className={
                    order.paymentStatus === "PAID" ? "border-green-500/20 bg-green-500/10 text-green-500"
                    : order.paymentStatus === "REFUNDED" ? "border-red-500/20 bg-red-500/10 text-red-500"
                    : "border-yellow-500/20 bg-yellow-500/10 text-yellow-500"
                  }
                >
                  {order.paymentStatus}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {order.notes && (
            <Card className="border-[#1f2937] bg-[#111827]">
              <CardHeader><CardTitle className="text-white">Notes</CardTitle></CardHeader>
              <CardContent>
                <p className="text-sm text-gray-300">{order.notes}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
