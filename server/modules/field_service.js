import axios from "axios"
import config from "../config/config.js"
import getMemoryUsage from "../utils/memory.js"
import sortJsonToTextGraph from "../utils/sortJsonToTextGraph.js"



export default class FieldService{
    constructor(){ }
   async get_Field(req,res){
    const url = new URL(`${config.API_URI}${config.API_STR}${config.PROJECT_ID}/`)
   
    try {
        // const response = await axios.get(url,{
        //     headers:{
        //      token:config.API_TOKEN
        //     }
        // })
        const y = sortJsonToTextGraph()
        getMemoryUsage()
        console.log(y)
        
        // res.send(response.data)
        res.send("OK")
    } catch (error) {
        console.log(error)
        res.send(error)
    }
       

    

}
}
