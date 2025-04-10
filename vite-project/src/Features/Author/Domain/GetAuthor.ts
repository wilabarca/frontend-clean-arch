// GetAllAuthorsUseCase.ts
import { AuthorDTO } from "../Data/Models/AuthorTO";
import { AuthorRepository } from "../Data/Repository/AuthorRepository";

export class GetAllAuthorsUseCase {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async execute(): Promise<AuthorDTO[]> {
    try {
      return await this.authorRepository.getAll();
    } catch (error) {
      throw new Error("Error al obtener autores: " + (error as Error).message);
    }
  }
}