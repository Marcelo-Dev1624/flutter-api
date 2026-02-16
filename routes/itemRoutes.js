const express = require('express');
const router = express.Router();
const item = require('./models/item');



// CREATE (POST)
router.post('/', async (req, res) => {
  try {
    const newitem = new item(req.body);
    const saveditem = await newitem.save();
    res.status(201).json(saveditem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// READ ALL (GET)
router.get('/', async (req, res) => {
  try {
    const items = await item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// UPDATE (PUT)
router.put('/:id', async (req, res) => {
  try {
    const updateditem = await item.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updateditem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  try {
    await item.findByIdAndDelete(req.params.id);
    res.json({ message: 'item deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
