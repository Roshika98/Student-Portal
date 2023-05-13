const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');


router.use('/auth', authRoutes);

router.get('', (req, res) => {
    res.redirect('/student-portal/auth');
});




module.exports = router;