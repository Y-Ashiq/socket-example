import express from "express";
import connectDB from "./database/DBconnection.js";
import { Server } from "socket.io";
import noteModel from "./database/models/notes.model.js";
const app = express();
const port = 3000;

connectDB;
app.get("/", (req, res) => res.send("Hello World!"));
let server = app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`)
);

const io = new Server(server, { cors: "*" });

io.on("connection", (socket) => {
  console.log(socket.id);
  socket.on("sendNotes", async (data) => {
    await noteModel.create(data);

    let notes = await noteModel.find();
    socket.emit("notes", notes);
  });

  socket.on("refreshing", async () => {
    let notes = await noteModel.find();
    socket.emit("notes", notes);
  });
  socket.on("deleteNote", async (id) => {
    await noteModel.findByIdAndDelete(id);

    let notes = await noteModel.find();
    socket.emit("notes", notes);
  });
});
