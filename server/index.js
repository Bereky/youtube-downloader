const express = require("express")
const app = express()
const ytdl = require("ytdl-core")
const cors = require("cors")
const PORT = 5000

app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get("/download", cors(), async (req, res) => {
    const link = req.query.link

    try {
        const info = await ytdl.getBasicInfo(link)
        const h360 = info.formats.filter((file) => file.qualityLabel === "360p")
        const h720 = info.formats.filter((file) => file.qualityLabel === "720p")
        const h1080 = info.formats.filter((file) => file.qualityLabel === "1080p")
        res.json({info: info, data: [h1080[0], h720[0], h360[0]]})
    } 
    catch(err) {
        res.status(400).json({error: "Not a youtube domain"})
    }
})

app.listen(PORT, () => console.log("Server running on port:", PORT))