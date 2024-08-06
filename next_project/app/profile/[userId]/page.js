"use client";  // Adicione esta linha no topo do arquivo

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';

function Page({ params }) {
    const { userId } = params;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                console.log('User data:', data);
                setUser(data.user);
            } catch (error) {
                console.error('Fetch user error:', error);
                setError(error.message);
            }
        }
        fetchUser();
    }, [userId]);
    

    if (error) return <p>Error: {error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <>
            <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Perfil</title>
            <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"/>
            <style>
                {`
                search{
                    position: relative;
                    margin-left: auto;
                }

                .search input{
                    width: 100%;
                    border: 2px solid #edebeb;
                    border-radius: 5px;
                    text-indent: 5px;
                    padding: 5px;
                }

                .search input:focus{
                    border-color: #a3a3a3;
                    outline: #a3a3a3;
                }

                .search button{
                position: absolute;
                right: 10px;
                background-color: transparent;
                border: none;
                }

                .search-icon{
                    width: 15px;
                    cursor: pointer;
                }

                .mini-pic {
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    margin: 5px;
                    margin-right: 20px;
                }

                .profile-header {
                    background-color: #7e7f80;
                    padding: 20px 0;
                    width: 100vw;
                }
                .profile-pic {
                    border-radius: 50%;
                    width: 150px;
                    height: 150px;
                    margin-bottom: 20px;
                }
                .profile-tags button {
                    margin-bottom: 20px;
                    background-color: #c2c1c0;
                }
                .profile-tags .btn {
                    margin-right: 10px;
                    margin-bottom: 10px;
                }
                .profile-info {
                    background-color: #fff;
                    padding: 20px;
                    margin-top: 20px;
                }
                .profile-circle {
                    border-radius: 50%;
                    width: 100px;
                    height: 100px;
                    background-color: #e3e3e3;
                    color: #fff;
                    display: flex;
                    margin: auto;
                    margin-bottom: 20px;
                    margin-top: 30px;
                }

                .profile-circle img {
                    max-width: 70%;
                    margin-bottom: 10px;
                    margin: auto;
                    padding: 2px;
                }

                .follow{
                    width: 25%;
                }

                .unfollow{
                    width: 25%;
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
                `}
                
            </style>
        </head>
        <body>
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <img src="scorsese.jpg" alt="Foto de Perfil" class="mini-pic"/>
                <a class="navbar-brand font-weight-bold" href="#">Profile</a>
                <form class="form-inline my-2 my-lg-0 search">
                    <input class="search" type="search" placeholder="Search in site" aria-label="Search"/>
                    <button class="button" type="submit"><img class="search-icon" src="search.png" alt=""/></button>
                </form>
            </nav>
            <div>
                <Link href="/user_edit">
                    <button>Editar</button>
                </Link>
            </div>
            <div>
                <div class="profile-header text-center">
                    <img src="scorsese.jpg" alt="Foto de Perfil" class="profile-pic"/>
                    <h2 class="text-white font-weight-bold">{user.name}</h2>
                    <div class="profile-tags">
                        <button type="button" class="btn">Movie Buff</button>
                        <button type="button" class="btn">Veteran</button>
                    </div>
                    <p class="text-white">Joined In {user.joinedDate}</p>
                    <button type="button" class="btn btn-primary follow" onclick="follow();"> Follow </button>
                    <button type="button" class="btn d-none btn-danger unfollow" onclick="unfollow();"> Unfollow </button>
                </div>
                <div class="profile-info text-center">
                    <h3 class="font-weight-bold">Profile Information</h3>
                    <div class="row justify-content-center">
                        <div class="col-md-3 text-center">
                            <div class="profile-circle">
                                <img src="calendar.png" alt="Calendar"/>
                            </div>
                            <p>Joined date</p>
                            <p class="font-weight-bold h4">{user.joinedDate}</p>
                        </div>
                        <div class="col-md-3 text-center">
                            <div class="profile-circle">
                                <img src="clapperboard.png" alt="Favorite Genre"/>
                            </div>
                            <p>Favorite Genre</p>
                            <p class="font-weight-bold h4">{user.favoriteGenre}</p>
                        </div>
                        <div class="col-md-3 text-center">
                            <div class="profile-circle">
                                <img src="trophy.png" alt="Movie Awards"/>
                            </div>
                            <p>Movie Awards</p>
                            <p class="font-weight-bold h4">{user.movieAwards}</p>
                        </div>
                        <div class="col-md-3 text-center">
                            <div class="profile-circle">
                                <img src="popcorn.png" alt="Watched Movies"/>
                            </div>
                            <p>Watched Movies</p>
                            <p class="font-weight-bold h4">{user.watchedMovies}</p>
                        </div>
                    </div>
                </div>
                <hr/>

                <div class="container">
                    <h2 class="font-weight-bold text-center mt-5">Posts</h2>
                    <div class="card post">
                        <div class="card-header bg-white d-flex">
                            <img src="scorsese.jpg" class="post-profile" alt=""/>
                            <span class="font-weight-bold">Martin Scorsese</span>
                            <span class="ml-auto">3 hours ago</span>
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
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js"></script>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>

            <script>
                {`
                function confirm(){
                    document.querySelector('.confirm').classList.add('d-none');
                    document.querySelector('.cancel').classList.remove('d-none');
                }

                function cancel(){
                    document.querySelector('.cancel').classList.add('d-none');
                    document.querySelector('.cancel').classList.remove('d-none');
                }
                `}
            </script>
        </body>
        </>
    );
}

export default Page;
