"use client"


import React from 'react';
import TagsInput from './TagsInput';


function MovieForm(){
    return(
        <div className='relative h-full bg-gray-700'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='mb-12 text-center font-bold text-4xl text-white mt-12'>Cadastrar Película</h1>
                <form className='w-2/3 text-black bg-white p-8 rounded'>
                    <div className='mb-4'>
                        <label htmlFor="title" className='block text-lg mb-2' >Título</label>
                        <input className='w-full p-2 border border-gray-600 rounded' placeholder="Título do filme" type="text" id="title" name="title" />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="plot" className='block text-lg mb-2' >Trama</label>
                        <textarea rows={3} className='w-full p-2 border border-gray-600 rounded' placeholder="Trama principal" id="plot" name="plot" />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="plot" className='block text-lg mb-2' >Trama Completa</label>
                        <textarea rows={5} className='w-full p-2 border border-gray-600 rounded' placeholder="Trama completa" id="fullplot" name="fullplot" />
                    </div>
                    <div className='mb-4'>
                        <TagsInput title="Genêros" id="genres"/>
                    </div>
                    <div className='mb-4'>
                        <TagsInput title="Elenco" id="cast"/>
                    </div>
                    <div className='mb-4'>
                        <TagsInput title="Linguagens" id="languages"/>
                    </div>
                    <div className='mb-4'>
                        <TagsInput title="Diretores" id="directors"/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='release' className='block text-lg mb-2'>Data de Lançamento</label>
                        <input type='date' className='w-full p-2 border border-gray-600 rounded' id='release' name='release'/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='runtime' className='block text-lg mb-2'>Duração</label>
                        <input type='number' placeholder='Duração em minutos' className='w-full p-2 border border-gray-600 rounded' id='runtime' name='runtime'/>
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='type' className='block text-lg mb-2'>Tipo</label>
                        <select className='w-full p-2 border border-gray-600 rounded' id='type' name='type'>
                            <option value="movie">Filme</option>
                            <option value="series">Série</option>
                        </select>
                    </div>
                </form>
                <button className='mt-8 w-2/3 mb-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Cadastrar</button>
            </div>
        </div>
      
    );
}

export default MovieForm;