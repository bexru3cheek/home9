import { BrowserRouter, Route, Routes } from "react-router-dom";
import CategoriesP from "./pages/CategoriesP";
import ProductsP from "./pages/ProductsP";
import ProfilCatagory from "./pages/ProfilPage/ProfilCatagory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route path="categories"  element={<CategoriesP />} />
          <Route path="products/:id" element={<ProductsP />} />
          <Route path="profilCatagory/:id" element={<ProfilCatagory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
