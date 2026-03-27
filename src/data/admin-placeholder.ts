// Admin placeholder data for Phase 2

export type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED";
export type PaymentStatus = "PENDING" | "PAID" | "REFUNDED";

export interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  items: {
    id: string;
    productName: string;
    productImage: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  subtotal: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  notes?: string;
  timeline: { status: string; date: string; note?: string }[];
  createdAt: string;
}

export interface MockProduct {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  sku: string;
  image: string;
  active: boolean;
  featured: boolean;
}

export interface MockCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  productCount: number;
  parentId?: string;
}

export const mockStats = {
  totalRevenue: 48750.00,
  revenueChange: 12.5,
  totalOrders: 156,
  ordersChange: 8.2,
  totalProducts: 42,
  productsChange: 3.1,
  totalCustomers: 89,
  customersChange: 15.3,
};

export const mockTopProducts = [
  { name: "Smart Home Hub Pro", sales: 45, revenue: 13455 },
  { name: "AI Security Camera 4K", sales: 38, revenue: 11362 },
  { name: "Smart Thermostat V3", sales: 32, revenue: 6368 },
  { name: "Wireless Mesh Router", sales: 28, revenue: 5572 },
  { name: "Smart Door Lock", sales: 24, revenue: 4776 },
];

export const mockProducts: MockProduct[] = [
  { id: "1", name: "Smart Home Hub Pro", slug: "smart-home-hub-pro", category: "Smart Hubs", price: 299.00, compareAtPrice: 349.00, stock: 45, sku: "SHH-001", image: "/placeholder-product.jpg", active: true, featured: true },
  { id: "2", name: "AI Security Camera 4K", slug: "ai-security-camera-4k", category: "Security", price: 199.00, stock: 32, sku: "ASC-002", image: "/placeholder-product.jpg", active: true, featured: true },
  { id: "3", name: "Smart Thermostat V3", slug: "smart-thermostat-v3", category: "Climate", price: 199.00, compareAtPrice: 249.00, stock: 18, sku: "ST-003", image: "/placeholder-product.jpg", active: true, featured: false },
  { id: "4", name: "Wireless Mesh Router", slug: "wireless-mesh-router", category: "Networking", price: 199.00, stock: 56, sku: "WMR-004", image: "/placeholder-product.jpg", active: true, featured: false },
  { id: "5", name: "Smart Door Lock", slug: "smart-door-lock", category: "Security", price: 199.00, stock: 22, sku: "SDL-005", image: "/placeholder-product.jpg", active: true, featured: true },
  { id: "6", name: "Robot Vacuum X1", slug: "robot-vacuum-x1", category: "Home Appliances", price: 499.00, compareAtPrice: 599.00, stock: 0, sku: "RV-006", image: "/placeholder-product.jpg", active: false, featured: false },
  { id: "7", name: "Smart Light Strip RGB", slug: "smart-light-strip-rgb", category: "Lighting", price: 49.00, stock: 120, sku: "SLS-007", image: "/placeholder-product.jpg", active: true, featured: false },
  { id: "8", name: "Voice Assistant Speaker", slug: "voice-assistant-speaker", category: "Smart Hubs", price: 129.00, stock: 67, sku: "VAS-008", image: "/placeholder-product.jpg", active: true, featured: false },
];

export const mockCategories: MockCategory[] = [
  { id: "1", name: "Smart Hubs", slug: "smart-hubs", description: "Central control units for your smart home ecosystem", productCount: 8 },
  { id: "2", name: "Security", slug: "security", description: "Smart cameras, locks, and alarm systems", productCount: 12 },
  { id: "3", name: "Climate", slug: "climate", description: "Thermostats, air purifiers, and climate control", productCount: 6 },
  { id: "4", name: "Networking", slug: "networking", description: "Routers, extenders, and mesh systems", productCount: 5 },
  { id: "5", name: "Lighting", slug: "lighting", description: "Smart bulbs, strips, and lighting controls", productCount: 9 },
  { id: "6", name: "Home Appliances", slug: "home-appliances", description: "Robot vacuums, smart plugs, and appliances", productCount: 4 },
];

export const mockOrders: MockOrder[] = [
  {
    id: "1",
    orderNumber: "AG-2026-0001",
    customerName: "Ahmed Hassan",
    customerEmail: "ahmed@example.com",
    customerPhone: "+20 100 123 4567",
    shippingAddress: { street: "15 Nile Street", city: "Cairo", state: "Cairo", zip: "11511", country: "Egypt" },
    items: [
      { id: "i1", productName: "Smart Home Hub Pro", productImage: "/placeholder-product.jpg", quantity: 1, unitPrice: 299.00, total: 299.00 },
      { id: "i2", productName: "Smart Light Strip RGB", productImage: "/placeholder-product.jpg", quantity: 2, unitPrice: 49.00, total: 98.00 },
    ],
    subtotal: 397.00,
    shippingCost: 25.00,
    total: 422.00,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    status: "PENDING",
    timeline: [
      { status: "PENDING", date: "2026-03-25T10:30:00Z", note: "Order placed" },
    ],
    createdAt: "2026-03-25T10:30:00Z",
  },
  {
    id: "2",
    orderNumber: "AG-2026-0002",
    customerName: "Sara Mohamed",
    customerEmail: "sara@example.com",
    customerPhone: "+20 101 234 5678",
    shippingAddress: { street: "42 October Bridge", city: "Giza", state: "Giza", zip: "12511", country: "Egypt" },
    items: [
      { id: "i3", productName: "AI Security Camera 4K", productImage: "/placeholder-product.jpg", quantity: 2, unitPrice: 199.00, total: 398.00 },
    ],
    subtotal: 398.00,
    shippingCost: 25.00,
    total: 423.00,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    status: "PROCESSING",
    timeline: [
      { status: "PENDING", date: "2026-03-24T14:00:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2026-03-24T16:30:00Z", note: "Payment confirmed, preparing shipment" },
    ],
    createdAt: "2026-03-24T14:00:00Z",
  },
  {
    id: "3",
    orderNumber: "AG-2026-0003",
    customerName: "Omar Khalil",
    customerEmail: "omar@example.com",
    customerPhone: "+20 102 345 6789",
    shippingAddress: { street: "8 Corniche Road", city: "Alexandria", state: "Alexandria", zip: "21500", country: "Egypt" },
    items: [
      { id: "i4", productName: "Smart Thermostat V3", productImage: "/placeholder-product.jpg", quantity: 1, unitPrice: 199.00, total: 199.00 },
      { id: "i5", productName: "Smart Door Lock", productImage: "/placeholder-product.jpg", quantity: 1, unitPrice: 199.00, total: 199.00 },
    ],
    subtotal: 398.00,
    shippingCost: 35.00,
    total: 433.00,
    paymentMethod: "COD",
    paymentStatus: "PAID",
    status: "SHIPPED",
    timeline: [
      { status: "PENDING", date: "2026-03-22T09:00:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2026-03-22T11:00:00Z", note: "Payment confirmed" },
      { status: "SHIPPED", date: "2026-03-23T08:00:00Z", note: "Shipped via Express — tracking #EG123456" },
    ],
    createdAt: "2026-03-22T09:00:00Z",
  },
  {
    id: "4",
    orderNumber: "AG-2026-0004",
    customerName: "Fatima Ali",
    customerEmail: "fatima@example.com",
    customerPhone: "+20 103 456 7890",
    shippingAddress: { street: "22 El Tahrir St", city: "Cairo", state: "Cairo", zip: "11511", country: "Egypt" },
    items: [
      { id: "i6", productName: "Robot Vacuum X1", productImage: "/placeholder-product.jpg", quantity: 1, unitPrice: 499.00, total: 499.00 },
    ],
    subtotal: 499.00,
    shippingCost: 0.00,
    total: 499.00,
    paymentMethod: "COD",
    paymentStatus: "PAID",
    status: "DELIVERED",
    timeline: [
      { status: "PENDING", date: "2026-03-18T12:00:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2026-03-18T14:00:00Z", note: "Payment confirmed" },
      { status: "SHIPPED", date: "2026-03-19T09:00:00Z", note: "Shipped" },
      { status: "DELIVERED", date: "2026-03-21T15:00:00Z", note: "Delivered successfully" },
    ],
    createdAt: "2026-03-18T12:00:00Z",
  },
  {
    id: "5",
    orderNumber: "AG-2026-0005",
    customerName: "Youssef Ibrahim",
    customerEmail: "youssef@example.com",
    customerPhone: "+20 104 567 8901",
    shippingAddress: { street: "5 Canal Street", city: "Ismailia", state: "Ismailia", zip: "41511", country: "Egypt" },
    items: [
      { id: "i7", productName: "Voice Assistant Speaker", productImage: "/placeholder-product.jpg", quantity: 3, unitPrice: 129.00, total: 387.00 },
    ],
    subtotal: 387.00,
    shippingCost: 30.00,
    total: 417.00,
    paymentMethod: "COD",
    paymentStatus: "REFUNDED",
    status: "CANCELLED",
    timeline: [
      { status: "PENDING", date: "2026-03-20T10:00:00Z", note: "Order placed" },
      { status: "CANCELLED", date: "2026-03-20T18:00:00Z", note: "Cancelled by customer" },
    ],
    createdAt: "2026-03-20T10:00:00Z",
  },
  {
    id: "6",
    orderNumber: "AG-2026-0006",
    customerName: "Nour Adel",
    customerEmail: "nour@example.com",
    customerPhone: "+20 105 678 9012",
    shippingAddress: { street: "17 Zamalek St", city: "Cairo", state: "Cairo", zip: "11211", country: "Egypt" },
    items: [
      { id: "i8", productName: "Wireless Mesh Router", productImage: "/placeholder-product.jpg", quantity: 1, unitPrice: 199.00, total: 199.00 },
      { id: "i9", productName: "Smart Light Strip RGB", productImage: "/placeholder-product.jpg", quantity: 4, unitPrice: 49.00, total: 196.00 },
    ],
    subtotal: 395.00,
    shippingCost: 25.00,
    total: 420.00,
    paymentMethod: "COD",
    paymentStatus: "PENDING",
    status: "PROCESSING",
    timeline: [
      { status: "PENDING", date: "2026-03-25T08:00:00Z", note: "Order placed" },
      { status: "PROCESSING", date: "2026-03-25T10:00:00Z", note: "Preparing order" },
    ],
    createdAt: "2026-03-25T08:00:00Z",
  },
];
