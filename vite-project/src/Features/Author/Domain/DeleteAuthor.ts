import { AuthorRepository } from "../Data/Repository/AuthorRepository";

export class DeleteAuthorUseCase {
  private authorRepository: AuthorRepository;

  constructor() {
    this.authorRepository = new AuthorRepository();
  }

  async execute(authorId: number): Promise<void> {
    await this.authorRepository.delete(authorId); 
  }
}
