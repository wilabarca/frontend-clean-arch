
import { observer } from "mobx-react-lite";
import { BookViewModel } from "../../ViewModels/Bookview";
import { useBookTableLogic } from "../../ViewModels/useBookTableLogic";

import "./Table.css";
import EditBookModal from "../EditModal/EditBookModal";

interface Props {
  viewModel: BookViewModel;
}

const BookTable = observer(({ viewModel }: Props) => {
  const { selectedBook, handleEdit, handleDelete, closeModal } = useBookTableLogic(viewModel);

  return (
    <div className="table-container">
      <div className="table-header">
        <h3>Libros Registrados</h3>
      </div>

      {viewModel.error && <div className="error-message">{viewModel.error}</div>}

      <table className="books-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Año</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {viewModel.books.length > 0 ? (
            viewModel.books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.year}</td>
                <td>
                  <button onClick={() => handleEdit(book)} className="edit-button">
                    Editar
                  </button>
                  <button onClick={() => handleDelete(book.id)} className="delete-button">
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>No se encontraron los libros</td>
            </tr>
          )}
        </tbody>
      </table>

      {selectedBook && (
        <EditBookModal
          viewModel={viewModel}
          book={selectedBook}
          onClose={closeModal}
        />
      )}
    </div>
  );
});

export default BookTable;
