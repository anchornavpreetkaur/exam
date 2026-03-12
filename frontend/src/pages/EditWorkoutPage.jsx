import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const EditWorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workoutTitle, setWorkoutTitle] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [sessionPrice, setSessionPrice] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("Beginner");
  const [status, setStatus] = useState("available");
  const [requiredEquipment, setRequiredEquipment] = useState("");

  // Fetch workout on page load
  useEffect(() => {
    fetch(`/api/workouts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkoutTitle(data.workoutTitle);
        setDescription(data.description);
        setCity(data.location.city);
        setState(data.location.state);
        setSessionPrice(data.sessionPrice);
        setFitnessLevel(data.fitnessLevel);
        setStatus(data.status);
        setRequiredEquipment(data.requiredEquipment);
      })
      .catch((err) => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedWorkout = {
      workoutTitle,
      description,
      location: {
        city,
        state,
      },
      sessionPrice,
      fitnessLevel,
      status,
      requiredEquipment,
    };

    try {
      await fetch(`/api/workouts/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedWorkout),
      });

      navigate(`/workouts/${id}`);
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return (
    <div className="create">
      <h2>Update Workout</h2>

      <form onSubmit={handleSubmit}>
        <label>Workout Title</label>
        <input
          value={workoutTitle}
          onChange={(e) => setWorkoutTitle(e.target.value)}
        />

        <label>Description</label>
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>City</label>
        <input value={city} onChange={(e) => setCity(e.target.value)} />

        <label>State</label>
        <input value={state} onChange={(e) => setState(e.target.value)} />

        <label>Session Price</label>
        <input
          type="number"
          value={sessionPrice}
          onChange={(e) => setSessionPrice(e.target.value)}
        />

        <label>Fitness Level</label>
        <select
          value={fitnessLevel}
          onChange={(e) => setFitnessLevel(e.target.value)}
        >
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>

        <label>Status</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="available">Available</option>
          <option value="full">Full</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <label>Required Equipment</label>
        <input
          value={requiredEquipment}
          onChange={(e) => setRequiredEquipment(e.target.value)}
        />

        <button type="submit">Update Workout</button>
      </form>
    </div>
  );
};

export default EditWorkoutPage;