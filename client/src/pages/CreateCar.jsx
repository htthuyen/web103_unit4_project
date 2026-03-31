import React from "react";
import "../App.css";
import Navigation from "../components/Navigation";
import { useRef, useState } from "react";
import "./CreateCar.css";
import moonRoof from "../assets/roofs/moon-roof.png";
import panoramic from "../assets/roofs/panoramic.png";
import popUp from "../assets/roofs/pop-up.png";
import spoiler from "../assets/roofs/spoiler.png";
import { createCar } from "../services/CarsAPI"
import { useNavigate } from "react-router-dom";


const tabs = ["EXTERIOR", "ROOF", "INTERIOR"];

const colorOptions = [
  {id:1, color:"#e5e5e5", name: "White", price:1000},
  {id:2, color:"#e00000", name: "Red", price: 2000},
  {id:3, color:"#7a7f87", name: "Grey", price: 800},
  {id:4, color:"#000000", name: "Black", price: 500},
  {id:5, color: "#d4cc22", name: "Yellow", price: 2000}
];

const roofOptions = [
  { id: 1, image: moonRoof, name: "Moon Roof", price: 500},
  { id: 2, image: panoramic, name: "Panaromic Roof", price: 1000 },
  { id: 3, image: popUp, name: "Pop Up Roof" , price: 2000},
  { id: 4, image: spoiler, name: "Spoiler Roof", price: 2500},
];

const CreateCar = () => {
  const navigate = useNavigate();
  const carNameInputRef = useRef(null);
  const [carName, setCarName] = useState("My New Car");
  const [convertible, setConvertible] = useState(false);
  const [selectedTab, setSelectedTab] = useState("EXTERIOR");
  const [selectedColor, setSelectedColor] = useState(colorOptions[0]);
  const [selectedRoof, setSelectedRoof] = useState(roofOptions[0]);
  const [hoveredRoofId, setHoveredRoofId] = useState(null);
  const [hoveredExteriorId, setHoveredExteriorId] = useState(null);
  const [selectInteriorColor, setSelectInteriorColor] = useState(colorOptions[0]);
  const [hoveredInteriorId, setHoveredInteriorId] = useState(null);
  const [price] = useState(40000);

  const handleNextTab = () => {
    const currentIndex = tabs.indexOf(selectedTab);

    if (currentIndex < tabs.length - 1) {
      setSelectedTab(tabs[currentIndex + 1]);
    } else {
      carNameInputRef.current?.focus();
      carNameInputRef.current?.select?.();
    }
  };

  const handleCreate = async (event) => {
    if (event) event.preventDefault();
    const newCar = {
      name: carName,
      exterior: selectedColor.name,
      roof: selectedRoof.name,
      interior: selectInteriorColor.name,
      price: price + selectedColor.price + selectedRoof.price + selectInteriorColor.price
    };

    console.log("Attempting to create car with data:", newCar);

    try {
        const savedCar = await createCar(newCar);
        console.log("Car saved successfully:", savedCar);
        navigate("/customcars");
    } catch (err){
        console.error("Error creating car:", err.message);
        alert(`Error: ${err.message}`);
    }
  };
  return (
    <div>
      <div className="create-car-page">
        <div className="overlay">
          <header className="top-bar">
            <label className="convertible-check">
              <input
                type="checkbox"
                checked={convertible}
                onChange={() => setConvertible(!convertible)}
              />
              <span>Convertible</span>
            </label>

            <div className="tabs">
              {["EXTERIOR", "ROOF", "INTERIOR"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${selectedTab === tab ? "active" : ""}`}
                  onClick={() => setSelectedTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="create-controls">
              <input
                ref={carNameInputRef}
                type="text"
                value={carName}
                onChange={(e) => setCarName(e.target.value)}
                className="car-name-input"
              />
              <button className="create-btn" onClick={handleCreate}>
                CREATE
              </button>
            </div>
          </header>
          <main className="customization-panel">
            {/* EXTERIOR TAB */}
            {selectedTab === "EXTERIOR" && (
              <div className="swatch-grid">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    className={`swatch ${
                      selectedColor.id === color.id ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectedColor(color)}
                    onMouseEnter={() => setHoveredExteriorId(color.id)}
                    onMouseLeave={() => setHoveredExteriorId(null)}
                    title={`${color.name}: $${color.price}`}
                    aria-label={`${color.name}: $${color.price}`}
                  >
                    {hoveredExteriorId === color.id && (
                      <div className="swatch-price">${color.price}</div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* ROOF TAB */}
            {selectedTab === "ROOF" && (
              <div className="roof-grid">
                {roofOptions.map((roof) => (
                  <div
                    key={roof.id}
                    className={`roof-item ${
                      selectedRoof.id === roof.id ? "selected" : ""
                    }`}
                    onClick={() => setSelectedRoof(roof)}
                    onMouseEnter={() => setHoveredRoofId(roof.id)}
                    onMouseLeave={() => setHoveredRoofId(null)}
                    title={`${roof.name}: $${roof.price}`}
                  >
                    <img src={roof.image} alt={roof.name} />
                    {hoveredRoofId === roof.id && (
                      <div className="roof-price">${roof.price}</div>
                    )}
                  </div>
                ))}
              </div>
            )}

   
            {/* INTERIOR */}
            {selectedTab === "INTERIOR" && (
                <div className="swatch-grid">
                {colorOptions.map((color) => (
                  <button
                    key={color.id}
                    className={`swatch ${
                      selectInteriorColor.id === color.id ? "selected" : ""
                    }`}
                    style={{ backgroundColor: color.color }}
                    onClick={() => setSelectInteriorColor(color)}
                    onMouseEnter={() => setHoveredInteriorId(color.id)}
                    onMouseLeave={() => setHoveredInteriorId(null)}
                    title={`${color.name}: $${color.price}`}
                    aria-label={`${color.name}: $${color.price}`}
                  >
                    {hoveredInteriorId === color.id && (
                      <div className="swatch-price">${color.price}</div>
                    )}
                  </button>
                ))}
                </div>
            )}

            <button className="done-btn" onClick={handleNextTab}>
              DONE
            </button>
          </main>

          <div className="price-badge">
            <span className="money-icon">💰</span>
            <span>${price}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCar;
