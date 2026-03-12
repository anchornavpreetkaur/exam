import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const WorkoutPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [workout, setWorkout] = useState(null);

  // Fetch workout details
  useEffect(() => {
    fetch(`/api/workouts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setWorkout(data);
      })
      .catch((err) => {
        console.error("Error fetching workout:", err);
      });
  }, [id]);

  // Delete workout
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await fetch(`/api/workouts/${id}`, {
        method: "DELETE",
      });

      navigate("/");
    } catch (error) {
      console.error("Error deleting workout:", error);
    }
  };

  if (!workout) return <p>Loading...</p>;

  return (
    <div className="rental-preview">
      <h2>Workout Details</h2>

      <p><strong>Title:</strong> {workout.workoutTitle}</p>
      <p><strong>Description:</strong> {workout.description}</p>
      <p><strong>City:</strong> {workout.location?.city}</p>
      <p><strong>State:</strong> {workout.location?.state}</p>
      <p><strong>Session Price:</strong> {workout.sessionPrice}</p>
      <p><strong>Fitness Level:</strong> {workout.fitnessLevel}</p>
      <p><strong>Status:</strong> {workout.status}</p>
      <p><strong>Required Equipment:</strong> {workout.requiredEquipment}</p>

      <br />

      <button onClick={handleDelete}>Delete</button>

      <Link to={`/edit-workout/${id}`}>
        <button>Edit</button>
      </Link>
    </div>
  );
};

export default WorkoutPage;