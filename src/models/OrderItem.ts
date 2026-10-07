export class OrderItem {
  private id?: string;
  private order_id: string;
  private product_id: string;
  private quantity: number;
  private unit_price: number;

  constructor(order_id: string, product_id: string, quantity: number, unit_price: number, id?: string) {
    this.id = id;
    this.order_id = order_id;
    this.product_id = product_id;
    this.quantity = quantity;
    this.unit_price = unit_price;
  }

  getId(): string | undefined { return this.id; }
  getOrderId(): string { return this.order_id; }
  getProductId(): string { return this.product_id; }
  getQuantity(): number { return this.quantity; }
  getUnitPrice(): number { return this.unit_price; }

  toObject() {
    return {
      id: this.id,
      order_id: this.order_id,
      product_id: this.product_id,
      quantity: this.quantity,
      unit_price: this.unit_price,
    };
  }
}
