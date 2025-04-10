import { Book } from "../Models/Book";
import { BookDTO } from "../Models/BookTO";

export class BookRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    if (!this.baseUrl) throw new Error("VITE_API_URL no configurada");
  }

  async create(book: Book): Promise<BookDTO> {
    const response = await fetch(`${this.baseUrl}/Book`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: book.title, year: book.year }),
    });
    return this.handleResponse(response);
  }

  async getAll(): Promise<BookDTO[]> {
    const response = await fetch(`${this.baseUrl}/Book`);
    return this.handleResponse(response);
  }

  async delete(bookId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Book/${bookId}`, {
      method: "DELETE",
    });
    await this.handleResponse(response);
  }

  async update(book: Book): Promise<BookDTO> {
    if (!book.id) throw new Error("ID de libro inválido");

    const response = await fetch(`${this.baseUrl}/Book/${book.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: book.title,
        year: book.year,
      }),
    });

    const data = await this.handleResponse(response);
    return new BookDTO(data.id, data.title, data.year);
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en la solicitud");
    }
    return response.json();
  }
}
