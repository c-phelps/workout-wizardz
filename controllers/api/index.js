const router = require("express").Router();

const workoutRoutes = require("./workoutRoutes");
const exerciseRoutes = require("./exerciseRoutes");
const userRoutes = require("./userRoutes");

router.use("/workout", workoutRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/user", userRoutes);

module.exports = router;
