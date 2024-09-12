const router = require("express").Router();

const workoutRoutes = require("./workout-routes");
const exerciseRoutes = require("./exerciseRoutes");
const userRoutes = require("./user-routes");
// basic modular routing
router.use("/workout", workoutRoutes);
router.use("/exercise", exerciseRoutes);
router.use("/user", userRoutes);

module.exports = router;
