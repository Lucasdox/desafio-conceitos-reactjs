import React, { useState, useEffect } from "react";
import api from './services/api'

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => setRepositories(response.data))
  }, [])

  async function handleAddRepository() {
    const { data } = await api.post('repositories')
    setRepositories([...repositories, data])
  }

  async function handleRemoveRepository(id) {
    const repositorieIndex = repositories.findIndex(repo => repo.id === id)
    repositories.splice(repositorieIndex, 1)
    setRepositories([...repositories])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <>
            <li key={repo.id}>
              {repo.title}
            </li>
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
