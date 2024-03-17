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

function Article(props) {
    const [content, setContent] = useState("");
    const [isAuthor, setIsAuthor] = useState(false);

    React.useEffect(() => {
        (async () => {
            userId = await VerifyUser();
            console.log(userId);
            console.log(props.userId);
            if (props.userId === userId) {
                console.log("Author");
                setIsAuthor(true);
            } else {
                console.log("Not author");
                setIsAuthor(true); //Ta bort när testfas är klar!
            }
        })();
    }, []);

    const DeleteExperiment = async (event) => {
        console.log("Deleting experiment");
        try {
            console.log("trying to delete experiment!");  //Fungerar inte i azure på grund av apifel 'https://experimentportalen.azurewebsites.net/Experiment/'+props.id,
            const response = await fetch('https://localhost:7004/Experiment/' + props.id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // Add any necessary authorization headers
                }
            });
            const data = await response.json();
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


    const { title: initialTitle, desc: initialDescription, materials: initialMaterials, instructions: initialInstructions, categories: initialCategories } = props;

    // Set initial states using useState hooks
    const [title, setTitle] = useState(initialTitle || '');
    const [description, setDescription] = useState(initialDescription || '');
    const [materials, setMaterials] = useState(initialMaterials || '');
    const [instructions, setInstructions] = useState(initialInstructions || '');
    const [categories, setCategories] = useState(initialCategories || []);



    // Render checkboxes dynamically based on categories
    const renderCheckboxes = () => {
        const availableCategories = ['Mekanik', 'Kemi', 'Fysik']; // List of available categories
        return availableCategories.map(category => (
            <label key={category}>
                <input
                    type="checkbox"
                    checked={category.includes(category)}
                    onChange={() => handleCheckboxChange(category)}
                />
                {category}
            </label>
        ));
    };


    const handleSubmit = async (event) => {
        event.preventDefault();

        let userId = 0;

        try {
            const userIdResponse = await axios.get("https://localhost:7004/User/VerifyUserId", {
                method: "GET",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem('GUID:')
                },
            });
            console.log("Lyckades verifiera! id är: " + userIdResponse.data);
            userId = userIdResponse.data;
        } catch (error) {
            console.error(error);
        }





        // Construct categories array with desired JSON structure
        const categoriesData = categories.map((cat) => cat.category);
        // Do something with the form data
        console.log({            
            userId,
            title,
            description,
            materials,
            instructions,
            categories: categoriesData
        });
        console.log(props.id);
        //if (userId !== 0) {
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            //https://experimentportalen.azurewebsites.net/Experiment/

            console.log(JSON.stringify({ userId, title, description, materials, instructions, categories: categoriesData }));
            const response = await fetch('https://localhost:7004/Experiment', {
                method: 'POST',
                mode: "cors",
                headers: myHeaders,
                body: JSON.stringify({ 'exptId': props.id, 'userId': userId, 'title': title, 'desc': description, 'materials': materials, 'instructions': instructions, 'categories': categoriesData })
            });

            const data = await response.json();
            console.log('Response:', data);
            console.log(response);
        //} else {
            //inte inloggad
         //   window.location.href = "/login";
       // }

    };

    const handleCheckboxChange = (category) => {
        const isChecked = categories.includes(category);
        if (isChecked) {
            setCategories(categories.filter((cat) => cat !== category));
        } else {
            setCategories([...categories, category]);
        }
    };


    return (
        <div className="singleExperimentContainer">
            <article key={props.id}>
                <form className="form-container" onSubmit={handleSubmit}>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div>
                        <label>Materials:</label>
                        <input type="text" value={materials} onChange={(e) => setMaterials(e.target.value)} />
                    </div>
                    <div>
                        <label>Instructions:</label>
                        <textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
                    </div>
                    <div>
                        <label>Categories:</label>
                        {renderCheckboxes()}
                    </div>
                    <button type="submit">Submit</button>
                </form>
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