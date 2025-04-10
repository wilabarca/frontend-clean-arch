import { observer } from "mobx-react-lite";
import { BookViewModel } from "../../ViewModels/Bookview";
import { BookDTO } from "../../../Data/Models/BookTO";
import { useState } from "react";
import "./Table.css";  // Asegúrate de que el archivo CSS esté correctamente importado
import EditBookModal from "../EditModal/EditBookModal";

interface Props {
  viewModel: BookViewModel;
}

const BookTable = observer(({ viewModel }: Props) => {
  const [selectedBook, setSelectedBook] = useState<BookDTO | null>(null); // Estado para almacenar el libro seleccionado

  const handleEdit = (book: BookDTO) => {
    setSelectedBook(book); // Abre el modal con el libro seleccionado
  };

  const handleDelete = async (bookId: number) => {
    await viewModel.doDeleteBook(bookId); // Esto elimina el libro de la lista
    alert("¿Desea Eliminar Libro?"); // Alerta al usuario cuando el libro ha sido eliminado
  };

  const closeModal = () => {
    setSelectedBook(null); // Cierra el modal
  };

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
              <td colSpan={4}>No se encontraron libros</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Mostrar el modal si se ha seleccionado un libro */}
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
