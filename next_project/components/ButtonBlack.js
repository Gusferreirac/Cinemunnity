function ButtonBlack({ title , isDisabled, onClick }){
    return (
        <button 
        className={
            `bg-black text-white px-4 py-2 rounded w-full 
            hover:bg-transparent border-2 border-black hover:text-black transition-all duration-200 
            ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'}
            `
        }
        onClick={onClick}
        disabled={isDisabled}>
            {title}
        
        
        </button>
    );
}

export default ButtonBlack;