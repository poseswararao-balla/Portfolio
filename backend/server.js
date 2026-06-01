const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

/* Save Contact Form */

app.post("/contact", (req, res) => {

    const filePath = path.join(__dirname, "contacts.json");

    let contacts = [];

    if (fs.existsSync(filePath)) {
        contacts = JSON.parse(
            fs.readFileSync(filePath, "utf8")
        );
    }

    contacts.push(req.body);

    fs.writeFileSync(
        filePath,
        JSON.stringify(contacts, null, 2)
    );

    res.json({
        success: true,
        message: "Message saved successfully"
    });

});

/* Get Projects */

app.get("/projects", (req, res) => {

    const filePath = path.join(__dirname, "projects.json");

    const projects = JSON.parse(
        fs.readFileSync(filePath, "utf8")
    );

    res.json(projects);

});

app.listen(5000, () => {
    console.log("Server Running On Port 5000");
});