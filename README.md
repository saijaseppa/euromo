## EUROMO

Project is pulling data from neo4j. 


## To get the project work

1. First copy this repo. 
2. Then "npm install" at the root of the project. 
3. Create .env file on the root and fill in info of your database. Instructions below.
4. 'Then "npm start". 


## Connection works with AuraDb or Neo4j Desktop

### AuraDB:
Create .env file, where you put following info
of your database:

REACT_APP_NEO4J_URI = writehere  
REACT_APP_NEO4J_USER = writehere  
REACT_APP_NEO4J_PASSWORD = writehere  

### Neo4j Desktop / localhost
When using desktop version, put info below 
to your .env file. Uri is using bolt protocol. 
Also when using localhost, hide also two rows in file VisualGraph.js (marked there).

REACT_APP_NEO4J_URI = writehere  
REACT_APP_NEO4J_USER = writehere  
REACT_APP_NEO4J_PASSWORD = writehere  



