import React, { useState, useEffect } from "react";
import { AuthorDTO } from "../../../Data/Models/AuthorTO";
import { AuthorViewModel } from "../../ViewModels/Authorview";
import "./AuthorEditModal.css";

interface Props {
  viewModel: AuthorViewModel;
  author: AuthorDTO;
  onClose: () => void;
}

const EditAuthorModal: React.FC<Props> = ({ viewModel, author, onClose }) => {
  const [updatedAuthor, setUpdatedAuthor] = useState<AuthorDTO>(author);

  useEffect(() => {
    setUpdatedAuthor(author);
  }, [author]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedAuthor((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    await viewModel.doUpdateAuthor(updatedAuthor);
    onClose();
    alert("¡El autor ha sido actualizado exitosamente!");
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Editar Autor</h2>
        <form onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label>
              Nombre:
              <input
                type="text"
                name="name"
                value={updatedAuthor.name}
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={updatedAuthor.email}
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

export default EditAuthorModal;
