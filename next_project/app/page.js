import Navbar from "@/components/Navbar";
import ButtonBlack from "@/components/ButtonBlack";

function Page(){
    return(
        <>
            <Navbar />
            <hr className='mb-4'/>
            <div className='w-[80%] flex m-auto'>
                <div className='max-w-[50%] mr-8 space-y-8 my-auto'>
                    <h1 className='font-bold text-4xl'> Discover de World of Movies</h1>
                    <p>Join our community of film lovers and share your thoughts on the latest movies.</p>
                    <ButtonBlack title='Join Now' isDisabled={false}/>
                </div>
                <div className='max-w-[55%] ml-8'>
                    <img src='hero.png' alt='Parasite' />
                </div>
            </div>
        </>
    );
  }
  
  export default Page;