const express = require("express");

const {
  getBootcamps,
  getBootcamp,
  createBootcamp,
  updateBootcamp,
  deleteBootcamp,
  getBootcampsInRadius,
  bootcampPhotoUpload,
} = require("../controllers/bootcamps");

const Bootcamp = require("../models/Bootcamp");

// Include other resource routers
const courseRouter = require("./courses");
const reviewRouter = require("./reviews");

const router = express.Router();
const { protect, authorize } = require("../middleware/auth");

const advancedResults = require("../middleware/advancedResults");

//Re-route into other resource routers
router.use("/:bootcampId/courses", courseRouter);
router.use("/:bootcampId/reviews", reviewRouter);

router.route("/radius/:zipcode/:distance").get(getBootcampsInRadius);

// Photo upload route

/**
 * @swagger
 * /api/v1/bootcamps/{id}/photo:
 *   put:
 *     summary: Upload a photo for a bootcamp
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp id
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Photo uploaded successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bootcamp not found
 */
/**
 * @swagger
 * /api/v1/bootcamps:
 *   post:
 *     summary: Create a new bootcamp
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bootcamp'
 *     responses:
 *       201:
 *         description: Bootcamp created successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *   get:
 *     summary: Get all bootcamps
 *     tags: [Bootcamps]
 *     responses:
 *       200:
 *         description: Bootcamps fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Bootcamp'
 */

/**
 * @swagger
 * /api/v1/bootcamps/{id}:
 *   get:
 *     summary: Get a bootcamp by ID
 *     tags: [Bootcamps]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp id
 *     responses:
 *       200:
 *         description: Bootcamp fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Bootcamp'
 *       404:
 *         description: Bootcamp not found
 *   put:
 *     summary: Update a bootcamp by ID
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Bootcamp'
 *     responses:
 *       200:
 *         description: Bootcamp updated successfully
 *       400:
 *         description: Invalid request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bootcamp not found
 *   delete:
 *     summary: Delete a bootcamp by ID
 *     tags: [Bootcamps]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Bootcamp id
 *     responses:
 *       200:
 *         description: Bootcamp deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Bootcamp not found
 */

router
  .route(protect, "/:id/photo")
  .put(protect, authorize("publisher", "admin"), bootcampPhotoUpload);

router
  .route("/")
  .get(advancedResults(Bootcamp, "courses"), getBootcamps)
  .post(protect, authorize("publisher", "admin"), createBootcamp);

router
  .route("/:id")
  .get(getBootcamp)
  .put(protect, authorize("publisher", "admin"), updateBootcamp)
  .delete(protect, authorize("publisher", "admin"), deleteBootcamp);

module.exports = router;
