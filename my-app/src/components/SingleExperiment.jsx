import React from 'react';
import { useParams } from 'react-router-dom';
import Article from '../services/GetSingleArticle';

function SingleExperiment() {
  const { experimentid } = useParams();

  return (
    <div>
      <main>
        <Article id={experimentid}/>
      </main>
      <footer>
        <p>ExperimentPortalen - Erik Larsson</p>
      </footer>
    </div>
  );
}

export default SingleExperiment;