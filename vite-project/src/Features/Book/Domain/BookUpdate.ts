import { BookRepository } from "../Data/Repository/BookRepository";  
import { Book } from "../Data/Models/Book";  
import { BookDTO } from "../Data/Models/BookTO";

export class UpdateBookUseCase {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();  
  }

  
  async execute(book: Book): Promise<BookDTO> {
    try {
      
      const updatedBook = await this.bookRepository.update(book);
      return updatedBook;
    } catch (error) {
      throw new Error("Error al actualizar el libro: " + (error as Error).message);
    }
  }
}
