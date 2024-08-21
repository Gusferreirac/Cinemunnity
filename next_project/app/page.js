"use client"

import Navbar from "@/components/Navbar";
import ButtonBlack from "@/components/ButtonBlack";
import FeaturedFilms from "@/components/FeaturedFilms";

function Page(){
    return(
        <div className="max-w-[85%] m-auto">
            <Navbar />
            <hr className='mb-4'/>
            <div className='flex m-auto'>
                <div className='flex m-auto mb-12'>
                    <div className='max-w-[50%] mr-8 space-y-8 my-auto'>
                        <h1 className='font-bold text-4xl'> Discover de World of Movies</h1>
                        <p>Join our community of film lovers and share your thoughts on the latest movies.</p>
                        <ButtonBlack title='Join Now' isDisabled={false}/>
                    </div>
                    <div className='max-w-[50%] ml-8'>
                        <img className="rounded-lg" src='hero.png' alt='Parasite' />
                    </div>
                </div>
            </div>
            <FeaturedFilms />
        </div>
    );
  }
  
  export default Page;