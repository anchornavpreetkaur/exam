const express = require("express");
const router = express.Router();
const requireAuth = require("../middleware/requireAuth");
const {
  getAllWorkouts,
  createWorkout,
  getWorkoutById,
  updateWorkout,
  deleteWorkout,
} = require("../controllers/workoutControllers");

// GET /api/workouts
router.get("/", getAllWorkouts);

// POST /api/workouts
router.post("/", requireAuth, createWorkout);

// GET /api/workouts/:workoutId
router.get("/:workoutId", getWorkoutById);

// PUT /api/workouts/:workoutId
router.put("/:workoutId", requireAuth, updateWorkout);

// DELETE /api/workouts/:workoutId
router.delete("/:workoutId", requireAuth, deleteWorkout);

module.exports = router;
