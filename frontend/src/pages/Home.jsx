import React, { useState, useEffect } from "react";
import "./Home.css";
import axios from "axios";
import ForceGraph3D from "react-force-graph-3d";

const Home = () => {
  const [content1, setContent1] = useState("");
  const [nodeIsHovered, setNodeIsHovered] = useState(null);
  const [error, setError] = useState(null);
  const [projectID, setProjectID] = useState("");
  const handleFetchData = async (e) => {
    if(projectID === "" ) {
      setError("Please choose a project ID")
      return
    }

    setContent1("");
    setError(null);
    try {
      const response = await axios.get("http://localhost:5012/api/v1/field?project_id="+projectID, {
        headers: { "auth-token": localStorage.getItem("auth") },
      });
      
      
     
      setContent1(response.data.body);
    } catch (error) {
      console.log(error)
      setError(error.response.data.error);
    }
  };
  const handleSelectProject=(e)=>{
  
    if(error) setError(null)
    setProjectID(e.target.value)
  
  }
  useEffect(() => {
    if (content1 !== "" && nodeIsHovered) {
      content1.graph.nodes.find((w) => w.id === nodeIsHovered).props.val = 10;
      setContent1(content1);
    }
  }, [nodeIsHovered]);

  return (
    <div className="homePageContainer">
      <br />
      <br />
      <select name="Please choose Project ID" defaultValue="orange"  onChange={(e)=>{handleSelectProject(e)}}>
        <option value="">Please choose Project ID</option>
        <option value="-MA1551S-odms4rVbJ8A">-MA1551S-odms4rVbJ8A</option>
        <option value="-MA1551S-odms4rVbJ8B">-MA1551S-odms4rVbJ8B</option>
    </select>
      {error ? <p> {error}</p> : null}
      {content1 !== "" ? (
        <div>
          <br />
          <br />
          <ul>
            {content1.list.map((li, idx) => {
              const ids = li.split(" > ");
              return (
                <li key={"ul_" + idx}>
                  {ids.map((f, idx, arr) => (
                    <span
                      key={idx}
                      id={f}
                      onMouseEnter={(e) => {
                        e.target.style["font-weight"] = "bold";
                        setNodeIsHovered(f);
                      }}
                      onMouseLeave={(e) => {
                        e.target.style["font-weight"] = "normal";
                        content1.graph.nodes.forEach(
                          (node) => (node.props.val = 1)
                        );
                        setNodeIsHovered(null);
                        setContent1(content1);
                      }}
                      style={{
                        color: content1.graph.nodes.find((r) => r.id === f)
                          .props.color,
                        cursor: "pointer",
                      }}
                    >
                      {" "}
                      {idx < arr.length - 1 ? f + " > " : f}{" "}
                    </span>
                  ))}
                </li>
              );
            })}
          </ul>
          <ForceGraph3D
            nodeColor={(node) => node.props.color}
            width={700}
            height={400}
            graphData={content1.graph}
            nodeOpacity={1}
            linkCurvature={0.05}
            linkDirectionalParticles={2}
            nodeVal={(node) => {
              return node.props.val;
            }}
            
            onNode
            linkDirectionalParticleWidth={2}
            linkDirectionalArrowLength={0.5}
            linkDirectionalParticleSpeed={0.001}
            linkLabel={(link) => link.id}
            dagMode={"lr"}
            dagLevelDistance={50}
            nodeLabel={(node) => `${node.props.group} :: ${node.id}`}
            backgroundColor="#101020"
            linkOpacity={0.3}
          />{" "}
        </div>
      ) : null}
      <br />
      <button  className="button" onClick={handleFetchData}>
        FutureOn
      </button>
    </div>
  );
};

export default Home;
