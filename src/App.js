 
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Page from "./components/Page"
import Home from "./components/Home";
import About from "./components/About"; 

function App() {
  
  return (
    <BrowserRouter>
      <div className='container-app'>  
        <Routes>
     
          <Route path="/" element={<Home/>} />
     
          <Route path="/about" element={<About />} />  
          
          <Route path="/:category" element={<Page />} />  

        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default App;
