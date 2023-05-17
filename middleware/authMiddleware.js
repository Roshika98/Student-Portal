const isUndergradAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

const isLecturerAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'lecturer') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized access' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

const isEmployeeAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'employee') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized access' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

const isWebmasterAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'webmaster') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized access' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

module.exports = { isUndergradAuthenticated, isLecturerAuthenticated, isEmployeeAuthenticated, isWebmasterAuthenticated };