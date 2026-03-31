import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCar, deleteCar } from "../services/CarsAPI";
import "./CarDetails.css";

import moonRoof from "../assets/roofs/moon-roof.png";
import panoramic from "../assets/roofs/panoramic.png";
import popUp from "../assets/roofs/pop-up.png";
import spoiler from "../assets/roofs/spoiler.png";

const COLOR_HEX_BY_NAME = {
  White: "#e5e5e5",
  Red: "#e00000",
  Grey: "#7a7f87",
  Black: "#000000",
  Yellow: "#d4cc22",
};

const ROOF_IMAGE_BY_NAME = {
  "Moon Roof": moonRoof,
  "Panaromic Roof": panoramic,
  "Pop Up Roof": popUp,
  "Spoiler Roof": spoiler,
};

function resolveColor(value) {
  if (!value) return null;
  if (typeof value === "string" && value.trim().startsWith("#")) return value.trim();
  return COLOR_HEX_BY_NAME[value] || null;
}

export default function CarDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id);
        setCar(data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Failed to load car details");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteCar(id);
      navigate("/customcars");
    } catch (err) {
      console.error(err);
      alert("Failed to delete car");
    }
  };

  if (loading) return <h2 className="details-status">Loading...</h2>;
  if (error) return <h2 className="details-status">{error}</h2>;
  if (!car) return <h2 className="details-status">Car not found</h2>;

  const exteriorHex = resolveColor(car.exterior);
  const interiorHex = resolveColor(car.interior);
  const roofImage = car.roof ? ROOF_IMAGE_BY_NAME[car.roof] : null;

  return (
    <div className="car-details-page">
      <div className="details-card">
        <h1>{car.name}</h1>

        <div className="details-grid">
          <p><strong>Convertible:</strong> {car.convertible ? "Yes" : "No"}</p>
          <div className="details-row">
            <strong>Exterior:</strong>
            <div className="details-row-content">
              {exteriorHex && (
                <span
                  className="details-swatch"
                  style={{ backgroundColor: exteriorHex }}
                  title={car.exterior}
                />
              )}
              <span className="details-value">{car.exterior}</span>
            </div>
          </div>
          <div className="details-row">
            <strong>Roof:</strong>
            <div className="details-row-content">
              {roofImage && (
                <img className="details-roof" src={roofImage} alt={car.roof} />
              )}
              <span className="details-value">{car.roof}</span>
            </div>
          </div>
          <div className="details-row">
            <strong>Interior:</strong>
            <div className="details-row-content">
              {interiorHex && (
                <span
                  className="details-swatch"
                  style={{ backgroundColor: interiorHex }}
                  title={car.interior}
                />
              )}
              <span className="details-value">{car.interior}</span>
            </div>
          </div>
          <p><strong>Price:</strong> ${car.price}</p>
        </div>

        <div className="details-actions">
          <Link to="/customcars" className="back-btn">
            Back
          </Link>

          <Link to={`/edit/${car.id}`} className="edit-btn">
            Edit
          </Link>

          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}