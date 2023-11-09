import express from "express";
import { createServer } from "node:http";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import cors from "cors";
// import {io} from "./websocket/socket.js";
import {studentsRouter} from "./routes/students.js"
import {coursesRouter} from "./routes/courses.js"


export const app = express();
export const rest = createServer(app);

app.use(cors({
    origin: '*'
}));

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

const packageDefinition = protoLoader.loadSync('server/schedule.proto');
const scheduleProto = grpc.loadPackageDefinition(packageDefinition);

const server = new grpc.Server();

server.bindAsync("127.0.0.1:9090", grpc.ServerCredentials.createInsecure(), (err, port) => {
    if(err != null) {
        return console.error(err);
    }
    console.log(`gRPC listening on ${port}`);
    server.start();
});

server.addService(scheduleProto.ScheduleService.service, {
    GetStudent: (req, res) => {
        console.log(req.request);
        res({name: "", surname: ""});
    }
})

rest.listen(3000, () => {
    // io.listen(rest, {
    //     cors: {
    //         origin: 'http://localhost:5173',
    //     }
    // })
})