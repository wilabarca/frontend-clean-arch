import { observer } from "mobx-react-lite";
import { AuthorViewModel } from "../../ViewModels/Authorview";
import { AuthorDTO } from "../../../Data/Models/AuthorTO";
import { useState } from "react";
import "./Table.css";
import EditAuthorModal from "../ViewModel/AuthorEditModal";

interface Props {
  viewModel: AuthorViewModel;
}

const AuthorTable = observer(({ viewModel }: Props) => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorDTO | null>(null);

  const handleEdit = (author: AuthorDTO) => {
    setSelectedAuthor(author);
  };

  const handleDelete = async (authorId: number) => {
    await viewModel.doDeleteAuthor(authorId);
    alert("¿Desea Eliminar Autor?");
  };

  const closeModal = () => {
    setSelectedAuthor(null);
  };

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Autores Registrados</h3>
      </div>

      {viewModel.error && <div className="error-message">{viewModel.error}</div>}

      <table className="authors-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {viewModel.authors.length > 0 ? (
            viewModel.authors.map((author) => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.email}</td>
                <td>
                  <button onClick={() => handleEdit(author)} className="edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(author.id)} className="delete-button">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No se encontraron autores</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedAuthor && (
        <EditAuthorModal
          viewModel={viewModel}
          author={selectedAuthor}
          onClose={closeModal}
        />
      )}
    </div>
  );
});

export default AuthorTable;
