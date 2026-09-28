import { useEffect, useState } from "react";
import { Navigate } from "react-router";

import { supabase } from "../lib/supabaseClient";

function RotaPrivada({ children }) {
    const [session, setSession] = useState(null);
    const [carregando, setCarregando] = useState(true);

    useEffect(() => {
        async function verificarSessao() {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            setSession(session);
            setCarregando(false);
        }

        verificarSessao();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(
            (_event, novaSessao) => {
                setSession(novaSessao);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    if (carregando) {
        return (
            <main className="auth-page">
                <div className="auth-card loading-card">
                    <p>Verificando sua sessão...</p>
                </div>
            </main>
        );
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

export default RotaPrivada;