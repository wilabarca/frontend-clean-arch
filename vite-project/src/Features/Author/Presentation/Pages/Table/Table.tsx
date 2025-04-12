// src/Presentation/Components/Author/AuthorTable.tsx
import { observer } from "mobx-react-lite";
import { AuthorDTO } from "../../../Data/Models/AuthorTO";
import "./Table.css";
import { AuthorViewModel } from "../../ViewModels/Authorview";
import EditAuthorModal from "../ViewModel/AuthorEditModal";
import { useAuthorTableLogic } from "../../ViewModels/useAuthorTableLogic";

interface Props {
  viewModel: AuthorViewModel;
}

const AuthorTable = observer(({ viewModel }: Props) => {
  const {
    handleEdit,
    handleDelete,
    closeModal,
    handleChange,
    handleSave
  } = useAuthorTableLogic(viewModel);

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
            viewModel.authors.map((author: AuthorDTO) => (
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

      {viewModel.authorToEdit && (
        <EditAuthorModal
          author={viewModel.authorToEdit}
          onChange={handleChange}
          onSave={handleSave}
          onClose={closeModal}
        />
      )}
    </div>
  );
});

export default AuthorTable;
