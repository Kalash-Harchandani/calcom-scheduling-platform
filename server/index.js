import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/",async(req,res)=>{
    res.send("Scheduling API Running.")
});

const PORT = process.env.PORT || 5005;

app.listen(PORT, ()=>{
    console.log(`Server runnning on port ${PORT}`);
});