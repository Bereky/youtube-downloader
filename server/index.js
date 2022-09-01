const express = require("express")
const app = express()
const ytdl = require("ytdl-core")
const dotenv = require("dotenv").config()

// @Cors 
const cors = require("cors")
const corsOpt = {
    origin: "http://localhost:3000",
    credentials: true,
    optionSuccessStatus: 200
}

const PORT = process.env.PORT || 5000

app.use(express.urlencoded({extended: false}))

// Access right granted with cors middleware
app.use(cors(corsOpt))

app.get('/', (req, res) => {
    res.send("Go to https://github.com/bereky")
})

app.get('/download', async (req, res) => {

    // Get the link from the request params
    const link = req.query.link

    try {
        // Get video info using ytdl
        const info = await ytdl.getBasicInfo(link)
        const h360 = info.formats.filter((file) => file.qualityLabel === "360p")
        const h720 = info.formats.filter((file) => file.qualityLabel === "720p") 
        const h1080 = info.formats.filter((file) => file.qualityLabel === "1080p")

        // Respond the metadata
        res.json({info: info, data: [h1080[0], h720[0], h360[0]]})
    } 
    catch(err) {
        res.status(400).json({error: "Not a youtube domain"})
    }
})

app.listen(PORT, () => console.log("Server running on port:", PORT))