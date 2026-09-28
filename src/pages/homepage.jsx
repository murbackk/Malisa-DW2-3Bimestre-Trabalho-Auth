import { useEffect, useState } from "react";
import { Link } from "react-router";

import { supabase } from "../lib/supabaseClient";

function Inicio() {
    const [usuario, setUsuario] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function verificarUsuario() {
            const {
                data: { user },
            } = await supabase.auth.getUser();

            setUsuario(user);
            setCarregando(false);
        }

        verificarUsuario();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setUsuario(session?.user ?? null);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <main className="home-page">
            <section className="home-card">

                <header className="home-header">
                    <Link to="/" className="home-logo">
                        auth.
                    </Link>

                    <nav className="home-nav">

                        {!carregando && usuario ? (
                            <Link to="/restrita">
                                Área restrita
                            </Link>
                        ) : !carregando ? (
                            <>
                                <Link to="/login">
                                    Entrar
                                </Link>

                                <Link to="/register">
                                    Criar conta
                                </Link>
                            </>
                        ) : null}

                    </nav>
                </header>

                <div className="home-center">
                    <h1>auth.</h1>

                    
                </div>

                <div className="home-footer">
                    <span></span>

                    <p>
                        Sua conta.
                        <br />
                        Seu acesso.
                    </p>
                </div>

                <div className="home-circle"></div>

            </section>
        </main>
    );
}

export default Inicio;