import express from "express";
import {getCourse, getStudent} from "../dataGen/generator.js";

export const coursesRouter = express.Router();

coursesRouter.get('/:id', (req, res) => {
    // #swagger.tags = ['Courses']
    res.send(getCourse(req.params.id));
}).get('/:id/student', (req, res) => {
    res.send(getStudent(req.params.id));
});