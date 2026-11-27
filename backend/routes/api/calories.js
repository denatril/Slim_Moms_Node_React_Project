
import { Router } from "express";
import { authenticate } from "../../middlewares/authenticate.js";
import { calculateCalories } from "../../controllers/calories.js";
import {
  savePrivateCalories,
  getPrivateCalories,
} from "../../controllers/private-calories.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Calories
 *   description: Daily calorie calculations and user calorie information
 */

/**
 * @swagger
 * /api/calories:
 *   post:
 *     summary: Calculate daily calorie needs
 *     tags: [Calories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - age
 *               - currentWeight
 *               - desiredWeight
 *             properties:
 *               height:
 *                 type: number
 *                 example: 180
 *               age:
 *                 type: integer
 *                 example: 25
 *               currentWeight:
 *                 type: number
 *                 example: 85
 *               desiredWeight:
 *                 type: number
 *                 example: 75
 *               bloodType:
 *                 type: integer
 *                 enum: [1, 2, 3, 4]
 *                 example: 1
 *     responses:
 *       200:
 *         description: Calorie calculation completed
 *       400:
 *         description: Invalid input
 */
router.post("/", calculateCalories);

/**
 * @swagger
 * /api/calories/private:
 *   post:
 *     summary: Calculate and save user's calorie information
 *     tags: [Calories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - height
 *               - age
 *               - currentWeight
 *               - desiredWeight
 *             properties:
 *               height:
 *                 type: number
 *                 example: 180
 *               age:
 *                 type: integer
 *                 example: 25
 *               currentWeight:
 *                 type: number
 *                 example: 85
 *               desiredWeight:
 *                 type: number
 *                 example: 75
 *               bloodType:
 *                 type: integer
 *                 enum: [1, 2, 3, 4]
 *                 example: 1
 *     responses:
 *       200:
 *         description: Calorie information saved
 *       401:
 *         description: Unauthorized
 *       400:
 *         description: Invalid input
 *
 *   get:
 *     summary: Get user's saved calorie information
 *     tags: [Calories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Saved calorie information
 *       401:
 *         description: Unauthorized
 *       204:
 *         description: No calorie profile has been saved yet
 */
router.post("/private", authenticate, savePrivateCalories);
router.get("/private", authenticate, getPrivateCalories);

export default router;
