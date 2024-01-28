const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);

const {Server} = require("socket.io")

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});

app.get("/", (req, res) => {
    res.send("hello there!")
});

io.on("connection", (socket)=>{
    console.log("user connected");

    socket.on("disconnect", ()=>{
        console.log("user disconnected");
    })

    socket.on("chat message", (msg)=>{
        io.emit("chat message", msg);
    })

    
    socket.on("lang change", (msg)=>{
        io.emit("lang change", msg);
    })

    socket.onAny((eventName, msg)=>{
        io.emit(eventName, msg);
    })
});

server.listen(8080, ()=>{
    console.log("Listening on port 8080")
})