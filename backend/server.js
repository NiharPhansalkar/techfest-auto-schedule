const app = require("./app");
const db = require("./db/db");
const teamRoute = require("./routes/teamsRoute");
const authRoute = require("./routes/authRoute");
const path = require("path");

app.use("/api/v1", teamRoute);
app.use("/api/v1", authRoute);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
