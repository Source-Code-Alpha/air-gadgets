"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plus, Trash2, Upload, ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

export default function NewProductPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [sku, setSku] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [featured, setFeatured] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [specs, setSpecs] = useState<{ key: string; value: string }[]>([
    { key: "", value: "" },
  ]);
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories")
      .then((r) => r.json())
      .then((data) => setCategories(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  const handleNameChange = useCallback((val: string) => {
    setName(val);
    setSlug(slugify(val));
  }, []);

  const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
  const removeSpec = (index: number) => setSpecs(specs.filter((_, i) => i !== index));
  const updateSpec = (index: number, field: "key" | "value", val: string) => {
    const updated = [...specs];
    updated[index][field] = val;
    setSpecs(updated);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const data = await res.json();
        if (data.url) {
          setImages((prev) => [...prev, data.url]);
        }
      }
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    const newErrors: Record<string, boolean> = {};
    if (!name.trim()) newErrors.name = true;
    if (!price.trim()) newErrors.price = true;
    if (!sku.trim()) newErrors.sku = true;
    if (!category) newErrors.category = true;
    if (!description.trim()) newErrors.description = true;
    if (!shortDescription.trim()) newErrors.shortDescription = true;

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSaving(true);
    try {
      const specsObj: Record<string, string> = {};
      specs.forEach((s) => {
        if (s.key.trim() && s.value.trim()) {
          specsObj[s.key.trim()] = s.value.trim();
        }
      });

      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          slug: slug || slugify(name),
          description,
          shortDescription,
          price: parseFloat(price),
          compareAtPrice: compareAtPrice ? parseFloat(compareAtPrice) : null,
          sku,
          stock: parseInt(stock) || 0,
          images,
          specs: Object.keys(specsObj).length > 0 ? specsObj : null,
          featured,
          active: true,
          categoryId: category,
        }),
      });

      if (res.ok) {
        router.push("/admin/products");
      } else {
        const data = await res.json();
        alert(data.error || "Failed to save product");
      }
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save product");
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "border-[#1f2937] bg-[#0a0a0a] text-white placeholder:text-gray-500 focus-visible:ring-[#0080FF]";
  const errorBorder = "border-red-500";

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild className="text-gray-400 hover:text-white">
          <Link href="/admin/products">
            <ArrowLeft className="h-5 w-5" />
          </Link>
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-white">Add New Product</h2>
          <p className="text-sm text-gray-400">Fill in the details to create a new product</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader>
              <CardTitle className="text-white">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Product Name <span className="text-red-500">*</span></Label>
                <Input value={name} onChange={(e) => handleNameChange(e.target.value)} placeholder="e.g. Smart Home Hub Pro" className={`${inputClass} ${errors.name ? errorBorder : ""}`} />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Slug</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto-generated-from-name" className={inputClass} />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Short Description <span className="text-red-500">*</span></Label>
                <Input value={shortDescription} onChange={(e) => setShortDescription(e.target.value)} placeholder="Brief product summary" className={`${inputClass} ${errors.shortDescription ? errorBorder : ""}`} />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Full Description <span className="text-red-500">*</span></Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Detailed product description..." rows={5} className={`${inputClass} ${errors.description ? errorBorder : ""}`} />
              </div>
            </CardContent>
          </Card>

          {/* Images */}
          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader>
              <CardTitle className="text-white">Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              {images.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-3">
                  {images.map((img, i) => (
                    <div key={i} className="group relative h-24 w-24 overflow-hidden rounded-lg border border-[#1f2937]">
                      <Image src={img} alt={`Product ${i + 1}`} fill className="object-cover" sizes="96px" />
                      <button
                        onClick={() => setImages((prev) => prev.filter((_, idx) => idx !== i))}
                        className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity group-hover:opacity-100"
                      >
                        <Trash2 className="h-4 w-4 text-red-400" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <input ref={fileInputRef} type="file" accept="image/*" multiple onChange={handleUpload} className="hidden" />
              <div
                onClick={() => fileInputRef.current?.click()}
                className="flex min-h-[150px] cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-[#1f2937] bg-[#0a0a0a] transition-colors hover:border-[#0080FF]/50"
              >
                <div className="flex flex-col items-center gap-2 p-6 text-center">
                  {uploading ? (
                    <Loader2 className="h-8 w-8 animate-spin text-[#0080FF]" />
                  ) : (
                    <>
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#1f2937]">
                        <Upload className="h-5 w-5 text-gray-400" />
                      </div>
                      <p className="text-sm font-medium text-gray-300">Click to upload images</p>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Specs */}
          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Specifications</CardTitle>
              <Button variant="outline" size="sm" onClick={addSpec} className="border-[#1f2937] text-gray-300 hover:bg-white/5">
                <Plus className="mr-1 h-4 w-4" />Add
              </Button>
            </CardHeader>
            <CardContent className="space-y-3">
              {specs.map((spec, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Input placeholder="Key" value={spec.key} onChange={(e) => updateSpec(i, "key", e.target.value)} className={inputClass} />
                  <Input placeholder="Value" value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)} className={inputClass} />
                  <Button variant="ghost" size="icon" onClick={() => removeSpec(i)} className="h-9 w-9 shrink-0 text-gray-400 hover:text-red-500" disabled={specs.length === 1}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader><CardTitle className="text-white">Pricing</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Price <span className="text-red-500">*</span></Label>
                <Input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className={`${inputClass} ${errors.price ? errorBorder : ""}`} />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Compare At Price</Label>
                <Input type="number" value={compareAtPrice} onChange={(e) => setCompareAtPrice(e.target.value)} placeholder="0.00" className={inputClass} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader><CardTitle className="text-white">Inventory</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">SKU <span className="text-red-500">*</span></Label>
                <Input value={sku} onChange={(e) => setSku(e.target.value)} placeholder="e.g. SHH-001" className={`${inputClass} ${errors.sku ? errorBorder : ""}`} />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-300">Stock</Label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="0" className={inputClass} />
              </div>
            </CardContent>
          </Card>

          <Card className="border-[#1f2937] bg-[#111827]">
            <CardHeader><CardTitle className="text-white">Organization</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-gray-300">Category <span className="text-red-500">*</span></Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className={`${inputClass} ${errors.category ? errorBorder : ""}`}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="border-[#1f2937] bg-[#111827]">
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id} className="text-gray-300 focus:bg-white/10 focus:text-white">
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(checked === true)} className="border-[#1f2937] data-[state=checked]:bg-[#0080FF] data-[state=checked]:border-[#0080FF]" />
                <Label htmlFor="featured" className="text-gray-300">Featured product</Label>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Button onClick={handleSave} disabled={saving} className="flex-1 bg-[#0080FF] hover:bg-[#0066CC]">
              {saving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : "Save Product"}
            </Button>
            <Button variant="outline" asChild className="border-[#1f2937] text-gray-300 hover:bg-white/5">
              <Link href="/admin/products">Cancel</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
