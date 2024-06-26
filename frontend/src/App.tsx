import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [data, setData] = useState<{ title: string, body: string } | null>(null);
  const fetchLocally = false;

  useEffect(() => {
    const timer = setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => response.json())
        .then(json => setData(json))
        .catch(error => console.error(`Error: ${error}`));
      
      if (fetchLocally) {
        console.log('Local fetch is enabled')
        fetch('http://localhost:3000/users')
          .then(response => response.text())
          .then(data => console.log(data))
          .catch(error => console.error(`Error: ${error}`));
      }
      else {
        console.log('Local fetch is disabled');
      }
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, [fetchLocally]);

  return (
    <div className="App">
      {data ? (
        <div>
          <h2>{data.title}</h2>
          <p>{data.body}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;