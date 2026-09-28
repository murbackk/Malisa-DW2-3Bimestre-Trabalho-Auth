import { useState } from "react";
import { Link, useNavigate } from "react-router";

import { supabase } from "../lib/supabaseClient";

function Cadastro() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");

    const [erro, setErro] = useState("");
    const [sucesso, setSucesso] = useState("");
    const [carregando, setCarregando] = useState(false);

    async function cadastrar(event) {
        event.preventDefault();

        setErro("");
        setSucesso("");

        // Validação dos campos
        if (!email || !senha || !confirmarSenha) {
            setErro("Preencha todos os campos.");
            return;
        }

        if (senha.length < 6) {
            setErro("A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        if (senha !== confirmarSenha) {
            setErro("As senhas não coincidem.");
            return;
        }

        setCarregando(true);

        // Cadastro no Supabase
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: senha,
        });

        if (error) {
            setErro(error.message);
            setCarregando(false);
            return;
        }

        // Se o Supabase já criou uma sessão
        if (data.session) {
            navigate("/restrita");
            return;
        }

        // Caso a confirmação de e-mail esteja ativada
        setSucesso(
            "Cadastro realizado! Verifique seu e-mail para confirmar sua conta."
        );

        setCarregando(false);
    }

    return (
        <main className="auth-page">
            <section className="auth-card">

                <Link to="/" className="auth-logo">
                    auth.
                </Link>

                <h1>Criar conta</h1>

                <p className="auth-description">
                    Crie sua conta para acessar a área restrita.
                </p>

                <form onSubmit={cadastrar} className="auth-form">

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
                        placeholder="Mínimo de 6 caracteres"
                        value={senha}
                        onChange={(event) =>
                            setSenha(event.target.value)
                        }
                        required
                    />

                    <label htmlFor="confirmarSenha">
                        Confirmar senha
                    </label>

                    <input
                        id="confirmarSenha"
                        type="password"
                        placeholder="Digite a senha novamente"
                        value={confirmarSenha}
                        onChange={(event) =>
                            setConfirmarSenha(event.target.value)
                        }
                        required
                    />

                    {erro && (
                        <div className="message error">
                            {erro}
                        </div>
                    )}

                    {sucesso && (
                        <div className="message success">
                            {sucesso}
                        </div>
                    )}

                    <button
                        type="submit"
                        className="auth-button"
                        disabled={carregando}
                    >
                        {carregando
                            ? "Criando conta..."
                            : "Criar conta"}
                    </button>

                </form>

                <p className="auth-footer">
                    Já possui uma conta?{" "}
                    <Link to="/login">
                        Entrar
                    </Link>
                </p>

            </section>
        </main>
    );
}

export default Cadastro;