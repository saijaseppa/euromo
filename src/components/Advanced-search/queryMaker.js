/* queryMaker has methods to form cypher queries based
 * on the node and edge information the user has given. 
 */

let returns = 'RETURN';
let baseQuery = 'MATCH ';
let n = -1;


const queryNode = (node, propertyName, char, propertyValue) => {

  let nodeLabel = ''; //-> (x:nodeLabel)
  //at this point we assume the property char is =
  let nodeLabelProperty = ''; //-> (x:nodeLabel{property})
  let p_Name = ''; //->  propertyName
  let propertyNameValue = ''; //-> propertyValue
  let property = ''; // `${p_Name} ${char} '${propertyNameValue}'` 

  //Forming the variable for node label.
  let variable = formVariable();

  //Making the query based on which props are given.
  if (node === 'any node') {
    nodeLabel = `(${variable}) `;
    baseQuery = baseQuery + nodeLabel;
  }
  //If there's only node given, query is made from that.
  else if (!propertyName) {
    nodeLabelProperty = `(${variable}:${node}) `;
    baseQuery = baseQuery + nodeLabelProperty;
  }
  //If also node property is given, query is made with all info.
  else if (propertyName && char === '=') {
    p_Name = propertyName;
    propertyNameValue = propertyValue;
    property = `${p_Name}: '${propertyNameValue}'`;
    nodeLabelProperty = `(${variable}:${node}{${property}}) `;
    baseQuery = baseQuery + nodeLabelProperty;
  }
  //Modifying the return part, adding query variable to return.
  returns = returns + ` ${variable},`;
}

const queryEdge = (edge, checkedInv, checkedRel) => {
  //Forming the variable for edge label.
  let variable = formVariable() //+'1';
  let variable2 = formVariable()
  let formedEdge = '';

  if (edge === "FROM") {
    if (checkedInv) {
      formedEdge = `<-[${variable}:FROM]-`;
      //Modifying the return part, adding edge variable to return.
      returns = returns + ` ${variable},`;
    }
    else {
      formedEdge = `-[${variable}:FROM]->`;
      //Modifying the return part, adding edge variable to return.
      returns = returns + ` ${variable},`;
    }
  }

  if (edge === "OWNS") {
    if (checkedInv && checkedRel) {
      formedEdge = `<-[${variable}:OWNS*0..]-(x)<-[${variable2}:OWNS*0..]-`;
      //Modifying the return part, adding edge variable to return.
      returns = returns + ` ${variable}, x, ${variable2},`;
    }
    else if (checkedInv) {
      formedEdge = `<-[${variable}:OWNS]-`;
      //Modifying the return part, adding edge variable to return.
      returns = returns + ` ${variable},`;
    }
    else if (checkedRel) {
      formedEdge = `-[${variable}:OWNS*0..]->(x)-[${variable2}:OWNS*0..]->`;
      //Modifying the return part, adding edge variable to return.
      returns = returns + ` ${variable}, x, ${variable2},`;
    }
    else {
      formedEdge = `-[${variable}:OWNS]->`;
      //Modifying the return part, adding edge variable to return.
      returns = returns + ` ${variable},`;
    }
  }
  console.log('formed Edge', formedEdge);

  baseQuery = baseQuery + formedEdge;

}

const deleteFormedQuery = () => {
  returns = 'RETURN';
  baseQuery = 'MATCH ';
  n = -1;
}

const getQuery = () => {
  //Deleting the comma if that's the last char at string returns.
  if (returns.charAt(returns.length - 1) === ',') {
    returns = returns.substring(0, returns.length - 1);
  }
  //Connecting query and returns and then returning full query.
  baseQuery = baseQuery + returns;
  const readyQuery = baseQuery;
  returns = 'RETURN';
  baseQuery = 'MATCH '

  return readyQuery;
}
/*  Method for making variables in lowerCase. These are needed when
 *  forming the cypher clause. Method is making an array of alpabets
 *  and giving the next one when called. 
 */
const formVariable = () => {
  const alphabet = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabetArray = alphabet.map((x) => String.fromCharCode(x).toLowerCase());
  n = n + 1;
  return alphabetArray[n];
}

export default { queryNode, queryEdge, getQuery, deleteFormedQuery };
