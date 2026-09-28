import { Routes, Route } from "react-router";

import Inicio from "./pages/homepage";
import Login from "./pages/login";
import Cadastro from "./pages/register";
import Restrita from "./pages/restrita";

import RotaPrivada from "./components/RotaPrivada";

function App() {
    return (
        <Routes>
            <Route
                path="/"
                element={<Inicio />}
            />

            <Route
                path="/login"
                element={<Login />}
            />

            <Route
                path="/register"
                element={<Cadastro />}
            />

            <Route
                path="/restrita"
                element={
                    <RotaPrivada>
                        <Restrita />
                    </RotaPrivada>
                }
            />
        </Routes>
    );
}

export default App;