import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getCar, updateCar } from "../services/CarsAPI";

export default function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const colorOptions = ["White", "Red", "Grey", "Black", "Yellow"];
  const roofOptions = ["Moon Roof", "Panaromic Roof", "Pop Up Roof", "Spoiler Roof"];

  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const data = await getCar(id);
        setCar(data);
      } catch (err) {
        console.log(err);
        alert("Failed to load car");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setCar((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await updateCar(id, car);
      alert("Car updated!");

      // redirect back to list
      navigate("/customcars");
    } catch (err) {
      console.error(err);
      alert(err?.message || "Update failed");
    }
  };

  if (loading) return <h2>Loading...</h2>;
  if (!car) return <h2>Car not found</h2>;

  return (
    <div
      style={{
        padding: "30px",
        color: "white",
        background: "#111",
        minHeight: "100vh",
      }}
    >
      <h1>Edit Car</h1>

      <form onSubmit={handleUpdate} style={{ maxWidth: "400px" }}>
        <label>Name:</label>
        <input name="name" value={car.name || ""} onChange={handleChange} />

        <label>Exterior:</label>
        <select
          name="exterior"
          value={car.exterior || ""}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select exterior color
          </option>
          {colorOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label>Roof:</label>
        <select name="roof" value={car.roof || ""} onChange={handleChange}>
          <option value="" disabled>
            Select roof type
          </option>
          {roofOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label>Interior:</label>
        <select
          name="interior"
          value={car.interior || ""}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select interior color
          </option>
          {colorOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>

        <label>Price:</label>
        <input
          name="price"
          type="number"
          value={car.price || 0}
          onChange={handleChange}
        />

        <br />
        <br />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
