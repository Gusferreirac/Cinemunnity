"use client"

import React, { useState } from 'react';
import TagsInput from './TagsInput';

function MovieForm() {
  const [title, setTitle] = useState("");
  const [plot, setPlot] = useState("");
  const [fullplot, setFullplot] = useState("");
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [release, setRelease] = useState("");
  const [runtime, setRuntime] = useState("");
  const [type, setType] = useState("Filme");

  // Funções para atualizar o estado
  const handleTagsChange = (tags, type) => {
    switch(type) {
      case 'genres':
        setGenres(tags);
        break;
      case 'cast':
        setCast(tags);
        break;
      case 'languages':
        setLanguages(tags);
        break;
      case 'directors':
        setDirectors(tags);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Aqui você pode enviar os dados para o banco de dados
    console.log({ title, plot, fullplot, genres, cast, languages, directors, release, runtime, type });

    try {
      const response = await fetch('/api/add_movie', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, plot, fullplot, genres, cast, languages, directors, release, runtime, type }),
      });

      if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Network response was not ok: ${errorText}`);
      }

      const data = await response.json();
      console.log(data);

      if (data.success) {
          //recarrega a página
          window.location.reload();
      } else {
          alert(data.message); // Exibe a mensagem de erro
      }
  } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
  }
  };

  return (
    <div className='relative h-full bg-gray-700'>
      <div className='flex flex-col items-center justify-center'>
        <h1 className='mb-12 text-center font-bold text-4xl text-white mt-12'>Cadastrar Película</h1>
        <form className='w-2/3 text-black bg-white p-8 rounded'>
          <div className='mb-4'>
            <label htmlFor="title" className='block text-lg mb-2'>Título</label>
            <input
              className='w-full p-2 border border-gray-600 rounded'
              placeholder="Título do filme"
              type="text"
              id="title"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="plot" className='block text-lg mb-2'>Trama</label>
            <textarea
              rows={3}
              className='w-full p-2 border border-gray-600 rounded'
              placeholder="Trama principal"
              id="plot"
              name="plot"
              value={plot}
              onChange={(e) => setPlot(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor="fullplot" className='block text-lg mb-2'>Trama Completa</label>
            <textarea
              rows={5}
              className='w-full p-2 border border-gray-600 rounded'
              placeholder="Trama completa"
              id="fullplot"
              name="fullplot"
              value={fullplot}
              onChange={(e) => setFullplot(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <TagsInput title="Gêneros" id="genres" onTagsChange={(tags) => handleTagsChange(tags, 'genres')} />
          </div>
          <div className='mb-4'>
            <TagsInput title="Elenco" id="cast" onTagsChange={(tags) => handleTagsChange(tags, 'cast')} />
          </div>
          <div className='mb-4'>
            <TagsInput title="Linguagens" id="languages" onTagsChange={(tags) => handleTagsChange(tags, 'languages')} />
          </div>
          <div className='mb-4'>
            <TagsInput title="Diretores" id="directors" onTagsChange={(tags) => handleTagsChange(tags, 'directors')} />
          </div>
          <div className='mb-4'>
            <label htmlFor='release' className='block text-lg mb-2'>Data de Lançamento</label>
            <input
              type='date'
              className='w-full p-2 border border-gray-600 rounded'
              id='release'
              name='release'
              value={release}
              onChange={(e) => setRelease(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='runtime' className='block text-lg mb-2'>Duração</label>
            <input
              type='number'
              placeholder='Duração em minutos'
              className='w-full p-2 border border-gray-600 rounded'
              id='runtime'
              name='runtime'
              value={runtime}
              onChange={(e) => setRuntime(e.target.value)}
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='type' className='block text-lg mb-2'>Tipo</label>
            <select
              className='w-full p-2 border border-gray-600 rounded'
              id='type'
              name='type'
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="movie">Filme</option>
              <option value="series">Série</option>
            </select>
          </div>
        </form>
        <button
            onClick={handleSubmit}
            className='mt-8 mb-12 w-2/3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          >
            Cadastrar
          </button>
      </div>
    </div>
  );
}

export default MovieForm;
