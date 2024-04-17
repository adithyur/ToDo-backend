const express = require("express");
const cors = require("cors");
const { connectToMongoDB } = require("./Db/index");

const taskRouter = require("./Routes/task")

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

connectToMongoDB();

app.use("/api/task",taskRouter);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

console.log('Server started successfully!');
