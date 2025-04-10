// App.tsx
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa Router
import RoutesComponent from './RoutesComponent'; // Importa el componente de rutas

function App() {
  return (
    <Router>
      <div className="app-container">
        <RoutesComponent /> 
      </div>
    </Router>
  );
}

export default App;
