const pool = require('../config/pool');
const { body, validationResult } = require('express-validator')
const {validPassword, genPassword} = require('../lib/passwordUtil');


const alphaErr = 'must only contain letters.';
const emailErr = 'must contain @ and ends with .com.'
const passLength = 'must be greater than 6 characters.'


const validateUser = [
    body('fullName').trim()
        .matches(/^[A-Za-z\s]+$/).withMessage(`Full name ${alphaErr}`),
    body('email').trim()
        .isEmail().withMessage(`Email ${emailErr}`),
    body('password').trim()
        .isLength({min: 6, max: 20}).withMessage(`Password ${passLength}`)
]






exports.getForm = (req, res) => {
    res.render('signupForm')
}


exports.postForm = [validateUser, async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        console.log("Validation Errors: ", errors.array());
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const { fullName, email, password } = req.body;
        const admin = req.body.admin || false;

        const saltHash = genPassword(password);
        
        const salt = saltHash.salt;
        const hash = saltHash.hash;
        
        const member_status = 'non-member';

        await pool.query('INSERT INTO users (fullname, email, salt, hash, membership_status, is_admin) VALUES ($1, $2, $3, $4, $5, $6)',
            [fullName, email, salt, hash, member_status, admin]
        )
        res.redirect('/')
    } catch (err) {
        console.error("Database Error: ", err);
        res.status(500).send('Internal Server Error');
    }

}];



