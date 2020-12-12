const User = require("../models/user");
const { sendEmail } = require("../utils/emails");

const router = require("express").Router();

router.post("/user/register", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(user) {
            return res.status(400).json({
                success: false,
                message: "Email already exists."
            });
        }

        const newUser = await User.create({
            email: req.body.email
        }); 

        console.log(`${process.env.BACKEND_URL}/user/verify/${newUser._id}`);

        sendEmail(newUser.email,  "Please verify your email", `
            <p>Please follow the link to verify your email before using the API</p>
            <p><a href="http://${process.env.BACKEND_URL}/user/verify/${newUser._id}"> Click here </a></p>
        `);

        return res.json({
            success: true,
            message: "User created successfully",
            data: {
                ...newUser._doc
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }

});

router.get("/user/verify/:user_id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.user_id, {is_verified: true});
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not found."
            });
        }

        return res.json({
            success: true,
            message: "Email verified successfully",
            data: {
                ...user._doc,
                is_verified: true
            }
        });
    } catch (error) {
        console.error(error);
        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;
