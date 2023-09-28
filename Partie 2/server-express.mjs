import express from "express";
import morgan from "morgan";
import createError from "http-errors";
import logger from "loglevel";

const host = "localhost";
const port = 8000;

export const app = express();

logger.setLevel(logger.levels.DEBUG);

app.set("view engine", "ejs");

//Utilisation du middleware morgan quand mode DEV active
if (app.get("env") === "development") {
    app.use(morgan("dev"));
}

app.use(express.static("static"));

app.get(["/", "/index.html", "/home"], async function (request, response) {
    response.sendFile("/static/index.html", { root: "./" });
});

//* VERSION 1
// app.get("/random/:nb", async (request, responce, next) => {
//         const length = request.params.nb;
//         const contents = Array.from({ length })
//             .map((_) =>`<li>${Math.floor(100 * Math.random())}</li>`)
//         .join("\n");
//     return responce.send(`<html><ul>${contents}</ul></html>`);
// });

//* VERSION 2 AVEC MOTEUR DE RENDU EJS
// app.get("/random/:nb", async (request, responce) => {
//     const length = request.params.nb;
//     const contents = Array.from({ length }).map((_) =>
//         Math.floor(100 * Math.random())
//     );
//     return responce.render("random", {
//         welcome: `${length} random numbers:`,
//         numbers: contents,
//     });
// });

//* VERSION 3 AVEC VERIF (NB EST UN NOMBRE) ET MODULE HTTP-ERRORS
app.get("/random/:nb", async (request, responce, next) => {
    const length = Number.parseInt(request.params.nb, 10);
    if (Number.isNaN(length)) {
        return next(createError(400));
    }
    const contents = Array.from({ length }).map((_) =>
        Math.floor(100 * Math.random())
    );
    return responce.render("random", {
        welcome: `${length} random numbers:`,
        numbers: contents,
    });
});

app.use((request, response, next) => {
    logger.debug(`default route handler : ${request.url}`);
    return next(createError(404));
});

app.use((error, _request, response, _next) => {
    logger.debug(`default error handler: ${error}`);
    const status = error.status ?? 500;
    const stack = app.get("env") === "development" ? error.stack : "";
    const result = { code: status, message: error.message, stack };
    return response.render("error", result);
});

const server = app.listen(port, host);

// quand l'event listening actif on lance le callback
server.on("listening", () =>
    logger.info(
        `HTTP listening on http://${server.address().address}:${
            server.address().port
        } with mode '${process.env.NODE_ENV}'`
    )
);

logger.info(`File ${import.meta.url} executed.`);