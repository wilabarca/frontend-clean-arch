import { useNavigate } from 'react-router-dom';
import './Home.css';
import Header from '../../Core/Components/Header/Header';

const Home = () => {
  const navigate = useNavigate();

  const goToBooks = () => {
    navigate('/books');
  };

  const goToAuthors = () => {
    navigate('/authors');
  };

  return (
    <div className="home-container">
      <Header title="Bienvenido a la Biblioteca" />
      <div className="cards-container">
        <div className="card" onClick={goToBooks}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/036/338/576/non_2x/ai-generated-antique-books-on-table-in-classic-library-setting-photo.jpg"
            alt="Libro gato"
            className="card-image"
          />
          <h2>Libros</h2>
          <p>Accede al formulario y la tabla de libros</p>
        </div>

        <div className="card" onClick={goToAuthors}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/032/934/529/non_2x/antique-typewriter-old-literature-nostalgic-bookshelf-free-photo.jpg"
            alt="Máquina de escribir"
            className="card-image"
          />
          <h2>Autores</h2>
          <p>Accede al formulario de registro de autores</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
