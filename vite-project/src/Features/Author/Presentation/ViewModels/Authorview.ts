import { makeAutoObservable, runInAction } from "mobx";
import { CreateAuthorUseCase } from "../../Domain/AuthorUseCaso";
import { Author } from "../../Data/Models/Author";
import { AuthorDTO } from "../../Data/Models/AuthorTO";
import { GetAllAuthorsUseCase } from "../../Domain/GetAuthor";
import { AuthorRepository } from "../../Data/Repository/AuthorRepository";
import { UpdateAuthorUseCase } from "../../Domain/UpdateAuthor";

export class AuthorViewModel {
  name: string = "";
  email: string = "";
  authorToEdit: AuthorDTO | null = null;
  error: string | null = null;
  isValid: boolean = false;
  isSubmitting: boolean = false;
  authors: AuthorDTO[] = [];

  private createAuthorUseCase: CreateAuthorUseCase;
  private updateAuthorUseCase: UpdateAuthorUseCase;
  private getAllAuthorsUseCase: GetAllAuthorsUseCase;
  private authorRepository: AuthorRepository;

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
    this.createAuthorUseCase = new CreateAuthorUseCase();
    this.updateAuthorUseCase = new UpdateAuthorUseCase();
    this.getAllAuthorsUseCase = new GetAllAuthorsUseCase();
    this.authorRepository = new AuthorRepository();
    this.loadAuthors();
  }

  onChangeName = (name: string) => (this.name = name);

  onChangeEmail = (email: string) => (this.email = email);

  async doCreateAuthor() {
    this.error = null;
    this.isValid = false;
    this.isSubmitting = true;

    try {
      if (!this.name.trim() || !this.email.trim()) {
        throw new Error("Todos los campos son obligatorios");
      }

      const author = new Author(this.name, this.email);
      const data = await this.createAuthorUseCase.execute(author);

      if (data) {
        runInAction(() => {
          this.isValid = true;
          this.name = "";
          this.email = "";
        });
        await this.loadAuthors();
      }
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    } finally {
      runInAction(() => (this.isSubmitting = false));
    }
  }

  async loadAuthors() {
    this.error = null;
    try {
      const authors = await this.getAllAuthorsUseCase.execute();
      runInAction(() => (this.authors = authors));
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    }
  }

  async doDeleteAuthor(authorId: number) {
    this.error = null;
    try {
      await this.authorRepository.delete(authorId);
      runInAction(() => {
        this.authors = this.authors.filter((author) => author.id !== authorId);
      });
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    }
  }

  startEditAuthor(author: AuthorDTO) {
    this.authorToEdit = author;
    this.name = author.name;
    this.email = author.email;
  }

  async doUpdateAuthor(updatedAuthorDTO: AuthorDTO) {
    if (!updatedAuthorDTO.name.trim() || !updatedAuthorDTO.email.trim()) {
      this.error = "Todos los campos son obligatorios";
      return;
    }

    this.error = null;
    this.isSubmitting = true;

    try {
      const updatedAuthor = new Author(updatedAuthorDTO.name, updatedAuthorDTO.email);
      updatedAuthor.id = updatedAuthorDTO.id;

      const data = await this.updateAuthorUseCase.execute(updatedAuthor);

      if (data) {
        runInAction(() => {
          this.authors = this.authors.map((author) =>
            author.id === data.id ? data : author
          );
          this.name = "";
          this.email = "";
          this.authorToEdit = null;
          this.isValid = true;
        });
      }
    } catch (err) {
      runInAction(() => (this.error = (err as Error).message));
    } finally {
      runInAction(() => (this.isSubmitting = false));
    }
  }


  // src/Presentation/ViewModels/AuthorViewModel.ts

  setAuthorToEditField(field: keyof AuthorDTO, value: string) {
    if (this.authorToEdit && field !== "id") {
      this.authorToEdit = {
        ...this.authorToEdit,
        [field]: value,
      };
    }
  }
  

async saveEditedAuthor(onSuccess: () => void) {
  if (this.authorToEdit) {
    await this.doUpdateAuthor(this.authorToEdit);
    alert("¡El autor ha sido actualizado exitosamente!");
    onSuccess();
  }
}

}
