
import { observer } from "mobx-react-lite";
import { BookViewModel } from "../../ViewModels/Bookview";
import BookTable from "../Table/Table";
import Header from "../../../../../Core/Components/Header/Header";

import "./Form.css";
import { useBookFormLogic } from "../../ViewModels/useBookFormLogic";

interface Props {
  viewModel: BookViewModel;
}

const BookForm = observer(({ viewModel }: Props) => {
  const { showSuccessMessage, handleSubmit } = useBookFormLogic(viewModel);

  return (
    <>
      {showSuccessMessage && (
        <div className="success-alert">
          ¡Libro agregado exitosamente!
        </div>
      )}

      <Header title="Bienvenido a la Biblioteca" />

      <div className="form-container">
        <h2>Registrar Libro</h2>
        <form onSubmit={handleSubmit} className="book-form">
          <div className="input-group">
            <label>
              Título:
              <input
                type="text"
                value={viewModel.title}
                onChange={(e) => viewModel.onChangeTitle(e.target.value)}
                placeholder="Título del libro"
                disabled={viewModel.isSubmitting}
              />
            </label>
          </div>

          <div className="input-group">
            <label>
              Año de Publicación:
              <input
                type="number"
                value={viewModel.year || ""}
                onChange={(e) => viewModel.onChangeYear(Number(e.target.value))}
                placeholder="Año de publicación"
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
        <BookTable viewModel={viewModel} />
      </div>
    </>
  );
});

export default BookForm;
