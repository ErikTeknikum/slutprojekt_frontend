import useFetch from 'react-fetch-hook';
import React, { useState } from 'react';
import axios from 'axios';

let userId;
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

function Article(props) {
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [materials, setMaterials] = useState('');
    const [instructions, setInstructions] = useState('');


    React.useEffect(() => {
        (async () => {
            const userId = await VerifyUser();
            if (props.userId !== userId) {
                // window.location.href="/home"
                console.log("Not Author GRR");
            }
        })();
    }, []);

    const renderCheckboxes = () => {
        const availableCategories = ['Mekanik', 'Kemi', 'Fysik'];

        return availableCategories.map(category => {
            const isChecked = props.categories.some(innerArray => innerArray.some(categoryObj => categoryObj.category === category));

            return (
                <label key={category}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        readOnly
                    />
                    {category}
                </label>
            );
        });
    };


    const handleCheckboxChange = (category) => {
        const isChecked = categories.includes(category);
        if (isChecked) {
          setCategories(categories.filter((cat) => cat !== category));
        } else {
          setCategories([...categories, category]);
        }
      };
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        let userId = await VerifyUser();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const categoriesData = categories.map((cat) => ({
            category: cat
          }));
        const response = await fetch('https://experimentportalen.azurewebsites.net/Experiment', {
            method: 'PUT',
            mode: "cors",
            headers: myHeaders,
            body: JSON.stringify({ 'id': props.id, 'userId': userId, 'title': title, 'desc': description, 'materials': materials, 'instructions': instructions, 'categories': categoriesData })
        });
        console.log(JSON.stringify({ 'id': props.id, 'userId': userId, 'title': title, 'desc': description, 'materials': materials, 'instructions': instructions, 'categories': categoriesData }));
        const data = await response.json();

    };

    //console.log(props);
    //console.log(props.categories);
    return (
        <div className="singleExperimentContainer">
            <article key={props.id}>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <p>Föregående titel: {props.title}</p>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <p>Föregående beskrivning: {props.desc}</p>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>Materials:</label>
                        <p>Föregående material: {props.materials}</p>
                        <input type="text" value={materials} onChange={(e) => setMaterials(e.target.value)} />
                    </div>
                    <div>
                        <label>Instructions:</label>
                        <p>Föregående instruktioner: {props.instructions}</p>
                        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />

                    </div>
                    <div>
                        <label>Föregående Kategorier</label>
                        {renderCheckboxes(props)}
                        <label>Nya Kategorier:</label>
                        <label>
                            <input
                                type="checkbox"
                                checked={categories.includes('Mekanik')}
                                onChange={() => handleCheckboxChange('Mekanik')}
                            />
                            Mekanik
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={categories.includes('Kemi')}
                                onChange={() => handleCheckboxChange('Kemi')}
                            />
                            Kemi
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                checked={categories.includes('Fysik')}
                                onChange={() => handleCheckboxChange('Fysik')}
                            />
                            Fysik
                        </label>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </article>
        </div>
    );
}

function GetSingleArticle(props) {
    const { data: experimentArr, isLoading } = useFetch(`https://experimentportalen.azurewebsites.net/Experiment/${props.id}`);

    if (isLoading) return <div>Loading...</div>;

    if (!experimentArr) {
        return (
            <main>
                <p>No data available</p>
            </main>
        );
    }

    return (
        <div className='experimentsContainer'>
            <h2>Experiment</h2>
            <Article
                key={experimentArr.id}
                id={experimentArr.id}
                userId={experimentArr.userId}
                name={experimentArr.name}
                title={experimentArr.title}
                desc={experimentArr.desc}
                instructions={experimentArr.instructions}
                materials={experimentArr.materials}
                likeCount={experimentArr.likeCount}
                categories={[experimentArr.categories]}
                imageURLs={[experimentArr.imageURLs.id, experimentArr.imageURLs.url]}
                comments={[experimentArr.comments]}
            />
        </div>
    );
}

export default GetSingleArticle;
