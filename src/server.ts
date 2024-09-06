import express from "express";
import { PORT } from "./secrets";
import rootRouter from "./routes";
import { errorMiddleware } from "./middleware/error";

const app = express();
app.use(express.json());

app.use("/api", rootRouter);

app.use(errorMiddleware);
app.listen(PORT, () => {
  console.log(`App listening to PORT ${PORT}`);
});
