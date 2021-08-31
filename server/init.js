import "regenerator-runtime";
import "dotenv/config";
import "./db";
import "./models/User";
import "./models/MyLog";
import app from "./server";

const PORT = process.env.PORT || 7777;

const openServer = () =>
  console.log(`✅ Server Open on port http://localhost:${PORT} 🚀`);

app.listen(PORT, openServer);
