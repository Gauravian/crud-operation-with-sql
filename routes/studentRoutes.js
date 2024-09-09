import express from 'express';
import { createStudentData, deleteData, getstudentById, getstudents, updateDetails } from '../controllers/studentControllers.js';

let route = express.Router();

route.get("/list",getstudents);

route.get("/list/:id",getstudentById);



route.post('/creates',createStudentData);

route.patch('/update/:id' , updateDetails);

route.delete('/delete/:id',deleteData);
 

export default route;