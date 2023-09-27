## Partie 1 : serveur HTTP natif Node.js

### Installation
**Question 1.1** donner la liste des en-têtes de la réponse HTTP du serveur.

```
    HTTP/1.1 200 OK 
    Date: Thu, 21 Sep 2023 21:32:12 GMT 
    Connection: keep-alive 
    Keep-Alive: timeout=5 
    Transfer-Encoding: chunked 
```

### Servir différents types de contenus

**Question 1.2** donner la liste des en-têtes qui ont changé depuis la version précédente.

Seulement le Content-Type: `Content-Type: application/json` 

**Question 1.3** que contient la réponse reçue par le client ?

D’après la fonction `requestListener`, la réponse devrait être une 200 et devrait contenir le contenu du fichier `index.html`. 

Cependant à l’exécution le client ne reçoit pas de réponse et la console affiche une erreur. 

**Question 1.4** quelle est l'erreur affichée dans la console ? Retrouver sur <https://nodejs.org/api> le code d'erreur affiché.

![err](https://github.com/R0manoo/CC3/assets/109523009/b059c122-3b4e-4854-8408-04867498a9ff)

Le code erreur `ENOENT` a été soulevé par la fonction `fs` d’un module node importé car il n’a pas trouvé le fichier index.html. 

Modifications apportées au Promise.catch: 
```js
.catch((error) => {
  response.writeHead(500);
  response.end(`${error}`);
  console.error(error);
});
```
**Question 1.5** donner le code de `requestListener()` modifié _avec gestion d'erreur_ en `async/await`.

```js
async function requestListener(_request, responce) {
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
```

### Mode développement

Dans le dossier `devweb-tp5` exécuter les commandes suivantes :

- `npm install cross-env --save`
- `npm install nodemon --save-dev`

**Question 1.6** indiquer ce que cette commande a modifié dans votre projet.

Un nouveau fichier `package-lock.json` a été créé dans le dossier. 

**Question 1.7** quelles sont les différences entre les scripts `http-dev` et `http-prod` ?

Le script http-prod ne répond pas aux modifications lorsque l’on modifie les fichiers dans le dossier à l’inverse du script http-dev qui relance le server lorsque l’on effectue une nouvelle sauvegarde d'un des fichier. 

**Question 1.8** donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.

| Routes | Codes HTTP reçus |
| --- | --- |
|`http://localhost:8000/index.html`| 200 |
|`http://localhost:8000/random.html`| 200 |
|`http://localhost:8000/`|200|
|`http://localhost:8000/dont-exist`|404|

Maintenant, on veut ajouter une route `/random/:nb` où `:nb` est un paramètre entier avec le nombre d'entiers à générer. Ajouter cette route au `switch` et reprendre la page `random.html` pour générer autant de nombres qu'indiqué dans l'URL.

```js
let nb = 1;
async function requestListener(request, response) {
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
```
