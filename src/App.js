 
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Page from "./components/Page";
import Header from "./components/Header";

function App() {
  
    return (
      <BrowserRouter>
        <div className='container-app'>  
          <Routes>
       
            <Route path="/" element={<Home/>} />
            {/* <Route path="/sport" element={<Sport />} /> */}
            <Route path="/:category" element={<Page />} />  
          </Routes>
        </div>
      </BrowserRouter>
    );
  
}

export default App;
