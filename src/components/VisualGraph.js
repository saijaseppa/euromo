import { useEffect, useRef } from "react";
//import useResizeAware from "react-resize-aware";
//import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";
import { useState } from "react";

/* 
 * VisualGraph is a component that pulls data from database. With neovis.js 
 * the graph is drawn visual.
 */ 

const VisualGraph = (props) => {
  const {
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
  } = props;


  const visRef = useRef();

  useEffect(() => {
    const config = {
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      // Labels ae modifying the visual appearance of the nodes. 
      labels: {
        Persons: {
          caption: "Name",
          group: "community",
        },
        Outlets: {
          caption: "Name",
          group: "community",
        },
        Legal_owners: {
          caption: "Name",
          group: "community",
        },
        Country: {
          caption: "Name",
          group: "community",
        }
      },
      // Relationships are modifying the visual appearance of the relationships of the nodes. 
      relationships: {
        OWNS: {
          caption: true
        },
        FROM: {
          caption: true
        }
      },
      // For now this is the place where the cypher statement is defined. 
      initial_cypher: 
        // myös relationship pitää olla returnissa jotta kaaret näkyy
        "MATCH (x:Country{Name:'Austria'})<-[r:FROM]-(z:Legal_owners)-[o:OWNS]-(w:Legal_owners)-[e:FROM]-> (y:Country{Name:'Germany'}) return x,y,z,w,r,o,e"
        //"MATCH (x:Outlets{Name:'Aamulehti'}) <–[i:OWNS]-(y:Legal_owners) <-[j:OWNS]- (z:Persons{Name:'Jalkanen'}) return x,y,z,i,j",
        //"MATCH (x:Outlets{Name:'Aamulehti'}) <–[i:OWNS]-(y:Legal_owners) return x,y,i",
    };
    const vis = new Neovis(config);
    vis.render();
  }, []);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};


export { VisualGraph };