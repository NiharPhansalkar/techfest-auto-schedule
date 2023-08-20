const app = require("./app");
require("dotenv").config({ path: "backend/config/.env" });

app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
