const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");


app.use(bodyParser.json());

app.post('/getResponse', (req, res) => {

    const genAI = new GoogleGenerativeAI(process.env.APIKEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = req.body.question;

    model.generateContent(prompt).then(result => {
        console.log(result.response.text());
        res.status(200).json({
            response: result.response.text()
        })
    }).catch(err => {
        console.log(err)
        return res.status(500).json({
            error: err
        })
    })

})



module.exports = app;