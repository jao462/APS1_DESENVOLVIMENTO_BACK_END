export type OrderStatus = "pending" | "preparing" | "ready" | "completed" | "cancelled";

export class Order {
  private id?: string;
  private customer_name: string;
  private status: OrderStatus;

  constructor(customer_name: string, status: OrderStatus = "pending", id?: string) {
    this.id = id;
    this.customer_name = customer_name;
    this.status = status;
  }

  getId(): string | undefined { return this.id; }
  getCustomerName(): string { return this.customer_name; }
  getStatus(): OrderStatus { return this.status; }

  toObject() {
    return {
      id: this.id,
      customer_name: this.customer_name,
      status: this.status,
    };
  }
}
