# Node Server Example 
This is a basic HTTP API server. An easy way to get started with Node.js server. 

## Installation & Run
```bash
# Download this project
git clone https://github.com/superstruct-tech/http_server
```
```bash
# Build and Run
cd 
npm install
npm start

# API Endpoint : http://127.0.0.1:3000
```

## API

#### /
* `GET` : Returns "hello"

#### /user-agent
* `GET` : Returns User-Agent String

#### /b64/*
* `GET` : Returns a part of endpoint comming after 'b64/' encoded to base64 format