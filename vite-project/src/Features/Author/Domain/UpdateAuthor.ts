import { AuthorDTO } from "../Data/Models/AuthorTO";  
import { AuthorRepository } from "../Data/Repository/AuthorRepository";  
import { Author } from "../Data/Models/Author";  

export class UpdateAuthorUseCase {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();  
  }

  
  async execute(author: Author): Promise<AuthorDTO> {
    try {
      
      const updatedAuthor = await this.authorRepository.update(author);
      return updatedAuthor;
    } catch (error) {
      throw new Error("Error al actualizar el autor: " + (error as Error).message);
    }
  }
}
