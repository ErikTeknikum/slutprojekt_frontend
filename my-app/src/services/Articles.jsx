import * as React from 'react';
import useFetch from 'react-fetch-hook';

function Article(props) {
  const handleClick = () => {
    console.log(props.id);
    const currentPath = window.location.origin; 
    const newUrl = `${currentPath}/experiment/${props.id}`; 
    window.location.href = newUrl; 
  }
  
    return ( 
    <div className="experimentContainer" onClick={handleClick}>
      <article key={props.id}>
        <h3>{props.title}</h3>

        <h4>Kategorier</h4>
        <ul>
          {props.categories.map((innerArray, index) => (
            <React.Fragment key={index}> {}
              {innerArray.map((categoryObj, innerIndex) => (
                <li key={innerIndex}>{categoryObj.category}</li>
              ))}
            </React.Fragment>
          ))}
        </ul>

        {props.imageURLs.map((imageArr, index) => (
          <img key={index} src={process.env.PUBLIC_URL + "/images/" + imageArr.url} alt={`Image ${index + 1}`} />        
        ))}
        
        <p><b>Användarnamn:</b> {props.name}</p>  
        <p><b>Beskrivning:</b> {props.desc}</p>
        <p><b>Instruktioner:</b> {props.instructions}</p>
        <p>👍: {props.likeCount}</p>
        <form action=""></form>

      </article>
    </div>
  );
}



function Articles() {
  //let experimentArr = []
  const {data:experimentArr, isLoading} = useFetch("https://experimentportalen.azurewebsites.net/Experiment");

  console.log(experimentArr);

  if (isLoading) {
    return (
      
      <img src="Spinner-1s-200px.svg" alt="loadingResources" style={{width: 100}}/>
      
    );
  }

  if (!experimentArr) {
    return (
      <main>
        <p>No data available</p>
      </main>
    );
  }

  const articles = experimentArr.map((element) => (
    <Article
        key={element.id} // Don't forget to add a unique key when mapping over arrays in React
        id={element.id}
        userId={element.userId}
        name={element.name}
        title={element.title}
        desc={element.desc}
        instructions={element.instructions}
        materials={element.materials}
        likeCount={element.likeCount}
        categories={[element.categories]} // Fixed the categories array syntax
        imageURLs={element.imageURLs} // Fixed the imageURLs array syntax
        comments={[element.comments.id, element.comments.userId, element.comments.name, element.comments.exptId, element.comments.content]} // Fixed the comments array syntax
    />    
  ));

  return (
    
      <div className='experimentsContainer'>
        <h2>Experiment</h2>
        {articles}
      </div>
      
    
  );
}

export default Articles;