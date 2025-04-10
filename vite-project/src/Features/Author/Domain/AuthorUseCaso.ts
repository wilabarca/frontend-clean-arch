import { Author } from "../Data/Models/Author";
import { AuthorDTO } from "../Data/Models/AuthorTO";
import { AuthorRepository } from "../Data/Repository/AuthorRepository";

export class CreateAuthorUseCase {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async execute(author: Author): Promise<AuthorDTO | null> {
    try {
      const response = await this.authorRepository.create(author);
      return response ? new AuthorDTO(response.id, response.name, response.email) : null;
    } catch (error) {
      throw new Error("Error en el caso de uso: " + (error as Error).message);
    }
  }
}