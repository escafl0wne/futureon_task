import axios from "axios"
import config from "../../config/config.js"
import getMemoryUsage from "../../utils/memory.js"
import sortJsonToTextGraph from "../../utils/sortJsonToTextGraph.js"



export default class AuthService{
    constructor(){ }
    login(req,res){
        console.log(config.API_TOKEN)
    try {
        const {password,email} = req.body
        console.log(req.body)
        if(password !== config.API_TOKEN) throw Error("Password is incorect")
        if(email !== "futureon@test.com") throw Error("Email is wrong")
        res.json({"message":"User authorised OK","body":config.API_TOKEN})
    } catch (error) {
        console.log(error)
        res.send(error)
    }
       

    

}
}
