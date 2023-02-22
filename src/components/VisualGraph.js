import { useEffect, useRef } from "react";
import Neovis from "neovis.js/dist/neovis.js";

const VisualGraph = (props) => {
  const {
    containerId,
    backgroundColor,
    neo4jUri,
    neo4jUser,
    neo4jPassword,
    cypher
  } = props;

  const visRef = useRef();

  /*  The hook useEffect is watching variable cypher and 
   *  the visualization is drawn again if cypher is changed. 
   *  Neovis is the tool to draw visualization and needs 
   *  spesific configurations. 
   */

  useEffect(() => {
    const config = {
      //if connecting via localhost, 
      //hide these two rows: encrypted and trust
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

export default VisualGraph;