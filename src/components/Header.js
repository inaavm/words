import { useState } from "react"
import { Link } from "react-router-dom" // Add this import
import "./header.css"
import wordCollections from "../data/wordCollections";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Dynamically generate the links from the word collections keys
  const links = Object.keys(wordCollections).map((category) => ({
    name: category.charAt(0).toUpperCase() + category.slice(1), // Capitalize the category name
    path: `/${category}`, // Path should match the dynamic route
  }));

  return (
    <div className="header-container">
      <header className="header">
        <div className="site-title">Wuertschatz</div>
        <button className="filter-button" onClick={toggleMenu}>
          THEMEN
          <span className={`chevron ${isMenuOpen ? "open" : ""}`}>&#9662;</span>
        </button>
      </header>

      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="dropdown-content">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.path} // Use Link's 'to' prop to navigate
              className="menu-link"
              onClick={() => {
                setIsMenuOpen(false); // Close the menu when a link is clicked
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}


// export default function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen)
//   }

 
//   // Sample links for the dropdown menu
//   const links = [
   
//     { name: "Aarbecht", path: "/aarbecht" },
//     { name: "Gesond", path: "/gesond" },
//     { name: "Gesondheet", path: "/gesondheet" },
//     { name: "Heemecht", path: "/heemecht" },
//     { name: "Hobbies", path: "/hobbies" },
//     { name: "Kaddoen", path: "/kaddoen" },
//     { name: "Kleedung", path: "/kleedung" },
//     { name: "Kreativitéit", path: "/kreativitéit" },
//     { name: "Kultur", path: "/kultur" },
//     { name: "Liesen", path: "/liesen" },
//     { name: "Medien", path: "/medien" },
//     { name: "Natur", path: "/natur" },
//     { name: "Sproochen", path: "/sproochen" },
//     { name: "Sproochen", path: "/sproochen" },
//     { name: "Sport", path: "/sport" },
//     { name: "Summer", path: "/summer" },
//     { name: "Transport", path: "/transport" },
//     { name: "Vakanz", path: "/vakanz" },
//     { name: "Wanter", path: "/wanter" },
//     { name: "Wunnen", path: "/wunnen" },
//     { name: "d‘Stad", path: "/stad" },
//   ];




//   return (
//     <div className="header-container">
//       <header className="header">
//         <div className="site-title">readings.design</div>
//         <button className="filter-button" onClick={toggleMenu}>
//           FILTER
//           <span className={`chevron ${isMenuOpen ? "open" : ""}`}>&#9662;</span>
//         </button>
//       </header>

//       <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
//         <div className="dropdown-content">
//           {links.map((link, index) => (
//             <Link
//               key={index}
//               to={link.path}
//               className="menu-link"
//               onClick={() => {
//                 setIsMenuOpen(false)
//               }}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }