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
        if(password !== config.API_TOKEN) throw Error()
        if(email !== "futureon@test.com") throw Error()
        res.json({"message":"User authorised OK","body":config.API_TOKEN})
    } catch (error) {
        console.log(error)
        res.status(404).json({"message":"Wrong Credentials","body":error})
    }
       

    

}
}
