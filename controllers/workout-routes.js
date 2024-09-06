const express = require('express');
const router = express.Router();
const { Workout } = require('../models'); 

router.get('/', async (req, res) => {
    try {
        const workouts = await Workout.findAll();
        res.json(workouts);
    } catch (error) {
        console.error('Error fetching workouts:', error);
        res.status(500).json({ error: 'An error occurred while fetching workouts' });
    }
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const workout = await Workout.findByPk(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        res.json(workout);
    } catch (error) {
        console.error('Error fetching workout:', error);
        res.status(500).json({ error: 'An error occurred while fetching the workout' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updatedWorkoutData = req.body;
    try {
        const workout = await Workout.findByPk(id);
        if (!workout) {
            return res.status(404).json({ error: 'Workout not found' });
        }
        await workout.update(updatedWorkoutData);
        res.json({ message: 'Workout updated successfully' });
    } catch (error) {
        console.error('Error updating workout:', error);
        res.status(500).json({ error: 'An error occurred while updating the workout' });
    }
});

router.post('/', async (req, res) => {
    const newWorkoutData = req.body;
    try {
        const newWorkout = await Workout.create(newWorkoutData);
        res.status(201).json(newWorkout);
    } catch (error) {
        console.error('Error creating workout:', error);
        res.status(500).json({ error: 'An error occurred while creating the workout' });
    }
});

module.exports = router;