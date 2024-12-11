import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { clerkMiddleware } from "@clerk/express";
import fileUpload from "express-fileupload";
import path from "path";
import cron from "node-cron";
import fs from "fs";
import { createServer } from "http";

import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import albumRoutes from "./routes/albumRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import { connectDB } from "./lib/db.js";
import { initializeSocket } from "./lib/socket.js";

dotenv.config();

const PORT = process.env.PORT;
const __dirname = path.resolve();

const app = express();

const httpServer = createServer(app);
initializeSocket(httpServer);

app.use(cors(
  {
    origin: process.env.CLIENT_URL,
    credentials: true,
  }
));
app.use(express.json());
app.use(clerkMiddleware()); // this will add auth to req obj => req.auth
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "temp"),
    createParentPath: true,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  })
);

// Schedule a cron job to run at the start of every hour
const tempDir = path.join(process.cwd(), "temp");
cron.schedule("0 * * * *", () => {
  // Check if the temporary directory exists
	if (fs.existsSync(tempDir)) {
    // Read the contents of the temporary directory
		fs.readdir(tempDir, (err, files) => {
			if (err) {
				console.log("error", err);
				return;
			}
       // Iterate over the files and delete each one
			for (const file of files) {
				fs.unlink(path.join(tempDir, file), (err) => {});
			}
		});
	}
});

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/albums", albumRoutes);
app.use("/api/stats", statRoutes);

if(process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
  });
}

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  connectDB();
});
