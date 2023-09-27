import http from "node:http";
import fs from "node:fs/promises";
import { error } from "node:console";
import { readFile } from "node:fs/promises";

const host = "localhost";
const port = 8000;



//* VERSION 1
function requestListener1(_request, response) {
    response.writeHead(200);
    response.end("<html><h1>My first server!<h1></html>");
}

//* VERSION 2
function requestListener2(_request, response) {
    response.setHeader("Content-Type", "application/json");
    response.end(JSON.stringify({ message: "I'm OK" }));
}

//* VERSION 3 + gestion erreur 500
function requestListener3(_request, response) {
    fs.readFile("index.html", "utf8")
        .then((contents) => {
            response.setHeader("Content-Type", "text/html");
            response.writeHead(200);
            return response.end(contents);
        })
        .catch((error) => {
            response.writeHead(500);
            response.end(`${error}`);
            console.error(error);
        });
}

// * VERSION ASYNC AWAIT + gestion erreur 500
async function requestListener4(_request, responce) {
    try {
        const file = await readFile("index.html", "utf8");
        responce.setHeader("Content-Type", "text/html");
        responce.writeHead(200);
        responce.end(`${file}`);
    } catch (error) {
        responce.writeHead(500);
        responce.end(`${error}`);
        console.error(error);
    }
}

//* VERSION AVEC ROUTES
let nb = 1;
async function requestListener5(request, response) {
    response.setHeader("Content-Type", "text/html");
    let array = [];
    try {
        const contents = await readFile("index.html", "utf8");
        switch (request.url.split("/")[1]) {
            case "": {
                response.writeHead(200);
                return response.end(contents);
            }
            case "index.html": {
                response.writeHead(200);
                return response.end(contents);
            }
            case "random": {
                response.writeHead(200);
                nb = request.url.split("/")[2];
                return response.end(`NB = ${nb}`);
            }
            case "random.html": {
                response.writeHead(200);
                for (let index = 0; index < nb; index++) {
                    array.push(Math.floor(100 * Math.random()));
                }
                array=array.map((n) =>`<li>${n}</li>`).join("\n");
                return response.end(`<html>${array}</html>`);
            }
            default: {
                response.writeHead(404);
                return response.end(`<html><p>404: NOT FOUND</p></html>`);
            }
        }
    } catch (error) {
        console.error(error);
        response.writeHead(500);
        return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
    }
}

console.log("NODE_ENV =", process.env.NODE_ENV);

const server = http.createServer(requestListener5);

server.listen(port, host, () => {
    console.log(`Server is running on https//${host}:${port}`);
});
