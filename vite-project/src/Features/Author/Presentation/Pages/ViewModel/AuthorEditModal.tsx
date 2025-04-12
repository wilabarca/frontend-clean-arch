// src/Presentation/Components/Author/EditAuthorModal.tsx
import React from "react";
import { AuthorDTO } from "../../../Data/Models/AuthorTO";
import "./AuthorEditModal.css";

interface Props {
  author: AuthorDTO;
  onChange: (field: keyof AuthorDTO, value: string) => void;
  onSave: () => void;
  onClose: () => void;
}

const EditAuthorModal: React.FC<Props> = ({ author, onChange, onSave, onClose }) => {
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
                value={author.name}
                onChange={(e) => onChange("name", e.target.value)}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={author.email}
                onChange={(e) => onChange("email", e.target.value)}
              />
            </label>
          </div>

          <button type="button" className="save-button" onClick={onSave}>
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
