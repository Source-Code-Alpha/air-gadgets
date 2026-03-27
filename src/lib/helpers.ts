/**
 * Parse a product from the database, converting JSON string fields
 * back to their proper types for API responses.
 */
export function parseProduct(product: Record<string, unknown>) {
  return {
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    images: typeof product.images === "string" ? JSON.parse(product.images) : product.images,
    specs: typeof product.specs === "string" ? JSON.parse(product.specs) : product.specs,
  };
}

/**
 * Parse an order from the database, converting JSON string fields.
 */
export function parseOrder(order: Record<string, unknown>) {
  return {
    ...order,
    subtotal: Number(order.subtotal),
    shippingCost: Number(order.shippingCost),
    total: Number(order.total),
    shippingAddress: typeof order.shippingAddress === "string"
      ? JSON.parse(order.shippingAddress)
      : order.shippingAddress,
  };
}
