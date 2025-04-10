import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { runInAction } from "mobx";
import { AuthorViewModel } from "../../ViewModels/Authorview";  
import AuthorTable from "../Table/Table";  
import Header from "../../../../../Core/Components/Header/Header";
import "./Form.css";

interface Props {
  viewModel: AuthorViewModel;
}

const AuthorForm = observer(({ viewModel }: Props) => {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await viewModel.doCreateAuthor();

    if (viewModel.isValid) {
      await viewModel.loadAuthors();  
      setShowSuccessMessage(true);

      
      setTimeout(() => {
        setShowSuccessMessage(false);
        runInAction(() => (viewModel.isValid = false));
      }, 5000);
    }
  };

  return (
    <>
      {showSuccessMessage && (
        <div className="success-alert">
          ¡Autor agregado exitosamente! 
        </div>
      )}

      <Header title="Bienvenido al Sistema de Autores" /> 

      <div className="form-container">
        <h2>Registrar Autor</h2>
        <form onSubmit={handleSubmit} className="author-form">
          <div className="input-group">
            <label>
              Nombre:
              <input
                type="text"
                value={viewModel.name}
                onChange={(e) => viewModel.onChangeName(e.target.value)}
                placeholder="Nombre del autor"
                disabled={viewModel.isSubmitting}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Email:
              <input
                type="email"
                value={viewModel.email}
                onChange={(e) => viewModel.onChangeEmail(e.target.value)}
                placeholder="Email del autor"
                disabled={viewModel.isSubmitting}
              />
            </label>
          </div>

          {viewModel.error && <div className="error-message">{viewModel.error}</div>}

          <button
            type="submit"
            className="submit-button"
            disabled={viewModel.isSubmitting}
          >
            {viewModel.isSubmitting ? "Guardando..." : "Guardar"}
          </button>
        </form>
      </div>

      <div className="table-container">
        <AuthorTable viewModel={viewModel} /> 
      </div>
    </>
  );
});

export default AuthorForm;
