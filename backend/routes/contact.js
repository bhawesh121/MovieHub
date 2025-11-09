const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, message } = req.body;
  console.log('Contact message:', { name, email, message });
  res.json({ success: true, message: 'Received' });
});

module.exports = router;
