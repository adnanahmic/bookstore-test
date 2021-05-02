export class CreateBookDTO {
  title: string;
  description: string;
  cover: string;
  price: number;
  author?: string;
}

export class UpdateBookDTO {
  title?: string;
  description?: string;
  cover?: string;
  price?: number;
}
