// RoutesComponent.tsx
import { Routes, Route } from 'react-router-dom'; // Importa Routes y Route
import AuthorForm from './Features/Author/Presentation/Pages/Form/Formulario';
import AuthorTable from './Features/Author/Presentation/Pages/Table/Table';
import { AuthorViewModel } from './Features/Author/Presentation/ViewModels/Authorview';
import BookForm from './Features/Book/Presentation/Pages/Form/Form';
import BookTable from './Features/Book/Presentation/Pages/Table/Table';
import { BookViewModel } from './Features/Book/Presentation/ViewModels/Bookview';
import Home from './Features/Home/Home';

const RoutesComponent = () => {
  const authorViewModel = new AuthorViewModel();
  const bookViewModel = new BookViewModel();

  return (
    <Routes>
      <Route path="/" element={<Home />} /> {/* Ruta principal */}
      <Route path="/authors" element={<AuthorForm viewModel={authorViewModel} />} />
      <Route path="/authors/list" element={<AuthorTable viewModel={authorViewModel} />} />
      <Route path="/books" element={<BookForm viewModel={bookViewModel} />} />
      <Route path="/books/list" element={<BookTable viewModel={bookViewModel} />} />
    </Routes>
  );
};

export default RoutesComponent;
