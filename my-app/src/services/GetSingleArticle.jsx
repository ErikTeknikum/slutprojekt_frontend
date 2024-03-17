import * as React from 'react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


let userId = 0;

async function VerifyUser() {
  try {
    const userIdResponse = await axios.get("https://localhost:7004/User/VerifyUserId", {
      method: "GET",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem('GUID:')
      }
    });
    console.log("Lyckades verifiera! id är: " + userIdResponse.data);
    userId = userIdResponse.data;
    return userId;
  } catch (error) {
    console.error(error);
    return 0;
  }
}

function EditExperiment(props){
  const currentPath = window.location.origin; 
  const newUrl = `${currentPath}/experiment/${props.id}/edit`; 
  window.location.href = newUrl; 
}

function Article(props) {
  const [content, setContent] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);

  React.useEffect(() => {
    (async () => {
      userId = await VerifyUser();
      console.log(userId);
      console.log(props.userId);
      if(props.userId === userId){
        console.log("Author");
        setIsAuthor(true);
      } else{
        console.log("Not author");
      }
    })();
  }, []);

  const DeleteExperiment = async (event) => {
    console.log("Deleting experiment");
    try{
      console.log("trying to delete experiment!");  //Fungerar inte i azure på grund av apifel 'https://experimentportalen.azurewebsites.net/Experiment/'+props.id,
      const response = await fetch('https://localhost:7004/Experiment/'+props.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authorization headers
        }
      });
      const data = await response.json();
    } catch(error){
      console.error(error);
    }
  }

  const createComment = async (e) => {
    e.preventDefault();
    userId = await VerifyUser();
    console.log("userId in createComment", userId);
    if (userId !== 0) {
      if (content.length > 1) {
        if (content.length < 501) {

          try {
            console.log("trying to post!");
            const response = await fetch('https://experimentportalen.azurewebsites.net/Comment', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                // Add any necessary authorization headers
              },
              body: JSON.stringify({ 'content': content, 'exptId': props.id, 'name': "string", 'userId': userId }), //Kom ihåg att ändra så att userId inte är hårdkodat!!!
            });
            const data = await response.json();
            console.log("data:");
            console.log(data);
            console.log(content);
            console.log(props.id);

            //Skapa meddelande för lyckad kommentaruppladdning

            setContent("");

          } catch (error) {
            console.error('Error creating comment:', error);
          }
        } else {
          console.log("comment is too long!");
        }
      } else {
        console.log("no content");
      }
    } else{
      window.location.href="/login"
    }

    window.location.reload();
  };

  const likeExperiment = async (event) => {
    event.preventDefault();
    userId = await VerifyUser();
    console.log("userId in likeExperiment", userId);

    //Fetchar userId
   
    if (userId !== 0) {
      try {
        console.log("trying to like"); //Fungerar, men inte på azure?, Specialtecken gör att det blir konstig länk
        const response = await fetch('https://experimentportalen.azurewebsites.net/Like?exptId=' + props.id + '&userId=' + userId, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response);
        console.log("Lyckades gilla experiment!");
        //window.location.reload();
      } catch (error) {
        console.error(error);
      }
    } else {
      //Inte inloggad
      console.log("du är inte inloggad!");
      window.location.href = "/login";
    }
  }

  return (
    <div className="singleExperimentContainer">
      <article key={props.id}>
        <h3>{props.title}</h3>
        {isAuthor && ( //Genereras endast om användaren är skaparen
          <>
          <button onClick={DeleteExperiment}>Ta bort experiment</button>
          <button onClick={() => EditExperiment(props)}>Redigera experiment</button>

          </>

        )}
        <h4>Kategorier</h4>
        <ul>
          {props.categories.map((innerCaArray, index) => (
            <React.Fragment key={index}> { }
              {innerCaArray.map((categoryObj, innerIndex) => (
                <li key={innerIndex}>{categoryObj.category}</li>
              ))}
            </React.Fragment>
          ))}
        </ul>

        <p><b>Användarnamn:</b> {props.name}</p>
        <p><b>Beskrivning:</b> {props.desc}</p>
        <p><b>Instruktioner:</b> {props.instructions}</p>
        
        <form onSubmit={likeExperiment}>
          <div>
            <p>👍: {props.likeCount}</p><button type="submit">Gilla</button>
          </div>
        </form>
        
        {props.comments.map((commentArray, index) => (
          <section key={index}>
            <h4>Kommentarsfält</h4>

            <form onSubmit={createComment}>
              <div>
                <label>Skriv en kommentar:</label><br />
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} /><button type="submit">Submit</button>
              </div>
            </form>

            {commentArray.map((comment, innerIndex) => (
              <div key={innerIndex}>
                <p>{comment.content} <b>| {comment.name}</b></p>
              </div>
            ))}
          </section>
        ))}
      </article>
    </div>
  );
}



function GetSingleArticle(props) {
  console.log(props.id);

  const { data: experimentArr, isLoading } = useFetch(`https://experimentportalen.azurewebsites.net/Experiment/${props.id}`);

  console.log(experimentArr);

  if (isLoading) return <div>Loading...</div>;

  if (!experimentArr) {
    return (
      <main>
        <p>No data available</p>
      </main>
    );
  }


  // No need to map over experimentArr if it's a single object
  return (
    <div className='experimentsContainer'>
      <h2>Experiment</h2>
      <Article
        key={experimentArr.id} // Don't forget to add a unique key
        id={experimentArr.id}
        userId={experimentArr.userId}
        name={experimentArr.name}
        title={experimentArr.title}
        desc={experimentArr.desc}
        instructions={experimentArr.instructions}
        materials={experimentArr.materials}
        likeCount={experimentArr.likeCount}
        categories={[experimentArr.categories]} // Fixed the categories array syntax
        imageURLs={[experimentArr.imageURLs.id, experimentArr.imageURLs.url]} // Fixed the imageURLs array syntax
        comments={[experimentArr.comments]} // Fixed the comments array syntax
      />
    </div>
  );
}


export default GetSingleArticle;