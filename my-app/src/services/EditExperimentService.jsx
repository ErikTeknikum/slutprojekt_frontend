import useFetch from 'react-fetch-hook';
import React, { useState } from 'react';
import axios from 'axios';

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
        return userIdResponse.data;
    } catch (error) {
        console.error(error);
        return 0;
    }
}

function Article(props) {
    const [content, setContent] = useState("");
    const [categories, setCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [materials, setMaterials] = useState('');
    const [instructions, setInstructions] = useState('');

    React.useEffect(() => {
        (async () => {
            const userId = await VerifyUser();
            if (props.userId !== userId) {
                window.location.href="/home"
            }
        })();
    }, []);

    const renderCheckboxes = () => {
        const availableCategories = ['Mekanik', 'Kemi', 'Fysik'];
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

        let userId = await VerifyUser();

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const response = await fetch('https://localhost:7004/Experiment', {
            method: 'PUT',
            mode: "cors",
            headers: myHeaders,
            body: JSON.stringify({ 'exptId': props.id, 'userId': userId, 'title': title, 'desc': description, 'materials': materials, 'instructions': instructions, 'categories': categories })
        });

        const data = await response.json();
        console.log('Response:', data);
        console.log(response);
    };

    const handleCheckboxChange = (category) => {
        const isChecked = categories.some(cat => cat.category === category);
        if (isChecked) {
            setCategories(categories.filter(cat => cat.category !== category));
        } else {
            setCategories([...categories, { category }]);
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
