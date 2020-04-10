import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [techs, setTechs] = useState('');

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title,
      url,
      techs: [],
    })
    const repo = response.data;
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    // TODO
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(
      repository => repository.id !== id
    )

    setRepositories(newRepositories);
  }

  return (
    <div>
      <input
        placeholder='titulo'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        placeholder='url do repositorio'
        value={url}
        onChange={e => setUrl(e.target.value)}
      />
      <input
        placeholder='tecnologias'
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>
            <p> {repository.title} </p>
            <p>{repository.url}</p>
            <p>{repository.techs}</p>
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
