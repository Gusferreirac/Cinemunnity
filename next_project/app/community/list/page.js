'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Loading from '@/components/LoadingScreen';
import { useRouter } from 'next/navigation'; // Não estava importado no seu código
import Card from '@/components/CommunityCard';

function Page() {
    const [communities, setCommunities] = useState(null);
    const router = useRouter(); // Adiciona o router

   //Get communities
   useEffect(() => {
        async function getCommunities() {
            try {
                const response = await fetch('/api/communities', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Size': 100
                    },
                });
                
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log(data);
                setCommunities(data);

                

            } catch (error) {
                console.error('Error:', error);
                alert('An error occurred. Please try again later.');
            }
        }
        
        getCommunities();
    }, []);

    
    if (!communities) return <Loading />;

    return(
        <div className='h-full w-4/5 mx-auto'>
            <Navbar />
            <h1 className='font-bold text-center mt-8 mb-8 text-2xl'>Communities</h1>
            <div className='grid grid-cols-3 gap-8 p-8'>
                { communities ?
                    communities.map((community) => (
                        <Card key={community._id} community={community}/>
                    ))
                : <span className='text-center font-bold text-gray-400'>Loading...</span> }
            </div>
        </div>
    );
}

export default Page;
