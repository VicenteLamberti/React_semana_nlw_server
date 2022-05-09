
import { prisma } from "./prisma";
import nodemailer from "nodemailer";
import express from "express";
import { routes } from "./routes";
import cors from 'cors';

const app = express();
app.use(cors()); //forma de fazer controle de quais front end pode consumir
app.use(express.json());

app.use(routes);



app.listen(3333, ()=>{
    console.log('skoapsk');
});