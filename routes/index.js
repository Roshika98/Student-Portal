const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const authRoutes = require('./authRoutes');
const undergradRoutes = require('./undergradRoutes');
const lecturerRoutes = require('./lecturerRoutes');
const employeeRoutes = require('./employeeRoutes');
const webmasterRoutes = require('./webmasterRoutes');


router.use('/auth', authRoutes);
// router.use('/undergraduate', authMiddleware.isUndergradAuthenticated, undergradRoutes);
// router.use('/lecturer', authMiddleware.isLecturerAuthenticated, lecturerRoutes);
// router.use('/employee', authMiddleware.isEmployeeAuthenticated, employeeRoutes);
// router.use('/webmaster', authMiddleware.isWebmasterAuthenticated, webmasterRoutes);

router.use('/undergraduate', undergradRoutes);
router.use('/lecturer', lecturerRoutes);
router.use('/employee', employeeRoutes);
router.use('/webmaster', webmasterRoutes);


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