// const express = require("express");
// const router = express.Router();
// require("dotenv").config();

// const appMessage = require("../utils/sendMessage.js");

// const controllers = require("../controllers/GoogleSlackController.js");

// router.get('/slack/auth', (req, res) => {

//     res.redirect(`https://slack.com/oauth/v2/authorize?client_id=${process.env.SLACK_CLIENT_ID}&user_scope=${process.env.SLACK_SCOPE}&redirect_uri=${encodeURIComponent(process.env.SLACK_REDIRECT_URI)}`);

// });

// router.get('/google/auth', (req, res) => {

//     controllers.entrar(req, res);
    
// })

// router.get('/slack/callback', async (req, res) => {

//     controllers.callback(req, res);
    
// });

// module.exports = router;