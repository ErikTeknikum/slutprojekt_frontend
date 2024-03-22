import * as React from 'react';
import { useState } from 'react';
import useFetch from 'react-fetch-hook';
import axios from 'axios';

const FormComponent = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [materials, setMaterials] = useState('');
  const [instructions, setInstructions] = useState('');
  const [categories, setCategories] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let userId = 0;

    try {
      const userIdResponse = await axios.get("https://experimentportalen.azurewebsites.net/User/VerifyUserId", {
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
    const categoriesData = categories.map((cat) => ({
      category: cat
    }));

    


    // Do something with the form data
   
    if(userId!==0){
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");


      console.log({
        userId,
        title,
        description,
        materials,
        instructions,
        categories: categoriesData,
        'imgURLs':imageURLs
        
      });  

      console.log(JSON.stringify({ userId, title, description, materials, instructions, categories: categoriesData , imageURLs}));
      const response = await fetch('https://localhost:7004/Experiment', {
      method: 'POST',
      mode: "cors",
      headers: myHeaders,
      body: JSON.stringify({'userId':userId,'title':title,'desc':description, 'materials':materials, 'instructions':instructions,'categories':categoriesData, 'imageURLs':imageURLs})
    });

  
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response:', data);
    console.log(response);
    } else{
      //inte inloggad
      window.location.href="/login";
    }
 
  };

  const handleCheckboxChange = (category) => {
    const isChecked = categories.includes(category);
    if (isChecked) {
      setCategories(categories.filter((cat) => cat !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleFileInputChange = (event) => {
    const files = event.target.files;
    const reader = new FileReader();
    reader.onload = () => {
      const dataURL = reader.result;              
      const imgElement = createImageElement(dataURL);
      document.getElementById('image-preview').appendChild(imgElement);
      const base64Image = reader.result.split(',')[1];
      setImageURLs(prevState => [...prevState, { image: base64Image }]);
    };
    reader.readAsDataURL(files[0]);
  };



  const createImageElement = (dataURL) => {
    const imgElement = document.createElement('img');
    imgElement.src = dataURL;
    imgElement.style.maxWidth = '100%';
    imgElement.style.maxHeight = '200px';
    return imgElement;
  };


  return (
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
        <label>Bild</label>
        <input type="file" onChange={handleFileInputChange} accept="image/jpeg, image/png" multiple />
        <div id="image-preview" style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}></div>
      </div>

      <div>
        <label>Categories:</label>
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
  );
};

export default FormComponent;
