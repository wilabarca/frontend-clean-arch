
import { BookDTO } from "../Data/Models/BookTO";
import { BookRepository } from "../Data/Repository/BookRepository";

export class GetAllBooksUseCase {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async execute(): Promise<BookDTO[]> {
    try {
      return await this.bookRepository.getAll();
    } catch (error) {
      throw new Error("Error al obtener libros: " + (error as Error).message);
    }
  }
}
