import express from 'express';
import Bakery from '../models/Bakery.js';

const router = express.Router();

// Get all bakeries
router.get('/', async (req, res) => {
  try {
    const bakeries = await Bakery.find().sort({ createdAt: -1 });
    res.json(bakeries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single bakery
router.get('/:id', async (req, res) => {
  try {
    const bakery = await Bakery.findById(req.params.id);
    if (!bakery) {
      return res.status(404).json({ error: 'Bakery not found' });
    }
    res.json(bakery);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create bakery
router.post('/', async (req, res) => {
  try {
    const bakery = new Bakery(req.body);
    await bakery.save();
    res.status(201).json(bakery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update bakery
router.put('/:id', async (req, res) => {
  try {
    const bakery = await Bakery.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!bakery) {
      return res.status(404).json({ error: 'Bakery not found' });
    }
    res.json(bakery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete bakery
router.delete('/:id', async (req, res) => {
  try {
    const bakery = await Bakery.findByIdAndDelete(req.params.id);
    if (!bakery) {
      return res.status(404).json({ error: 'Bakery not found' });
    }
    res.json({ message: 'Bakery deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
