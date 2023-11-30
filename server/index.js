import express from "express";
import { createServer } from "node:http";
import * as protoLoader from "@grpc/proto-loader";
import * as grpc from "@grpc/grpc-js";
import cors from "cors";
import swaggerUi from 'swagger-ui-express';
import swaggerAutogen from 'swagger-autogen';
// import {io} from "./websocket/socket.js";
import {studentsRouter} from "./routes/students.js"
import {coursesRouter} from "./routes/courses.js"


export const app = express();
export const rest = createServer(app);

const doc = {
    info: {
      version: '1.0.0',
      title: 'TAPIII',
      description: 'TAPITAPITAPI'
     },
     components: {
        schemas: {
        Student:{
            value:{
                id: 1,
                name: 'John',
                surname: 'Doe',
                email: 'john.doe@gmail.com'
            }
        }
      }
  }
  };
  
  const route = ['./server/index.js'];
  const outputFile = './swagger.json';
  const def = await swaggerAutogen({openapi: '3.0.0'})(outputFile, route, doc);

app.use(cors({
    origin: '*'
}));

app.use('/students', studentsRouter);
app.use('/courses', coursesRouter);

if(def){
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(def.data));
  }

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

app.get('hello/:id',(req, res) => {
    // #swagger.tags = ['Hello']
    faker.internet.email()
    const id = req.params.id;
    res.send(faker.internet.email())
  })

rest.listen(3000, () => {
    // io.listen(rest, {
    //     cors: {
    //         origin: 'http://localhost:5173',
    //     }
    // })
})