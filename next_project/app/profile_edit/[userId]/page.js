'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function Page({ params }) {
    const { userId } = params;
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await fetch(`/api/user/${userId}`);
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }
                const data = await response.json();
                setUser(data.user);
            } catch (error) {
                setError(error.message);
            }
        }
        fetchUser();
    }, [userId]);

    const handleConfirm = async () => {
        try {
            const response = await fetch(`/api/edit_profile/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: document.getElementById('name').value,
                    bio: document.getElementById('bio').value,
                    tags: document.getElementById('tags').value,
                    genre: document.getElementById('genre').value,
                    _id: userId,
                }),
            });
            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
            router.push(`/profile/${userId}`);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleCancel = () => {
        if (window.confirm("Are you sure you want to discard changes?")) {
            router.push(`/profile/${userId}`);
        }
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <head>
                <meta charset="UTF-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <title>Edit Profile</title>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet"/>
                <style>
                    {`
                    /* Seu CSS aqui */
                    `}
                </style>
            </head>
            <body>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <img src="assets/scorsese.jpg" alt="Foto de Perfil" className="mini-pic"/>
                    <a className="navbar-brand font-weight-bold" href="#">Profile</a>
                    <form className="form-inline my-2 my-lg-0 search">
                        <input className="search" type="search" placeholder="Search in site" aria-label="Search"/>
                        <button className="button" type="submit"><img className="search-icon" src="assets/search.png" alt=""/></button>
                    </form>
                </nav>

                <div>
                    <div className="profile-header text-center">
                        <img src="assets/scorsese.jpg" alt="Foto de Perfil" className="profile-pic"/>
                        <form id="form">
                            <div className="form-group">
                                <input type="text" className="form-control" id="name" defaultValue={user.name} required/>
                                <label id="namelabel" className="form-control-placeholder" htmlFor="name">{user.name}</label>
                                <label id="nameerror" className="form-control-placeholder text-danger d-none" htmlFor="name">Required Field</label>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="bio" defaultValue={user.bio}/>
                                <label id="biolabel" className="form-control-placeholder" htmlFor="bio">{user.bio}</label>
                                <label id="bioerror" className="form-control-placeholder" htmlFor="bio"></label>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control" id="tags" defaultValue={user.tags} required/>
                                <label id="tagslabel" className="form-control-placeholder" htmlFor="tags">Enter tags. Separate by ";"{user.tags}</label>
                                <label id="tagserror" className="form-control-placeholder" htmlFor="tags"></label>
                            </div>
                            <select className="form-select" id="genre" defaultValue={user.genre}>
                                <option value="Select your favorite genre">Select your favorite genre</option>
                                <option value="Action">Action</option>
                                <option value="Drama">Drama</option>
                                <option value="Comedy">Comedy</option>
                            </select>
                            <p className="text-white">{user.timestamp}</p>
                            <button type="button" className="btn btn-primary confirm" onClick={handleConfirm}>Confirm</button>
                            <button type="button" className="btn btn-danger cancel" onClick={handleCancel}>Cancel</button>
                        </form>
                    </div>
                    <div className="profile-info text-center">
                        {/* Restante do código */}
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
                        document.querySelector('.confirm').classList.remove('d-none');
                    }
                    `}
                </script>
            </body>
        </>
    );
}

export default Page;
