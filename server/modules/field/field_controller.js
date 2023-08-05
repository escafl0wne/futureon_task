import { Router } from "express";
import limiter from "../../utils/limiter.js";
import  FieldService  from "./field_service.js";
import cache from "../../utils/cache.js";
import Authmiddleware from "../../middleware/auth.js";



const field_controller = Router()

const field_service = new FieldService()

field_controller.get("/",limiter,cache(1),Authmiddleware, field_service.get_Field)

export default field_controller;