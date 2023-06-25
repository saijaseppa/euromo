# EurOMo- application for visual queries in graph database
This is an application made for master's thesis project. Project is part of the greater EurOMo -project (https://media-ownership.eu/). 

## Technologies
- [Node](https://nodejs.org/en/)
- [React](https://reactjs.org/)
- [Neo4j](https://neo4j.com/)
- [Neovis.js](https://github.com/neo4j-contrib/neovis.js?)

## Running it locally
1. clone this repository. 
2. `cd euromo`
3. add .env file to root of this repository. Check below the content of .env. Choose URI based on which database you use: Neo4j AuraDB or Neo4j Desktop.
4. To install dependencies run `npm install` .

When all dependencies are installed, to start application, run `npm start`.  
Application can be used in http://localhost:3000/. 

## .env file 
Please replace the stars (**) with your own info.  
```PORT=3000  
  
#Uri with AuraDB:  
REACT_APP_NEO4J_URI = neo4j://******.databases.neo4j.io    
#Uri with Neo4j desktop:  
REACT_APP_NEO4J_URI = bolt://localhost:7687    
  
REACT_APP_NEO4J_USER = ***   
REACT_APP_NEO4J_PASSWORD = ***
```

If using localhost via Neo4j Desktop, you have to hide two rows (marked there) in component VisualGraph.
## Example image from application 

![Näyttökuva 2023-05-05 135722](https://user-images.githubusercontent.com/78361679/236645063-c55a4efe-dc9c-4342-b8e2-36d33dc1be0e.png)

## Data flow in application


## File hierarchy 
```
│   .env                        ## add .env file locally  
│   .gitignore  
│   App.js  
│   index.js  
│   NotFound.js  
│   Start.js  
│   app.css  
│   package-lock.json  
│   package.json  
│   README.md  
│  
├───components  
│   │   Button.js  
│   │   Form.js  
│   │   Logo.js  
│   │   RadioButton.js  
│   │   Togglable.js  
│   │   VisualGraph.js  
│   │  
│   ├───Advanced-search  
│   │       AddEdge.js  
│   │       AddNode.js  
│   │       queryMaker.js  
│   │       SearchForm.js  
│   │  
│   └───Basic-search  
│            LegalOwnerForm.js  
│            OutletLegalOwnerForm.js  
│            OutletForm.js  
│            PersonForm.js  
│            PersonOutletForm.js  
│            SubstringForm.js  
│            TwoCountriesForm.js  
│         
│         
├───images  
        euromoicon.png  
        euromologo.png  
```
