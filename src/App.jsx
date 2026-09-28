import { Routes, Route } from "react-router";

import Inicio from "./pages/homepage";
import Login from "./pages/login";
import Cadastro from "./pages/register";
import Restrita from "./pages/restrita";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Cadastro />} />
            <Route path="/restrita" element={<Restrita />} />
        </Routes>
    );
}

export default App;