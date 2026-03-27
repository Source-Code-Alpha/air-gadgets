"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  productCount: number;
  parentId: string | null;
}

const inputClass =
  "border-[#1f2937] bg-[#0a0a0a] text-white placeholder:text-gray-500 focus-visible:ring-[#0080FF]";

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [catName, setCatName] = useState("");
  const [catSlug, setCatSlug] = useState("");
  const [catDesc, setCatDesc] = useState("");
  const [catParent, setCatParent] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/categories");
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleNameChange = (val: string) => {
    setCatName(val);
    if (!editingId) setCatSlug(slugify(val));
  };

  const openCreate = () => {
    setEditingId(null);
    setCatName("");
    setCatSlug("");
    setCatDesc("");
    setCatParent("");
    setDialogOpen(true);
  };

  const openEdit = (cat: Category) => {
    setEditingId(cat.id);
    setCatName(cat.name);
    setCatSlug(cat.slug);
    setCatDesc(cat.description || "");
    setCatParent(cat.parentId || "");
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!catName.trim()) return;
    setSaving(true);
    try {
      const body = {
        name: catName,
        slug: catSlug || slugify(catName),
        description: catDesc || null,
        parentId: catParent && catParent !== "none" ? catParent : null,
      };

      if (editingId) {
        await fetch(`/api/admin/categories/${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        await fetch("/api/admin/categories", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      setDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Error saving category:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Delete "${name}"? Products in this category will be affected.`)) return;
    try {
      await fetch(`/api/admin/categories/${id}`, { method: "DELETE" });
      setCategories((prev) => prev.filter((c) => c.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Categories</h2>
          <p className="text-sm text-gray-400">Organize your product catalog</p>
        </div>
        <Button onClick={openCreate} className="bg-[#0080FF] hover:bg-[#0066CC]">
          <Plus className="mr-2 h-4 w-4" />
          Add Category
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="border-[#1f2937] bg-[#111827] text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white">
              {editingId ? "Edit Category" : "Add Category"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Name</Label>
              <Input value={catName} onChange={(e) => handleNameChange(e.target.value)} placeholder="Category name" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Slug</Label>
              <Input value={catSlug} onChange={(e) => setCatSlug(e.target.value)} placeholder="auto-generated" className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Description</Label>
              <Textarea value={catDesc} onChange={(e) => setCatDesc(e.target.value)} placeholder="Category description..." rows={3} className={inputClass} />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Parent Category (optional)</Label>
              <Select value={catParent} onValueChange={setCatParent}>
                <SelectTrigger className={inputClass}>
                  <SelectValue placeholder="None" />
                </SelectTrigger>
                <SelectContent className="border-[#1f2937] bg-[#111827]">
                  <SelectItem value="none" className="text-gray-300 focus:bg-white/10 focus:text-white">None</SelectItem>
                  {categories.filter((c) => c.id !== editingId).map((cat) => (
                    <SelectItem key={cat.id} value={cat.id} className="text-gray-300 focus:bg-white/10 focus:text-white">
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="border-[#1f2937] text-gray-300 hover:bg-white/5">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSave} disabled={saving} className="bg-[#0080FF] hover:bg-[#0066CC]">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : editingId ? "Update" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="border-[#1f2937] bg-[#111827]">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-[#1f2937] hover:bg-transparent">
                <TableHead className="text-gray-400">Name</TableHead>
                <TableHead className="text-gray-400">Slug</TableHead>
                <TableHead className="text-gray-400">Products</TableHead>
                <TableHead className="text-right text-gray-400">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id} className="border-[#1f2937] hover:bg-white/5">
                  <TableCell>
                    <p className="font-medium text-white">{cat.name}</p>
                    <p className="text-xs text-gray-500">{cat.description}</p>
                  </TableCell>
                  <TableCell className="text-gray-400">{cat.slug}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-[#1f2937] text-gray-300">
                      {cat.productCount} products
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white" onClick={() => openEdit(cat)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-red-500" onClick={() => handleDelete(cat.id, cat.name)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {categories.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-gray-500">No categories found</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
