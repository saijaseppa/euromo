import { useEffect, useRef } from "react";
//import useResizeAware from "react-resize-aware";
//import PropTypes from "prop-types";
import Neovis from "neovis.js/dist/neovis.js";

const VisualGraph = (props) => {
  const {
    width,
    height,
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
    cypher,
    notification
  } = props;

  const visRef = useRef();

  useEffect(() => {
    const config = {
      //if connecting via localhost, hide these two rows:
      // encrypted and trust
      encrypted:"ENCRYPTION_ON", 
      trust: "TRUST_SYSTEM_CA_SIGNED_CERTIFICATES", 
      container_id: visRef.current.id,
      server_url: neo4jUri,
      server_user: neo4jUser,
      server_password: neo4jPassword,
      labels: {
        Persons: {
          caption: "Name",
          group: "community"
        },
        Outlets: {
          caption: "Name",
          group: "community"
        },
        Legal_owners: {
          caption: "Name",
          group: "community"
        },
        Country: {
          caption: "Name",
          group: "community"
        }
      },
      relationships: {
        OWNS: {
          thickness: "amount_of_shares",
          caption: true,
          
        },
        FROM: {
          thickness: "weight",
          caption: true
        }
      },
      arrows: true,
      initial_cypher: cypher
    };
    const vis = new Neovis(config);

    //sending info of success of vis rendering
    notification(vis);
    vis.render();
    
  }, [cypher]);

  return (
    <div
      id={containerId}
      ref={visRef}
      style={{
        width: "90%",
        backgroundColor: `${backgroundColor}`,
      }}
    />
  );
};

/*

width: `${width}px`,
        height: `${height}px`,
        VisualGraph.defaultProps = {
  width: 600,
  height: 600,
  backgroundColor: "#d3d3d3",
};*/
/*
const ResponsiveNeoGraph = (props) => {
  const [resizeListener, sizes] = useResizeAware();

  const side = Math.max(sizes.width, sizes.height) / 2;
  const neoGraphProps = { ...props, width: side, height: side };
  return (
    <div style={{ position: "relative" }}>
      {resizeListener}
      <VisualGraph {...neoGraphProps} />
    </div>
  );
};

ResponsiveNeoGraph.defaultProps = {
  backgroundColor: "#d3d3d3",
};*/


export { VisualGraph };