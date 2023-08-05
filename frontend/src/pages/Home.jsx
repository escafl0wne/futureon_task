import React, { useState,useEffect } from 'react';
import './Home.css';
import axios from "axios"
import ForceGraph3D  from 'react-force-graph-3d'


const Home = () => {
  const [content1, setContent1] = useState('');
  const [nodeIsHovered, setNodeIsHovered]=useState(null)
  const [error, setError] = useState(null)
  const handleFetchData = async (e) => {
    setContent1("")
    setError(null)
    try {
      const response = await axios.get("http://localhost:5012/api/v1/field",{headers:{"auth-token":localStorage.getItem("auth")}})
      console.log(response)
      if (response.data.error) throw Error()
      
        setContent1(response.data.body)
        
      
    } catch (error) {
        setError("something went wrong with the request, please try again")
    }
    
  };
  useEffect(() => {
    if(content1 !== ""){
      content1.graph.nodes.find(w => w.id=== nodeIsHovered).props.val = 10
    setContent1(content1)
  
    }
    
    
  }, [nodeIsHovered])
  

  return (
    <div className="homePageContainer">

<br/>
        <br/>
        {error ? <p> {error}</p> : null}
      {content1 !== "" ?
       <div>
        <br/>
        <br/>
       <ul>
       
       {content1.list.map((li,idx)=> {
        const ids = li.split(" > ")
        return <li>{ids.map((f,idx,arr) => <span key={idx} onMouseEnter={(e)=>{
         setNodeIsHovered(f) 
        }} 
        onMouseLeave={()=>{
          content1.graph.nodes.forEach(node => node.props.val = 1)
          setContent1(content1)
        }}
        style={{"color":content1.graph.nodes.find(r => r.id === f).props.color,"cursor":"pointer"}}> {idx < arr.length-1 ? f + " > " : f } </span>) }</li>
      }
        )}
        </ul>
      
       <ForceGraph3D nodeColor={(node)=> node.props.color}width={700} height={400}graphData={content1.graph} nodeOpacity={1} linkCurvature={0.05}  linkDirectionalParticles={2} nodeVal={(node)=>{
        
        return node.props.val 
       }}
        linkDirectionalParticleWidth={2} linkDirectionalArrowLength={0.5} linkDirectionalParticleSpeed={0.001}linkLabel={(link)=> link.id} dagMode={'lr'} dagLevelDistance={50} nodeLabel={(node)=> `${node.props.group} :: ${node.id}`} backgroundColor="#101020" linkOpacity={0.3}/> </div>: null}
      <br/>
      <button className="button" onClick={handleFetchData}>
        FutureOn
      </button>
    </div>
  );
};

export default Home;
