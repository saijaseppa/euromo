/* queryMaker has methods to form cypher queries based
 * on the node and edge information the user has given. 
 */

let returns = 'return';
let baseQuery = 'MATCH ';
let n = -1;

const queryNode = (node, propertyName, char, propertyValue) => {

  let nodeLabel = ''; //-> (x:nodeLabel) ja returniin x
  //at this point we assume the property char is =
  let nodeLabelProperty = ''; //-> (x:nodeLabel{property})
  let p_Name = ''; //->  propert
  let propertyNameValue = ''; //-> propertyValue
  let property = ''; // `${p_Name}:'${propertyNameValue}'` 

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

const queryEdge = (edge) => {
  //Forming the variable for edge label.
  let variable = formVariable();
  
  // mimmosia edgejä vois tulla? nuolien suuntaa? eka vois olettaa nuolen oikealle. 
  /*
  neljä erilaista: 
   -[x:edge]->
   <-[x:edge]-
   -[:edge*..6]->
   <-[:edge*..6]-

  */

  //Modifying the return part, adding edge variable to return.
  returns = returns + ` ${variable},`;
}

const getQuery = () => {
  //Deleting the comma if that's the last char at string returns.
  if (returns.charAt(returns.length - 1) === ',') {
    returns = returns.substring(0, returns.length - 1);
  }
  //Connecting query and returns and then returning full query.
  baseQuery = baseQuery + returns;
  const readyQuery = baseQuery;
  returns = 'return';
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

export default { queryNode, queryEdge, getQuery };
