'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

function Page() {
    const router = useRouter();
    const [email, setEmail] = useState('sean_bean@gameofthron.es'); // Valor de teste
    const [login, setLogin] = useState('12345'); // Valor de teste
    const [password, setPassword] = useState('1234'); // Valor de teste

    const handleLogin = async () => {
        if (!email || !login || !password) {
            alert('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, login, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                router.push(`/profile/${data.userId}`);
            } else {
                alert(data.message); // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const handleCreateAccount = async () => {
        if (!email || !login || !password) {
            alert('All fields are required.');
            return;
        }

        try {
            const response = await fetch('/api/create_account', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, login, password }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Network response was not ok: ${errorText}`);
            }

            const data = await response.json();
            console.log(data);

            if (data.success) {
                router.push(`/profile_edit/${data.userId}`);
            } else {
                alert(data.message); // Exibe a mensagem de erro
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            <head>
                <meta charSet="utf-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta name="Description" content="Enter your description here" />
                <link
                    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
                    rel="stylesheet"
                    integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
                    crossOrigin="anonymous"
                />
                <title>Entrar</title>
                <style>
                    {`
                    /* Estilo adicional */
                    .form-control-placeholder {
                        top: 0;
                        padding: 7px 0 0 13px;
                        color: #495057;
                        transition: all 200ms;
                        pointer-events: none;
                    }
                    .form-control:focus + .form-control-placeholder,
                    .form-control:valid + .form-control-placeholder {
                        font-size: 75%;
                        transform: translate3d(0, -100%, 0);
                        opacity: 1;
                    }
                    .btn-outline-black {
                        border-color: #000;
                        border: 2px solid;
                        border-radius: 10px;
                        color: #000;
                        width: 50%;
                        background-color: transparent;
                        transition: ease-in-out 0.3s;
                    }
                    .btn-outline-black:hover {
                        background-color: #000;
                        color: #fff;
                    }
                    .logo {
                        width: 30px;
                        height: 30px;
                    }
                    .error {
                        border: red 1px solid;
                    }
                    `}
                </style>
            </head>
            <body>
                <div className="container">
                    <div className="row justify-content-center mt-5">
                        <div className="d-block w-100 text-center">
                            <h2 className="font-weight-bold text-dark">Log In to your Account</h2>
                            <hr className="my-5" />
                        </div>
                        <div className="col-md-6 text-center mt-5 mb-5">
                            {/* <!-- Formulário de Login --> */}
                            <form id="form">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                    <label id="emaillabel" className="form-control-placeholder" htmlFor="email">Enter your Email</label>
                                    <label id="emailerror" className="form-control-placeholder text-danger d-none" htmlFor="email">Required Field</label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={login}
                                        onChange={(e) => setLogin(e.target.value)}
                                        required
                                    />
                                    <label id="loginlabel" className="form-control-placeholder" htmlFor="login">Enter your Login</label>
                                    <label id="loginerror" className="form-control-placeholder text-danger d-none" htmlFor="login">Required Field</label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <label id="passwordlabel" className="form-control-placeholder" htmlFor="password">Enter your Password</label>
                                    <label id="passworderror" className="form-control-placeholder text-danger d-none" htmlFor="password">Required Field</label>
                                </div>
                            </form>
                            <button
                                type="button"
                                className="btn btn-outline-black mb-3"
                                onClick={handleLogin}
                            >
                                Log In
                            </button>
                            <button
                                type="button"
                                className="btn btn-outline-black"
                                onClick={handleCreateAccount}
                                
                            >
                                Create Account
                            </button>
                        </div>
                    </div>
                    <hr className="my-5" />
                    <div className="row mt-5">
                        <div className="col-md-6">
                            <p className="font-weight-bold">Quick Log In</p>
                            <p>Log in Faster with social accounts</p>
                        </div>
                        <div className="col-md-6">
                            <div className="row">
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-outline-dark btn-block">
                                        Continue with Google
                                        <img src="assets/google.png" alt="Google Logo" className="ml-2 logo" />
                                    </button>
                                </div>
                                <div className="col-md-6">
                                    <button type="button" className="btn btn-outline-dark btn-block">
                                        Continue with Meta
                                        <img src="assets/meta.png" alt="Meta Logo" className="ml-2 logo" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <!-- Incluindo o Bootstrap JS (necessário para alguns recursos do Bootstrap) --> */}
                <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
            </body>
        </>
    );
}

export default Page;
