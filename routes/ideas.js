const express = require('express');
const router = express.Router();

//the moudle - Idea.js
const Idea = require('../models/Idea');

//get all ideas
router.get('/', async (req, res) => {
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

//get a single idea
router.get('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    res.json({
      success: true,
      data: idea,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

//post req - add idea
router.post('/', async (req, res) => {
  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

//update idea
router.put('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);

    //match username to idea:
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }

    // Username do not match
    res.status(403).json({
      success: false,
      error: 'you are not authorized to update this',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

//del idea
router.delete('/:id', async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    //match username to idea:
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({
        success: true,
        data: {},
      });
    }
    //if not match
    res
      .status(403)
      .json({ success: false, error: 'you are not authorized to delete this' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

module.exports = router;
