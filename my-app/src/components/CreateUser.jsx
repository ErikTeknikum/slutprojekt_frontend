import { defer } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FormComponent from "../services/CreateExperimentService";

function CreateUser(){
   return(
    <div>
        <main>
            <FormComponent />
        </main>
        <footer>
            <p>ExperimentPortalen - Erik Larsson</p>
        </footer>
    </div>
    
   )
}
export default CreateUser;