const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(409).json({ message: 'Already logged in. log out before switching to a different user' });
    } else {
        next();
    }
}


const isUndergradAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'undergraduate') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized access - not logged in as an undergraduate' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

const isLecturerAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        if (req.user.type == 'lecturer') {
            next();
        } else {
            res.status(403).json({ message: 'Unauthorized access - not logged in as a Lecturer' });
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
            res.status(403).json({ message: 'Unauthorized access - not logged in as an employee' });
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
            res.status(403).json({ message: 'Unauthorized access - not logged in as a webmaster' });
        }
    } else {
        res.status(403).json({ message: 'Unauthorized access' });
    }
}

module.exports = { isUndergradAuthenticated, isLecturerAuthenticated, isEmployeeAuthenticated, isWebmasterAuthenticated, isAuthenticated };