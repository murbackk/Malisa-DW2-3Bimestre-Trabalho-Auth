import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";

import { supabase } from "../lib/supabaseClient";

function Restrita() {
    const navigate = useNavigate();

    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function carregarUsuario() {
            const {
                data: { user },
                error,
            } = await supabase.auth.getUser();

            if (error) {
                navigate("/login", { replace: true });
                return;
            }

            setUsuario(user);
            setCarregando(false);
        }

        carregarUsuario();
    }, [navigate]);

    async function sair() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error("Erro ao sair:", error);
            return;
        }

        navigate("/login", { replace: true });
    }

    if (carregando) {
        return (
            <main className="auth-page">
                <div className="auth-card loading-card">
                    <p>Carregando sua conta...</p>
                </div>
            </main>
        );
    }

    return (
        <main className="auth-page">
            <section className="auth-card restricted-card">

                <Link to="/" className="auth-logo">
                    auth.
                </Link>

                <span className="restricted-label">
                    ÁREA RESTRITA
                </span>

                <h1>Olá!</h1>

                <p className="auth-description">
                    Você está autenticado e possui acesso
                    a esta página.
                </p>

                <div className="user-info">
                    <span>Usuário conectado</span>

                    <strong>
                        {usuario?.email}
                    </strong>
                </div>

                <button
                    onClick={sair}
                    className="logout-button"
                >
                    Sair da conta
                </button>

                <Link
                    to="/"
                    className="back-link"
                >
                    Voltar para a página inicial
                </Link>

            </section>
        </main>
    );
}

export default Restrita;