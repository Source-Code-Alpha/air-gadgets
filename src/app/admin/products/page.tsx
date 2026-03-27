"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Plus, Search, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  compareAtPrice: number | null;
  stock: number;
  sku: string;
  images: string[];
  active: boolean;
  featured: boolean;
  category: { id: string; name: string };
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    try {
      const res = await fetch(`/api/admin/products?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setProducts(data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timer = setTimeout(fetchProducts, 300);
    return () => clearTimeout(timer);
  }, [fetchProducts]);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    try {
      await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <p className="text-sm text-gray-400">Manage your product catalog</p>
        </div>
        <Button asChild className="bg-[#0080FF] hover:bg-[#0066CC]">
          <Link href="/admin/products/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <Card className="border-[#1f2937] bg-[#111827]">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search products by name or SKU..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-[#1f2937] bg-[#0a0a0a] pl-10 text-white placeholder:text-gray-500"
            />
          </div>
        </CardContent>
      </Card>

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
                  <TableHead className="text-gray-400">Name</TableHead>
                  <TableHead className="text-gray-400">Category</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Stock</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-right text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id} className="border-[#1f2937] hover:bg-white/5">
                    <TableCell>
                      <div>
                        <p className="font-medium text-white">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sku}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {product.category?.name}
                    </TableCell>
                    <TableCell className="text-gray-300">
                      ${product.price.toFixed(2)}
                      {product.compareAtPrice && (
                        <span className="ml-2 text-xs text-gray-500 line-through">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-500"
                            : product.stock < 20
                            ? "text-yellow-500"
                            : "text-gray-300"
                        }
                      >
                        {product.stock}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          product.active
                            ? "border-green-500/20 bg-green-500/10 text-green-500"
                            : "border-gray-500/20 bg-gray-500/10 text-gray-500"
                        }
                      >
                        {product.active ? "Active" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-red-500"
                          onClick={() => handleDelete(product.id, product.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
                {products.length === 0 && !loading && (
                  <TableRow>
                    <TableCell colSpan={6} className="py-8 text-center text-gray-500">
                      No products found
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
