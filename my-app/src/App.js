import './App.css';
import Navigation from './components/Navigation';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ExperimentForm from './components/ExperimentForm';
import LoginForm from './components/LoginForm';
import Experiment from './components/SingleExperiment';
import NotFound from './components/NotFound';
import Register from './components/Register';
import EditExperiment from './components/EditExperiment';

function App() {
  return (
    <div className="App">
      <Router>
         <Navigation/>          
         <Routes>
         <Route path="/home" element = {<Home/>}/>
          <Route path="/create-experiment" element = {<ExperimentForm/>}/>
          <Route path="/login" element = {<LoginForm/>}/>
          <Route path="/experiment/:experimentid" element={<Experiment/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/experiment/:experimentid/edit" element={<EditExperiment/>}/>
          <Route path='*'element={<NotFound/>}/>
         </Routes>
      </Router>

    </div>
  );
}

export default App;