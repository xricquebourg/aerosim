# Server for AeroSim
## usage v0.2 without Docker
- init server/.env file with: 
    - HTTP_PORT
    - UDP_PORT
    - UDP_HOST

On PowerShell:
- cd .\server\; npm i; npm start <br/>

On Shell:
- cd .\server\ && npm i && npm start

It run server

### Want build server ?
Use 'npm run build'
The builded part will be in 'build' directory

### For development usage
Use 'npm run dev' (nodemon)