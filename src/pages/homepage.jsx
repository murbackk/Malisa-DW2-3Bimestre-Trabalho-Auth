import { Link } from "react-router";

function Inicio() {
    return (
        <main className="home-page">

            <section className="home-card">

                <header className="home-header">

                    <Link to="/" className="home-logo">
                        auth.
                    </Link>

                    <nav className="home-nav">
                        <Link to="/login">
                            Entrar
                        </Link>

                        <Link to="/register">
                            Criar conta
                        </Link>
                    </nav>

                </header>

                <div className="home-center">
                    <h1>auth.</h1>
                </div>

                <div className="home-footer">

                    <span></span>

                    <p>
                        Sua conta.<br />
                        Seu acesso.
                    </p>

                </div>

                <div className="home-circle"></div>

            </section>

        </main>
    );
}

export default Inicio;