import axios from "axios";
import config from "../../config/config.js";
import getMemoryUsage from "../../utils/memory.js";
import sortJsonToTextGraph from "../../utils/sortJsonToTextGraph.js";

export default class FieldService {
  constructor() {}
  async get_Field(req, res) {
    const {project_id} = req.query
    
    const url = new URL(
      `${config.API_URI}${config.API_STR}${project_id}/`
    );

    try {
      const response = await axios.get(url, {
        headers: {
          token: config.API_TOKEN,
        },
      });
      
      const result = sortJsonToTextGraph(response.data);
      getMemoryUsage();

      // res.send(response.data)
      res.status(200).json({ body: result });
    } catch (error) {
      if(error.response.status ===404)  res.status(error.response.status).json({ error: "Project doesnt exist" });
      else  res.status(error.response.status).json({ error: error });
     
    }
  }
}
