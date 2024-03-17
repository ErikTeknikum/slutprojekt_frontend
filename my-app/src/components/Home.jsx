import { defer } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Articles from "../services/Articles";

function Home(){
   return(
    <div className="articles-wrapper">
        <main>
            <Articles />
        </main>
        <footer>
            <p>ExperimentPortalen - Erik Larsson</p>
        </footer>
    </div>

   )
}
export default Home;