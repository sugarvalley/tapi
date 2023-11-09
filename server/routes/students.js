import express, { response } from "express";
import {getCourse, getStudent} from "../dataGen/generator.js";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";

const packageDefinition = protoLoader.loadSync('server/schedule.proto');
const scheduleProto = grpc.loadPackageDefinition(packageDefinition);

protoLoader.loadSync('server/schedule.proto');

const client = new scheduleProto.ScheduleService('127.0.0.1:9090', grpc.ChannelCredentials.createInsecure());

export const studentsRouter = express.Router();

// studentsRouter.get('/:id', (req, res) => {
//     res.send(getStudent(req.params.id));
// }).get('/:id/schedule', (req, res) => {
//     res.send(getCourse(req.params.id));
// });

studentsRouter.get('/:id', (req, res) => {
    client.getStudent({studentId: "1"}, (err, response) => {
        if (err != null) {
            console.error(err);
        }
    })
    res.send(response)
})