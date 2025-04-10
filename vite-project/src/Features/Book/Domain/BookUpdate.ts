import { BookRepository } from "../Data/Repository/BookRepository";  // Repositorio de libros
import { Book } from "../Data/Models/Book";  // Modelo de libro
import { BookDTO } from "../Data/Models/BookTO";

export class UpdateBookUseCase {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();  // Inicializamos el repositorio
  }

  // Ejecutamos la lógica de actualización del libro
  async execute(book: Book): Promise<BookDTO> {
    try {
      // Llamamos al método de actualización del repositorio
      const updatedBook = await this.bookRepository.update(book);
      return updatedBook;
    } catch (error) {
      throw new Error("Error al actualizar el libro: " + (error as Error).message);
    }
  }
}
