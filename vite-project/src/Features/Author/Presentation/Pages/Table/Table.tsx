import { observer } from "mobx-react-lite";
import { AuthorViewModel } from "../../ViewModels/Authorview";
import { AuthorDTO } from "../../../Data/Models/AuthorTO"; // Assuming this DTO is defined similarly to BookDTO
import { useState } from "react";
import "./Table.css";  // Make sure this CSS file is correctly imported
import EditAuthorModal from "../ViewModel/AuthorEditModal";


interface Props {
  viewModel: AuthorViewModel;
}

const AuthorTable = observer(({ viewModel }: Props) => {
  const [selectedAuthor, setSelectedAuthor] = useState<AuthorDTO | null>(null); // State to store selected author

  const handleEdit = (author: AuthorDTO) => {
    setSelectedAuthor(author); // Opens modal with selected author
  };

  const handleDelete = async (authorId: number) => {
    await viewModel.doDeleteAuthor(authorId); // Deletes the author from the list
    alert("¿Desea Eliminar Autor?"); // Alert to confirm deletion
  };

  const closeModal = () => {
    setSelectedAuthor(null); // Closes the modal
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

      {/* Show the modal if an author has been selected */}
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
