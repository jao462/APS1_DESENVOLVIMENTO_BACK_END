export class Product {
  private id?: string;
  private category_id: string;
  private title: string;
  private description: string;
  private price: number;
  private image?: string;
  private available: boolean;
  private active: boolean;

  constructor(
    category_id: string,
    title: string,
    description: string,
    price: number,
    image?: string,
    available = true,
    active = true,
    id?: string,
  ) {
    this.id = id;
    this.category_id = category_id;
    this.title = title;
    this.description = description;
    this.price = price;
    this.image = image;
    this.available = available;
    this.active = active;
  }

  getId(): string | undefined { return this.id; }
  getCategoryId(): string { return this.category_id; }
  getTitle(): string { return this.title; }
  getDescription(): string { return this.description; }
  getPrice(): number { return this.price; }
  isAvailable(): boolean { return this.available; }
  isActive(): boolean { return this.active; }

  toObject() {
    return {
      id: this.id,
      category_id: this.category_id,
      title: this.title,
      description: this.description,
      price: this.price,
      image: this.image,
      available: this.available,
      active: this.active,
    };
  }
}
