import React, { useState, useEffect } from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState('');
  const [urlRepo, setUrlRepo] = useState('');
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
      urlRepo,
      techs,
    })
    const repo = response.data;
    setRepositories([...repositories, repo])
  }

  async function handleRemoveRepository(id) {
    // TODO
    const response = await api.delete(`repositories/${id}`);

    if (response.status === 204) {
      const repositoryIndex = repositories.findIndex(repo => repo.id !== id);
      repositories.splice(repositoryIndex, 1);
      setRepositories([...repositories])
    }

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
        value={urlRepo}
        onChange={e => setUrlRepo(e.target.value)}
      />
      <input
        placeholder='tecnologias'
        value={techs}
        onChange={e => setTechs(e.target.value)}
      />
      <ul data-testid="repository-list">
        {repositories.map(repo =>
          <li key={repo.id}>
            <p> {repo.title} </p>
            <p>{repo.urlRepo}</p>
            <p>{repo.techs}</p>
            <button onClick={() => handleRemoveRepository(1)}>
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
