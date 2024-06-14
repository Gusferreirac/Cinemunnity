import React from 'react';

function Index() {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bootstrap demo</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH"
          crossorigin="anonymous"
        />
        <style>
          {`
          .filme-circle {
            border-radius: 50%;
            overflow: hidden;
            width: 150px;
            height: 150px;
            margin-bottom: 20px;
          }
          .filme-circle img {
            width: 100%;
            height: auto;
          }
          /* Adicione os outros estilos CSS aqui */
          `}
        </style>
      </head>
      <body>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          {/* conteúdo da barra de navegação aqui */}
        </nav>
        <div className="container">
          <div className="row">
            {/* conteúdo do painel esquerdo aqui */}
            <div className="col-md-4">
              <div className="card">
                {/* conteúdo do card do painel esquerdo aqui */}
              </div>
            </div>
            {/* conteúdo do painel direito aqui */}
            <div className="col-md-8">
              <div className="card">
                {/* conteúdo do card do painel direito aqui */}
              </div>
            </div>
          </div>
          {/* conteúdo adicional aqui */}
        </div>
        <div className="container">
          <div className="row">
            {/* conteúdo dos filmes em destaque aqui */}
          </div>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-center mb-4">Community Buzz</h2>
              {/* conteúdo dos posts da comunidade aqui */}
            </div>
          </div>
        </div>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
          integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
          crossorigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.min.js"
          integrity="sha384-0pUGZvbkm6XF6gxjEnlmuGrJXVbNuzT9qBBavbLwCsOGabYfZo0T0to5eqruptLy"
          crossorigin="anonymous"
        ></script>
        <script>
          {/* Coloque seus scripts JavaScript aqui */}
        </script>
      </body>
    </html>
  );
}

export default Index;
