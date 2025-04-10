import { makeAutoObservable, runInAction } from "mobx";
import { BookDTO } from "../../Data/Models/BookTO";
import { CreateBookUseCase } from "../../Domain/BookCreate";
import { UpdateBookUseCase } from "../../Domain/BookUpdate";
import { GetAllBooksUseCase } from "../../Domain/BookGet";
import { BookRepository } from "../../Data/Repository/BookRepository";
import { Book } from "../../Data/Models/Book";

export class BookViewModel {
  title: string = "";
  year: number = 0;
  bookToEdit: BookDTO | null = null;
  error: string | null = null;
  isValid: boolean = false;
  isSubmitting: boolean = false;
  books: BookDTO[] = [];

  private createBookUseCase: CreateBookUseCase;
  private updateBookUseCase: UpdateBookUseCase;
  private getAllBooksUseCase: GetAllBooksUseCase;
  private bookRepository: BookRepository;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.createBookUseCase = new CreateBookUseCase();
    this.updateBookUseCase = new UpdateBookUseCase();
    this.getAllBooksUseCase = new GetAllBooksUseCase();
    this.bookRepository = new BookRepository();
    this.loadBooks();
  }

  
  onChangeTitle = (title: string) => (this.title = title);

  onChangeYear = (year: number) => (this.year = year);

 
  async doCreateBook() {
    this.error = null;
    this.isValid = false;
    this.isSubmitting = true;

    try {
      if (!this.title.trim() || this.year <= 0) {
        throw new Error("Todos los campos son obligatorios y el año debe ser válido");
      }

      const book = new Book(this.title, this.year);
      const data = await this.createBookUseCase.execute(book);

      if (data) {
        runInAction(() => {
          this.books.push(data); 
          this.isValid = true;
          this.title = "";
          this.year = 0;
        });
      }
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    } finally {
      runInAction(() => (this.isSubmitting = false));
    }
  }

  // Método para cargar todos los libros
  async loadBooks() {
    this.error = null;
    try {
      const books = await this.getAllBooksUseCase.execute();
      runInAction(() => (this.books = books));
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    }
  }

  // Método para eliminar un libro
  async doDeleteBook(bookId: number) {
    this.error = null;
    try {
      await this.bookRepository.delete(bookId);
      runInAction(() => {
        // Elimina el libro de la lista actual
        this.books = this.books.filter((book) => book.id !== bookId);
      });
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    }
  }

  // Inicia la edición de un libro
  startEditBook(book: BookDTO) {
    this.bookToEdit = book;
    this.title = book.title;
    this.year = book.year;
  }

  // Método para actualizar un libro
  async doUpdateBook(updatedBookDTO: BookDTO) {
    if (!updatedBookDTO.title.trim() || updatedBookDTO.year <= 0) {
      this.error = "Todos los campos son obligatorios y el año debe ser válido";
      return;
    }

    this.error = null;
    this.isSubmitting = true;

    try {
      const updatedBook = new Book(updatedBookDTO.title, updatedBookDTO.year);
      updatedBook.id = updatedBookDTO.id;

      const data = await this.updateBookUseCase.execute(updatedBook);

      if (data) {
        runInAction(() => {
          
          this.books = this.books.map((book) =>
            book.id === data.id ? data : book
          );
          this.title = "";
          this.year = 0;
          this.bookToEdit = null;
          this.isValid = true;
        });
      }
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    } finally {
      runInAction(() => (this.isSubmitting = false));
    }
  }
}
