import React, {useState, useEffect} from "react";
import "./styles.css";

import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    let count = repositories.length;

    const response = await api.post('repositories', {
      title: `Repository ${++count}`,
      url: "https://github.com/hugolomas/GoStack_Challenges",
      techs: ["Node.js","ReactJs"],
      likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }

 async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const Repository = repositories.filter(repository =>
      repository.id !== id);

    setRepositories(Repository);
  }

  return (
    <div>
      <ul data-testid="repository-list">
          {repositories.map(repo => 
            <li key={repo.id}>{repo.title}
              <button onClick={() => handleRemoveRepository(repo.id)}>
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
