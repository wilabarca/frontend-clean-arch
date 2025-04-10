import React, { useState } from "react";
import { BookDTO } from "../../../Data/Models/BookTO";
import { BookViewModel } from "../../ViewModels/Bookview";
import "./EditBookModal.css";

interface Props {
  viewModel: BookViewModel;
  book: BookDTO;
  onClose: () => void; // Función para cerrar el modal
}

const EditBookModal: React.FC<Props> = ({ viewModel, book, onClose }) => {
  const [updatedBook, setUpdatedBook] = useState<BookDTO>({ ...book });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedBook((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await viewModel.doUpdateBook(updatedBook); // Método para actualizar el libro en el viewModel
    onClose(); // Cerrar el modal
    alert("¡El libro ha sido actualizado exitosamente!"); // Alerta de éxito
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Libro</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>
              Título:
              <input
                type="text"
                name="title"
                value={updatedBook.title}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Año de Publicación:
              <input
                type="number"
                name="year"
                value={updatedBook.year}
                onChange={handleChange}
              />
            </label>
          </div>

          <button type="button" className="save-button" onClick={handleSave}>
            Guardar Cambios
          </button>
          <button type="button" className="close-button" onClick={onClose}>
            Cerrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;
