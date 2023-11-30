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

//https://swagger-autogen.github.io/docs/openapi-3/schemas-and-components
studentsRouter.get('/:id', (req, res) => {
    client.getStudent({studentId: "1"}, (err, response) => {
                // #swagger.tags = ['Studnet']
            /* #swagger.responses[200] = {
            description: "Some description...",
            content: {
                "application/json": {
                    schema:{
                        $ref: "#/components/schemas/Student"
                    }
                }           
            }
        }   
    */
        if (err != null) {
            console.error(err);
        }
    })
    res.send(response)
})