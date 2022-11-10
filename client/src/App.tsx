import "./App.css";
import Header from "./componentes/Header";
import Login from "./componentes/Login";
import Pagination from "./componentes/Pagination";
import ProductCards from "./componentes/ProductCards";
import FormPostProduct from "./componentes/FormPostProduct";

function App() {
  return (
    <div className="App flex flex-col items-center bg-gray-100">
      <Header />
      <ProductCards />
      <Pagination />
      <Login />
      
    </div>
  );
}

export default App;
