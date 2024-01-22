/**
 * Courses router.
 * Defines routes for managing courses.
 * Includes middleware for authentication and authorization.
 * Routes map to controller functions for retrieving, adding, updating and deleting courses.
 */
const express = require("express");
const {
  getCourses,
  getCourse,
  updateCourse,
  deleteCourse,
  addcourse,
} = require("../controllers/courses");

const Course = require("../models/Course");
const advancedResults = require("../middleware/advancedResults");

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require("../middleware/auth");

router
  .route("/:id")
  .get(getCourse)
  .put(protect, authorize("publisher", "admin"), updateCourse)
  .delete(protect, authorize("publisher", "admin"), deleteCourse);
router
  .route("/")
  .get(
    advancedResults(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(protect, authorize("publisher", "admin"), addcourse);

module.exports = router;
