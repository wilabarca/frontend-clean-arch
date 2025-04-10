import { BookRepository } from "../Data/Repository/BookRepository";

export class DeleteBookUseCase {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async execute(bookId: number): Promise<void> {
    await this.bookRepository.delete(bookId); // Llamamos al repositorio para eliminar el libro
  }
}
