"use client";

import { useState } from "react";
import { Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const inputClass =
  "border-[#1f2937] bg-[#0a0a0a] text-white placeholder:text-gray-500 focus-visible:ring-[#0080FF]";

export default function SettingsPage() {
  const [storeName, setStoreName] = useState("Air Gadgets");
  const [storeDescription, setStoreDescription] = useState(
    "Premium smart home gadgets and automation systems"
  );
  const [contactEmail, setContactEmail] = useState("hello@airgadgets.com");
  const [phone, setPhone] = useState("+20 100 000 0000");
  const [flatRate, setFlatRate] = useState("25");
  const [freeThreshold, setFreeThreshold] = useState("500");

  const handleSave = () => {
    alert("Settings saved (placeholder)");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Settings</h2>
        <p className="text-sm text-gray-400">
          Manage your store configuration
        </p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Store Settings */}
        <Card className="border-[#1f2937] bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Store Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Store Name</Label>
              <Input
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Store Description</Label>
              <Textarea
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                rows={3}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Contact Email</Label>
              <Input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">Phone</Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={inputClass}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Settings */}
        <Card className="border-[#1f2937] bg-[#111827]">
          <CardHeader>
            <CardTitle className="text-white">Shipping</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-gray-300">Flat Rate Shipping ($)</Label>
              <Input
                type="number"
                value={flatRate}
                onChange={(e) => setFlatRate(e.target.value)}
                className={inputClass}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-gray-300">
                Free Shipping Threshold ($)
              </Label>
              <Input
                type="number"
                value={freeThreshold}
                onChange={(e) => setFreeThreshold(e.target.value)}
                className={inputClass}
              />
              <p className="text-xs text-gray-500">
                Orders above this amount qualify for free shipping
              </p>
            </div>
          </CardContent>
        </Card>

        <Button
          onClick={handleSave}
          className="bg-[#0080FF] hover:bg-[#0066CC]"
        >
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
}
