import { useRouter } from 'next/navigation';
import ButtonBlack from "./ButtonBlack";

function Card({community }) {
  const router = useRouter();

  const goToCommunity = () => {
    const id = community._id;
    router.push(`/community/${id}`);
  }

  return (
    <>
        <div key={community._id} className='flex flex-col gap-4 bg-gray-300 p-8 rounded-md'>
            <h1 className='font-bold text-center'>{community.name}</h1>
            <p className='text-justify text-gray-600 p-6 '>{community.description}</p>
            <button className='border border-black w-1/2 h-12 rounded-md mb-8 mx-auto hover:bg-black hover:text-white transition-colors' onClick={goToCommunity}>Go to Community</button>
        </div>  
    </>
  );
}

export default Card;