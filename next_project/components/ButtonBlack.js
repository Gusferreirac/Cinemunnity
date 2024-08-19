function ButtonBlack({ title , isDisabled }){
    return (
        <button 
        className={`bg-black text-white px-4 py-2 rounded w-full ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}`}
        disabled={isDisabled}>
            {title}
        </button>
    );
}

export default ButtonBlack;