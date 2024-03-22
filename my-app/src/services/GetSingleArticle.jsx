import * as React from 'react';
import useFetch from 'react-fetch-hook';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';


let userId = 0;

async function VerifyUser() {
  try {
    const userIdResponse = await axios.get("https://experimentportalen.azurewebsites.net/User/VerifyUserId", {
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
    console.log("Du är ej inloggad")
    return 0;
  }
}

function EditExperiment(props) {
  const currentPath = window.location.origin;
  const newUrl = `${currentPath}/experiment/${props.id}/edit`;
  window.location.href = newUrl;
}

function Article(props) {
  const [content, setContent] = useState("");
  const [isAuthor, setIsAuthor] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  
  React.useEffect(() => {
    (async () => {
      userId = await VerifyUser();
      const liked = await checkIfLiked(userId);
      setIsLiked(liked);
 

      if (props.userId === userId) {
        console.log("Author");
        setIsAuthor(true);
      } else {
        console.log("Not author");
      }
    })();
  }, [props.id]);

  const DeleteExperiment = async (event) => {
    console.log("Deleting experiment");
    try {
      console.log("trying to delete experiment!");  //Fungerar inte i azure på grund av apifel 'https://experimentportalen.azurewebsites.net/Experiment/'+props.id,
      const response = await fetch('https://experimentportalen.azurewebsites.net/Experiment/' + props.id, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authorization headers
        }
      });
      const data = await response.json();
      if(response.ok){
        window.localtion.href="/home";
      }
    } catch (error) {
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
    } else {
      window.location.href = "/login"
    }

    window.location.reload();
  };

  const checkIfLiked = async (event) => {
    try {
      console.log("trying to check if already liked"); //Fungerar, men inte på azure?, Specialtecken gör att det blir konstig länk
      const response = await fetch('https://experimentportalen.azurewebsites.net/Like/Check?exptId=' + props.id + '&userId=' + userId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if(response.ok){
        const data = await response.json();
        console.log(data);
        return data;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  const likeExperiment = async (event) => {
    event.preventDefault();
    userId = await VerifyUser();
    console.log("userId in likeExperiment", userId);

    //Fetchar userId
    let isLiked = await checkIfLiked();
    //Kolla ifall sidan redan är likad
    console.log(isLiked);

    if (userId !== 0) {
      if (isLiked) {
        try {
          console.log("trying to unlike"); //Fungerar, men inte på azure?, Specialtecken gör att det blir konstig länk
          const response = await fetch('https://experimentportalen.azurewebsites.net/Like?exptId=' + props.id + '&userId=' + userId, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if(response.ok){
            window.location.reload();
          }
          //window.location.reload();
        } catch (error) {
          console.error(error);
        }
      } else if(isLiked != null) {
        try {
          console.log("trying to like"); //Fungerar, men inte på azure?, Specialtecken gör att det blir konstig länk
          const response = await fetch('https://experimentportalen.azurewebsites.net/Like?exptId=' + props.id + '&userId=' + userId, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          console.log(response);
          if(response.ok){
            window.location.reload();
          }
          //w
        } catch (error) {
          console.error(error);
        }
      }

    } else {
      //Inte inloggad
      window.location.href = "/login";
    }
  }

  return (
    <div className="singleExperimentContainer">
      <article key={props.id}>
        <h3>{props.title}</h3>
        {isAuthor && ( //Genereras endast om användaren är skaparen
          <>
            <button onClick={DeleteExperiment}>Ta bort experiment</button> <br /><br />
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

        {props.imageURLs.map((imageArr, index) => (
          <img key={index} src={process.env.PUBLIC_URL + "/images/" + imageArr.url} alt={`Image ${index + 1}`} />        
        ))}

        <p><b>Användarnamn:</b> {props.name}</p>
        <p><b>Beskrivning:</b> {props.desc}</p>
        <p><b>Instruktioner:</b> {props.instructions}</p>

        <form onSubmit={likeExperiment}>
          <div>
            <p>👍: {props.likeCount}</p><button type="submit">{isLiked ? 'Unlike' : 'Like'}</button>
          </div>
        </form>

        {props.comments.map((commentArray, index) => (
          <section key={index}>
            <h4>Kommentarsfält</h4>

            <form onSubmit={createComment}>
              <div>
                <label>Skriv en kommentar:</label><br />
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} /><button type="submit" className="commentSubmitBtn">Submit</button>
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

  if (isLoading) return <img src="Spinner-1s-200px.svg" alt="loadingResources" style={{width: 100}}/>;

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
        imageURLs={experimentArr.imageURLs} // Fixed the imageURLs array syntax
        comments={[experimentArr.comments]} // Fixed the comments array syntax
      />
    </div>
  );
}


export default GetSingleArticle;