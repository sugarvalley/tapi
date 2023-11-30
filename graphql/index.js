import  express from 'express';
import cors from "cors";
import {ApolloServer} from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4';

const typeDefs = `#graphql
    type Student{
        id: Int
        name: String
        surname: String
        email: String
    }
    type Course{
        id: Int
        name: String
        department:String
        teacher: String
        class: String
        date: String
    }
    type Query{
        students: [Student]
        student(id: Int): Student
        course: Course
        courses: [Course]
    }
`;
const resolvers ={
    Query:{
        students: ()=> stundents,
        student: (parent, args)=> stundents.find(s => s.id === args.id),
    }
};

const server = new ApolloServer({typeDefs,resolvers});
await server.start();

const app = express();

app.use(cors({
  origin:'*'
}))
app.use('/graphql', cors(), express.json(), expressMiddleware(server))

app.listen(8989,()=>{
    console.log(`Strated on port: ${8989}!`)
})