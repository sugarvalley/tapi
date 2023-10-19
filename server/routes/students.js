import express from "express";
import {getCourse, getStudent} from "../dataGen/generator.js";

export const studentsRouter = express.Router();

studentsRouter.get('/:id', (req, res) => {
    res.send(getStudent(req.params.id));
}).get('/:id/schedule', (req, res) => {
    res.send(getCourse(req.params.id));
});