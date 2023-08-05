import { Router } from "express";
import limiter from "../../utils/limiter.js";
import  AuthService  from "./auth_service.js";




const auth_controller = Router()

const auth_service = new AuthService()

auth_controller.post("/login",limiter, auth_service.login)

export default auth_controller;