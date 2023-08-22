const app = require("./app");
const db = require("./db/db");
const teamRoute = require("./routes/teamsRoute");

app.use("/api/v1", teamRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
