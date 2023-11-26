const express = require('express');
const router = express.Router();

//the moudle - Idea.js
const Idea = require('../models/Idea');

// const ideas = [
//   {
//     id: 1,
//     text: 'Creating a Smart Home Automation System',
//     tag: 'technology',
//     username: 'Shish',
//   },
//   {
//     id: 2,
//     text: 'Exploring Sustainable Energy Solutions',
//     tag: 'environment',
//     username: 'EcoEnthusiast',
//   },
//   {
//     id: 3,
//     text: 'Developing an Educational App for Kids',
//     tag: 'education',
//     username: 'EduTechMaster',
//   },
//   {
//     id: 4,
//     text: 'Designing a Community Garden Project',
//     tag: 'community',
//     username: 'GreenThumb',
//   },
//   {
//     id: 5,
//     text: 'Building a Social Networking Platform for Gamers',
//     tag: 'gaming',
//     username: 'GameMaster',
//   },
// ];

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
    res.json({ success: true, data: updatedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

//del idea
router.delete('/:id', async (req, res) => {
  try {
    await Idea.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: 'somthing went wrong' });
  }
});

module.exports = router;
