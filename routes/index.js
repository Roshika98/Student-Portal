const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');



router.use('/auth', authRoutes);

/**
 * @swagger
 * /student-portal:
 *  get:
 *   summary: Returns the login page for the portal
 *   responses:
 *    200:
 *     description: The login page
 *     content:
 *      text/html:
 *       schema:
 *        $ref: '#/components/schemas/page'
 */
router.get('/', (req, res) => {
    res.redirect('/student-portal/auth');
});




module.exports = router;