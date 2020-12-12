const shortid = require("shortid");
const Link = require("../models/links");
const User = require("../models/user");

const router = require("express").Router();

router.post("/shorten", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        
        if(!user) {
            return res.status(400).json({
                success: false,
                message: "Email does not match our records."
            });
        }

        if(!user.is_verified) {
            return res.status(400).json({
                success: false,
                message: "please verify your email first"
            });
        }

        let shortLink = {
            original_url: req.body.url,
            short_url: shortid.generate(),
            user_id: user._id, 
        }

        const newShortLink = await Link.create(shortLink); 

        return res.json({
            success: true,
            message: "Link shorten successfully",
            data: {
                ...newShortLink._doc
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

router.get("/shorten/:url", async (req, res) => {
    try {
        const urlData = await Link.findOne({short_url: req.params.url});
        if(!urlData) {
            return res.status(400).json({
                success: false,
                message: "Link not found."
            });
        }

        return res.json({
            success: true,
            message: "Link shorten successfully",
            data: {
                ...urlData._doc
            }
        })
    } catch (error) {
        
    }
});

router.get("/:url", async (req, res) => {
    try {
        const urlData = await Link.findOne({short_url: req.params.url});
        if(!urlData) return res.send("URL not found")
        res.redirect(urlData.original_url);
    } catch (error) {
        console.error(error.message);
        res.send("Something went wrong!!!!")
    }
})

module.exports = router;