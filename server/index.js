import express from "express";

const app = express();

const PORT = 5000;

app.get("/", (req,res) => {
    res.send("hello hi")
})

app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT}`);
});
