export class Category {
  private id?: string;
  private name: string;
  private description?: string;
  private active: boolean;

  constructor(name: string, description?: string, active = true, id?: string) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.active = active;
  }

  getId(): string | undefined { return this.id; }
  getName(): string { return this.name; }
  getDescription(): string | undefined { return this.description; }
  isActive(): boolean { return this.active; }

  toObject() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      active: this.active,
    };
  }
}
