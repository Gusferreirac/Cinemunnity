function Page(){
    return(
        <>
            <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta name="Description" content="Enter your description here"/>
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
                .logo{
                    width: 30px;
                    height: 30px;
                }
                .error{
                    border: red 1px solid;
                }
                `}
            </style>
        </head>
        <body>
            <div class="container">
                <div class="row justify-content-center mt-5">
                    <div class="d-block w-100 text-center">
                        <h2 class="font-weight-bold text-dark">Log In to your Account</h2>
                        <hr class="my-5"/>
                    </div>
                    <div class="col-md-6 text-center mt-5 mb-5">
                        {/* <!-- Formulário de Login --> */}
                        <form id="form">
                            <div class="form-group">
                                <input type="email" class="form-control" id="email" required/>
                                <label id="emaillabel" class="form-control-placeholder" for="email">Enter your Email</label>
                                <label id="emailerror" class="form-control-placeholder text-danger d-none" for="email">Required Field</label>

                            </div>
                            <div class="form-group">
                                <input type="text" class="form-control" id="login" required/>
                                <label id="loginlabel" class="form-control-placeholder" for="login">Enter your Login</label>
                                <label id="loginerror" class="form-control-placeholder text-danger d-none" for="login">Required Field</label>

                            </div>
                            <div class="form-group">
                                <input type="password" class="form-control" id="password" required/>
                                <label id="passwordlabel" class="form-control-placeholder" for="password">Enter your Password</label>
                                <label id="passworderror" class="form-control-placeholder text-danger d-none" for="password">Required Field</label>
                            </div>
                        </form>
                        <button type="button" class="btn btn-outline-black mb-3">Log In</button>
                        <button type="button" class="btn btn-outline-black">Create Account</button>
                    </div>
                </div>
                <hr class="my-5"/>
                <div class="row mt-5">
                    <div class="col-md-6">
                        <p class="font-weight-bold">Quick Log In</p>
                        <p>Log in Faster with social accounts</p>
                    </div>
                    <div class="col-md-6">
                        <div class="row">
                            <div class="col-md-6">
                                <button type="button" class="btn btn-outline-dark btn-block">
                                    Continue with Google
                                    <img src="assets/google.png" alt="Google Logo" class="ml-2 logo"/>
                                </button>
                            </div>
                            <div class="col-md-6">
                                <button type="button" class="btn btn-outline-dark btn-block">
                                    Continue with Meta
                                    <img src="assets/meta.png" alt="Meta Logo" class="ml-2 logo"/>
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