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
            <title>Cinemmunity</title>
  
            <style>
            {`
              .navlinks{
                  display: flex;
                  justify-content: flex-end;
                  margin: auto;
              }
  
              .navlinks a{
                  margin-right: 30px;
              }
  
              .navlinks a:hover{
                  color: #363636;
                  text-decoration: none;
              }
  
              .hero-text{
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  padding-right: 50px;
              }
  
              .hero-btn{
                  background-color: black;
                  color: white;
                  border: 2px solid black;
                  padding: 10px 20px;
                  margin-top: 20px;
              }
  
              .hero-btn:hover{
                  background-color: transparent;
                  color: black;
                  border: 2px solid black;
              }
  
              .hero-img{
                  padding-left: 50px;
              }
  
              .hero-img img{
                  width: 100%;
                  height: 100%;
                  filter: brightness(60%);
                  border-radius: 10px;
              }
  
              .card img{
                  height: 40%;
                  object-fit: cover;
                  object-position: top;
              }
  
              .featured-movies{
                  justify-content: center;
                  margin-left: 100px;
                  margin-right: 100px;
              }
  
              .featured-movies div{
                  margin: 15px;
              }
  
              .movie img{
                  height: 100px;
                  width: 100px;
                  border-radius: 100%;
                  object-fit: cover;
              }
  
              .tag{
                  background-color: #dadada;
                  padding: 3px;
                  border-radius: 5px;
                  margin-right: 5px;
              }
  
              .post{
                  max-height: 500px;
                  max-width: 500px;
                  margin: 50px auto;
              }
  
              .post-img img{
                  height: 100%;
                  width: 100%;
              }
  
              .post-profile{
                  height: 30px !important;
                  border-radius: 100%;
                  margin-right: 5px;
              }
  
              .copyright{
                  text-align: center;
                  margin-top: 200px;
                  margin-bottom: 50px;
              }
  
              .community-posts{
                  background-color: black;
                  border-radius: 20px;
              }
              `}
          </style>
      </head>
      <body>
        {/* ... */}
            {/* <!-- Cabeçalho --> */}
            <nav class="navbar navbar-expand-lg navbar-light mt-2">
              <div class="navlinks">
                  <a class="navbar-text" href="login">Sign In</a>
                  <a class="navbar-text" href="#">Create Account</a>
                  <a class="navbar-text" href="#">Films</a>
                  <a class="navbar-text" href="#">News</a>
              </div>
              {/* <!-- Adicione itens de navegação, links de logout, etc., conforme necessário --> */}
            </nav>
  
            <hr />
  
            {/* <!-- Hero Section --> */}
            <div class="container">
              <div class="row">
                  <div class="col-md-6 hero-text">
                      <h1 class="font-weight-bold">Discover the World of Movies</h1>
                      <p>Join our community of film lovers and share your thoughts on the latest movies.</p>
                      <a href="#" class="btn btn-block hero-btn">Join Now</a>
                  </div>
                  <div class="col-md-6 hero-img">
                      <img src="hero.png" alt="Placeholder Image" class="img-fluid"/>
                  </div>
              </div>
            </div>
  
            <hr/>
  
            {/* <!-- Latest News --> */}
            <div class="container">
              <h2 class="text-center font-weight-bold mb-4 mt-4">Latest News</h2>
              <div class="row mb-4">
                  <div class="card-group">
                      <div class="card col-md-4">
                          <img class="card-img" src="cards/vfx.jpg" alt="Card image cap"/>
                          <div class="card-body d-flex flex-column">
                              <h5 class="card-title font-weight-bold">Exciting Movies VFX Innovations</h5>
                              <p class="card-text">Stay updated on the last VFX trends.</p>
                              <a href="#" class="btn btn-block hero-btn mt-auto">Read More</a>
                          </div>
                      </div>
                      <div class="card col-md-4">
                          <img class="card-img" src="cards/deadpool.jpeg" alt="Card image cap"/>
                          <div class="card-body d-flex flex-column">
                              <h5 class="card-title font-weight-bold">Upcoming Movies</h5>
                              <p class="card-text">See the most promising upcoming movies.</p>
                              <a href="#" class="btn btn-block hero-btn mt-auto">Read More</a>
                          </div>
                      </div>
                      <div class="card col-md-4">
                          <img class="card-img" src="cards/poor-things.jpg" alt="Card image cap"/>
                          <div class="card-body d-flex flex-column">
                              <h5 class="card-title font-weight-bold">Best Movies of 2024</h5>
                              <p class="card-text">Check out the best movies released so far.</p>
                              <a href="#" class="btn btn-block hero-btn mt-auto">Read More</a>
                          </div>
                      </div>
                  </div>
              </div>
            </div>
  
            <hr/>
  
            {/* <!-- Featured Movies --> */}
            <div class="container mt-4 mb-4">
              <div class="row">
                  <div class="col-sm my-auto">
                      <h2 class="text-center font-weight-bold mb-4 mt-4">Featured Films</h2>
                  </div>
                  <div class="col-sm">
                  <div class="d-block text-center movie">
                      <img src="movies/inception.jpg" alt=""/>
                      <h3 class="font-weight-bold">Inception</h3>
                      <p>Christopher Nolan</p>
                      <h4 class="font-weight-bold">4.8</h4>
                  </div>
                  </div>
                  <div class="col-sm">
                  <div class="d-block text-center movie">
                      <img src="movies/parasite.jpeg" alt=""/>
                      <h3 class="font-weight-bold">Parasite</h3>
                      <p>Bong Joon Ho</p>
                      <h4 class="font-weight-bold">4.7</h4>
                  </div>
                  </div>
              </div>
            </div>
  
            <hr/>
  
            {/* <!-- Community Buzz --> */}
  
            <div class="container">
              <h2 class="text-center font-weight-bold mb-4 mt-4">Community Buzz</h2>
              <div id="carouselExampleIndicators" class="carousel slide community-posts" data-ride="carousel">
                  <ol class="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <div class="card post">
                          <div class="card-header bg-white">
                              <img src="scorsese.jpg" class="post-profile" alt=""/>
                              <span class="font-weight-bold">CinemaLover123</span>
                          </div>
                          <div class="card-body post-img">
                              <img src="cards/poor-things.jpg" class="" alt=""/>
                          </div>
                          <div class="card-footer bg-white">
                              <div class="d-block">
                                  <span>Just watched an amazing indie film today!</span>
                                  <br/>
                                  <div class="mt-2">
                                      <span class="tag"><small> IndieFilm </small></span>
                                      <span class="tag"><small> Recommendation </small></span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div class="card post">
                          <div class="card-header bg-white">
                              <img src="scorsese.jpg" class="post-profile" alt=""/>
                              <span class="font-weight-bold">CinemaLover123</span>
                          </div>
                          <div class="card-body post-img">
                              <img src="cards/poor-things.jpg" class="" alt=""/>
                          </div>
                          <div class="card-footer bg-white">
                              <div class="d-block">
                                  <span>Just watched an amazing indie film today!</span>
                                  <br/>
                                  <div class="mt-2">
                                      <span class="tag"><small> IndieFilm </small></span>
                                      <span class="tag"><small> Recommendation </small></span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                    <div class="carousel-item">
                      <div class="card post">
                          <div class="card-header bg-white">
                              <img src="scorsese.jpg" class="post-profile" alt=""/>
                              <span class="font-weight-bold">CinemaLover123</span>
                          </div>
                          <div class="card-body post-img">
                              <img src="cards/poor-things.jpg" class="" alt=""/>
                          </div>
                          <div class="card-footer bg-white">
                              <div class="d-block">
                                  <span>Just watched an amazing indie film today!</span>
                                  <br/>
                                  <div class="mt-2">
                                      <span class="tag"><small> IndieFilm </small></span>
                                      <span class="tag"><small> Recommendation </small></span>
                                  </div>
                              </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                  </a>
                </div>
            </div>
  
            {/* <!-- Footer --> */}
            <p class="text-muted copyright">© 2024 Cinemmunity. All Rights Reserved</p>
  
            
          </body>
        </>
    );
  }
  
  export default Page;