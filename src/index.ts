import express from "express";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

import apiRouter from "./api";

const PORT = process.env.PORT ?? 80;

const app = express();

app.use(express.json());

app.use("/static", express.static("dist/public"), express.static("src/public"));

app.use("/api", apiRouter);

app.get("/", async (req, res) => {
    res.sendFile(path.resolve("src/public/pages/report/index.html"));
});

app.get("/privacy", async (req, res) => {
    res.sendFile(path.resolve("src/public/pages/privacy/index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
});
