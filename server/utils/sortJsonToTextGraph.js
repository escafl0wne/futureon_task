const sortJsonToTextGraph = (payload) => {
    const result = {"list":[],"text":"","graph":{"nodes":[],"links":[]}};
    const randColor = () =>  {
      return "#" + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase();
  }

  const colors = {"project":"#87a6ce","subProject":"#f41244","connection":"#5cb337","stagedAsset":"#9c296a"}
  result.graph.nodes.push({"id":payload.id,"props":{"color":colors.project,"group":"project","val":1}})
  
  Object.entries(payload.subProjects).forEach(([sub_id, subProject]) => {

    if (subProject.stagedAssets) {
      result.graph.nodes.push({ "id":sub_id,"props":{"color":colors.subProject,"group":"subProject","val":1}})
      result.graph.links.push({"source":payload.id,"target":sub_id})
      Object.entries(subProject.stagedAssets).forEach(([r, stagedAsset]) => {
        const connectionKey = Object.keys(subProject.connections)[result.list.length];
        const line = `${payload.id} > ${sub_id} > ${r} > ${connectionKey}`;
        result.list.push(line);
        result.text += line+"\n"

        result.graph.nodes.push({ "id":r,"props":{"color":colors.stagedAsset,"group":"stagedAsset","val":1}})
        result.graph.nodes.push({ "id":connectionKey,"props":{"color":colors.connection,"group":"connection","val":1}})
      
        result.graph.links.push({"source":sub_id,"target":r})
        result.graph.links.push({"source":r,"target":connectionKey})
      });
    }
  });


return result;
 
    
};

export default sortJsonToTextGraph;
