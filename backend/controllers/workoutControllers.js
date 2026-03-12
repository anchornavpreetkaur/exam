const Workout = require("../models/workoutModel");

// GET /api/workouts — ALREADY IMPLEMENTED
const getAllWorkouts = async (req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
};

// POST /api/workouts — ALREADY IMPLEMENTED
const createWorkout = async (req, res) => {
  const workout = await Workout.create(req.body);
  res.status(201).json(workout);
};

// TODO (Q1): Implement getWorkoutById
// - Find the workout using req.params.workoutId
// - Return the workout as JSON
// - Return 404 with { error: "Workout not found" } if not found
const getWorkoutById = async (req, res) => {
  const workout = await Workout.findById(req.params.workoutId);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.json(workout);
};

// TODO (Q3): Implement updateWorkout
// - Update the workout by req.params.workoutId using req.body
// - Use options { new: true, runValidators: true }
// - Return the updated workout as JSON
// - Return 404 with { error: "Workout not found" } if not found
const updateWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndUpdate(
    req.params.workoutId,
    req.body,
    { new: true, runValidators: true }
  );
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.json(workout);  
};

// TODO (Q2): Implement deleteWorkout
// - Delete the workout by req.params.workoutId
// - Return the deleted workout as JSON
// - Return 404 with { error: "Workout not found" } if not found
const deleteWorkout = async (req, res) => {
  const workout = await Workout.findByIdAndDelete(req.params.workoutId);
  if (!workout) {
    return res.status(404).json({ error: "Workout not found" });
  }
  res.json(workout);
};

module.exports = {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
};
