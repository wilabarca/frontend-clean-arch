import { AuthorDTO } from "../Data/Models/AuthorTO";  // DTO de autor
import { AuthorRepository } from "../Data/Repository/AuthorRepository";  // Repositorio de autores
import { Author } from "../Data/Models/Author";  // Modelo de autor

export class UpdateAuthorUseCase {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();  // Inicializamos el repositorio
  }

  // Ejecutamos la lógica de actualización del autor
  async execute(author: Author): Promise<AuthorDTO> {
    try {
      // Llamamos al método de actualización del repositorio
      const updatedAuthor = await this.authorRepository.update(author);
      return updatedAuthor;
    } catch (error) {
      throw new Error("Error al actualizar el autor: " + (error as Error).message);
    }
  }
}
