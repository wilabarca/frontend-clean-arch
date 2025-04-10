import { Author } from "../Models/Author";
import { AuthorDTO } from "../Models/AuthorTO";

export class AuthorRepository {
  private readonly baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    if (!this.baseUrl) throw new Error("VITE_API_URL no configurada");
  }

  async create(author: Author): Promise<AuthorDTO> {
    const response = await fetch(`${this.baseUrl}/Author`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: author.name, email: author.email })
    });
    return this.handleResponse(response);
  }

  async getAll(): Promise<AuthorDTO[]> {
    const response = await fetch(`${this.baseUrl}/Author`);
    return this.handleResponse(response);
  }

  
  async delete(authorId: number): Promise<void> {
    const response = await fetch(`${this.baseUrl}/Author/${authorId}`, {
      method: "DELETE",
    });
    await this.handleResponse(response); 
  }

  private async handleResponse(response: Response) {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Error en la solicitud");
    }
    return response.json();
  }

 
async update(author: Author): Promise<AuthorDTO> {
    if (!author.id) throw new Error("ID de autor inválido");
    
    const response = await fetch(`${this.baseUrl}/Author/${author.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: author.name,
            email: author.email
        })
    });
    
    const data = await this.handleResponse(response);
    return new AuthorDTO(data.id, data.name, data.email);
}
}
