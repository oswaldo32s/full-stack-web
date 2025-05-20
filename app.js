import express from "express";
import cors from "cors";
import { moviesRouter } from "./routes/movies.js";

const app = express();

const PORT = process.env.PORT ?? 8080;

app.disable("x-powered-by");
app.use(express.json());
app.use(cors());

app.use("/movies", moviesRouter);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`);
});
