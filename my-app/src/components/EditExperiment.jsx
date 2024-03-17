import { defer } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EditExperimentService from "../services/EditExperimentService";
import { useParams } from 'react-router-dom';

function ExperimentForm(){
    const { experimentid } = useParams();
   return(
    <div>
        <main>
            <EditExperimentService id={experimentid}/>

        </main>
        <footer>
            <p>ExperimentPortalen - Erik Larsson</p>
        </footer>
    </div>
    
   )
}
export default ExperimentForm;