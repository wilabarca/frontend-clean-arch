import { Book } from "../Data/Models/Book";
import { BookDTO } from "../Data/Models/BookTO";
import { BookRepository } from "../Data/Repository/BookRepository";

export class CreateBookUseCase {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async execute(book: Book): Promise<BookDTO | null> {
    try {
      const response = await this.bookRepository.create(book);
      return response ? new BookDTO(response.id, response.title, response.year) : null;
    } catch (error) {
      throw new Error("Error en el caso de uso: " + (error as Error).message);
    }
  }
}
