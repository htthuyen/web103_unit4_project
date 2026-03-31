import React from "react";
import "../App.css";
import { getAllCars } from "../services/CarsAPI";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ViewCars.css"


const ViewCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await getAllCars();
      setCars(data);
      setError("");
    } catch (err) {
      console.log(err);
      setError("Failed to load cars");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <h2 className="status-message">Loading cars...</h2>;
  if (error) return <h2 className="status-message">{error}</h2>;

  return (
    <div className="view-cars-page">
      {cars.length === 0 ? (
        <p className="status-message">No cars found.</p>
      ) : (
        <div className="cars-grid">
          {cars.map((car) => {
            const carId = car.id;

            return (
              <div className="car-card" key={carId}>
                <h2>{car.name}</h2>
                <p>
                  <strong>Exterior:</strong> {car.exterior}
                </p>
                <p>
                  <strong>Roof:</strong> {car.roof}
                </p>
                <p>
                  <strong>Interior:</strong> {car.interior}
                </p>
                <p>
                  <strong>Price:</strong> ${car.price}
                </p>

                <div className="car-actions">
                  <Link to={`/cars/${carId}`} className="details-btn">
                    View
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ViewCars;
