import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { supabase } from "../lib/supabaseClient";

function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const [erro, setErro] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function entrar(event) {
        event.preventDefault();

        setErro("");

        if (!email || !senha) {
            setErro("Preencha o e-mail e a senha.");
            return;
        }

        setCarregando(true);

        const { error } = await supabase.auth.signInWithPassword({
            email: email,
            password: senha,
        });

        if (error) {
            setErro("E-mail ou senha inválidos. Tente novamente.");
            setCarregando(false);
            return;
        }

        navigate("/restrita");
    }

    return (
        <main className="auth-page">
            <section className="auth-card">

                <Link to="/" className="auth-logo">
                    auth.
                </Link>

                <h1>Entrar</h1>

                <p className="auth-description">
                    Entre com sua conta para acessar a área restrita.
                </p>

                <form onSubmit={entrar} className="auth-form">

                    <label htmlFor="email">
                        E-mail
                    </label>

                    <input
                        id="email"
                        type="email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(event) =>
                            setEmail(event.target.value)
                        }
                        required
                    />

                    <label htmlFor="senha">
                        Senha
                    </label>

                    <input
                        id="senha"
                        type="password"
                        placeholder="Sua senha"
                        value={senha}
                        onChange={(event) =>
                            setSenha(event.target.value)
                        }
                        required
                    />

                    {erro && (
                        <div className="message error">
                            {erro}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={carregando}
                    >
                        {carregando
                            ? "Entrando..."
                            : "Entrar"}
                    </button>

                </form>

                <p className="auth-footer">
                    Ainda não possui uma conta?{" "}
                    <Link to="/register">
                        Criar conta
                    </Link>
                </p>

            </section>
        </main>
    );
}

export default Login;