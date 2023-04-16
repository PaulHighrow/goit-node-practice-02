const app = require("./app");
require("dotenv").config();
const connectDB = require("./db/connection");

const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, (error) => {
      if (error) {
        console.log("Server launch error", error);
      }
      console.log(`Server running. Use our API on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(`Failed to launch application with ${error.message}`);
    process.exit(1);
  }
};

startServer();
