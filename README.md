# Trabalho de Autenticação — React + Supabase

Aplicação web desenvolvida em **React** utilizando **Supabase Auth** para cadastro, login, gerenciamento de sessão e controle de acesso a uma página restrita.

## Tecnologias

* React
* Vite
* React Router
* Supabase Auth
* JavaScript
* CSS

## Como executar

É necessário ter **Node.js** e **npm** instalados.

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

Preencha as variáveis com os dados do seu projeto no Supabase.

O arquivo `.env.example` contém o modelo das variáveis necessárias e não possui credenciais preenchidas.

Depois, execute:

```bash
npm run dev
```

A aplicação será disponibilizada pelo endereço informado pelo Vite, normalmente:

```text
http://localhost:5173
```

## Configuração do Supabase

Foi utilizado o **Supabase Auth** com autenticação por e-mail e senha.

No painel do Supabase, o provedor **Email** deve estar habilitado.

Neste projeto, a **confirmação de e-mail está desativada**, permitindo que o usuário realize o login imediatamente após o cadastro.

As variáveis utilizadas são:

* `VITE_SUPABASE_URL`: Project URL do projeto Supabase.
* `VITE_SUPABASE_PUBLISHABLE_KEY`: Publishable Key do projeto.

A aplicação não utiliza chaves administrativas ou `service_role` no navegador.

O arquivo `.env` não deve ser enviado ao GitHub. Ele está incluído no `.gitignore`.

## Estrutura principal

```text
src/
├── components/
│   └── RotaPrivada.jsx
├── lib/
│   └── supabaseClient.js
├── pages/
│   ├── homepage.jsx
│   ├── login.jsx
│   ├── register.jsx
│   └── restrita.jsx
├── App.jsx
└── main.jsx
```

## Cadastro

O cadastro está implementado em `src/pages/register.jsx`.

A conta é criada pelo Supabase Auth através de:

```javascript
supabase.auth.signUp({
    email,
    password
});
```

Antes do envio, a aplicação verifica se os campos foram preenchidos, se a senha possui pelo menos seis caracteres e se as senhas coincidem.

Durante a operação, o botão é desabilitado para evitar envios repetidos. Erros são apresentados diretamente na interface.

## Login

O login está implementado em `src/pages/login.jsx`.

A autenticação utiliza:

```javascript
supabase.auth.signInWithPassword({
    email,
    password
});
```

Quando as credenciais são válidas, o usuário é encaminhado para `/restrita`.

Quando são inválidas, uma mensagem de erro é exibida e o usuário pode tentar novamente.

## Autenticação e autorização

**Autenticação** é a verificação da identidade do usuário. Neste projeto, ela acontece por meio do e-mail e da senha utilizando o Supabase Auth.

**Autorização** é a decisão sobre quais recursos o usuário pode acessar depois de autenticado.

A regra deste projeto é:

| Situação          | Página pública | Página restrita |
| ----------------- | -------------- | --------------- |
| Sem sessão        | Permitida      | Negada          |
| Com sessão válida | Permitida      | Permitida       |

## Proteção da página restrita

A proteção da rota está no componente `src/components/RotaPrivada.jsx`.

A aplicação verifica a sessão utilizando:

```javascript
supabase.auth.getSession()
```

Enquanto a sessão está sendo verificada, é apresentada uma mensagem de carregamento.

Caso não exista uma sessão válida, o usuário é encaminhado para `/login`:

```javascript
if (!session) {
    return <Navigate to="/login" replace />;
}
```

Dessa forma, a proteção não depende apenas de esconder o link da página. Mesmo que o usuário tente acessar `/restrita` diretamente pela URL, o conteúdo não será exibido sem uma sessão autenticada.

## Continuidade da sessão

A aplicação utiliza a sessão fornecida pelo Supabase e acompanha alterações de autenticação através de:

```javascript
supabase.auth.onAuthStateChange(...)
```

Ao recarregar uma página protegida, a sessão é novamente verificada antes da exibição do conteúdo.

Isso permite que um usuário com uma sessão válida continue autenticado após recarregar a página.

## Página restrita

A página `src/pages/restrita.jsx` apresenta o e-mail do usuário conectado utilizando:

```javascript
supabase.auth.getUser()
```

A página também possui a opção de sair da conta.

## Logout

O logout é realizado através de:

```javascript
supabase.auth.signOut()
```

Após o encerramento da sessão, o usuário é encaminhado para `/login`.

Uma nova tentativa de acessar `/restrita` sem estar autenticado será bloqueada pelo componente `RotaPrivada`.

## Rotas

| Rota        | Acesso                        |
| ----------- | ----------------------------- |
| `/`         | Público                       |
| `/login`    | Público                       |
| `/register` | Público                       |
| `/restrita` | Somente usuários autenticados |

## Demonstração

Para verificar os requisitos da aplicação:

1. Acesse `/` sem estar autenticado.
2. Acesse `/register` e crie uma conta.
3. Tente realizar o login utilizando uma senha incorreta e verifique a mensagem de erro.
4. Faça login com as credenciais corretas.
5. Acesse `/restrita` e verifique o e-mail do usuário conectado.
6. Recarregue a página restrita e verifique a continuidade da sessão.
7. Faça logout.
8. Tente acessar `/restrita` diretamente pela URL e verifique que o acesso é bloqueado.
9. Acesse novamente `/` e verifique que a página pública continua disponível.


