## Partie 2 : framework Express
### Création du serveur

Créer le fichier `server-express.mjs` et exécuter la commande suivante :

```bash
npm install --save express http-errors loglevel morgan
```
**Question 2.1** donner les URL des documentations de chacun des modules installés par la commande précédente.
|Module|URL|
|--|--|
|Express|https://expressjs.com/en/5x/api.html|
|Morgan|https://expressjs.com/en/resources/middleware/morgan.html|
|loglevel|https://www.npmjs.com/package/loglevel|
|http-errors|https://www.npmjs.com/package/http-errors|

**Question 2.2** vérifier que les trois routes fonctionnent.

Tout est ok:

|route|rendu|
|--|--|
|/|<img width="340" alt="route_base" src="https://github.com/R0manoo/CC3/assets/109523009/0a01d960-c96e-49d8-9f97-1133694bb2af">|
|/index.html|<img width="340" alt="route_index" src="https://github.com/R0manoo/CC3/assets/109523009/49e0151e-e416-4a1c-a4d1-b2bb54c8dde7">|
|/random:nb|<img width="340" alt="route_random" src="https://github.com/R0manoo/CC3/assets/109523009/3075ddc2-27b9-4b9c-8a36-bbd2d0b39f19">|


**Question 2.3** lister les en-têtes des réponses fournies par Express. Lesquelles sont nouvelles par rapport au serveur HTTP ?

**LISTE DES NOUVELLES EN-TETES:**
```
X-Powered-By: Express 
Accept-Ranges: bytes 
Cache-Control: public, max-age=0 
Last-Modified: Wed, 20 Sep 2023 06:59:14 GMT 
ETag: W/"557-18ab162c48c" 
Content-Type: text/html; charset=UTF-8 
Content-Length: 1367 
```

**Question 2.4** quand l'événement `listening` est-il déclenché ?

L’événement `listening` est déclenché dès que le serveur a réussi sa connexion au port et à l’adresse ip. 

### Ajout de middlewares

**Question 2.5** indiquer quelle est l'option (activée par défaut) qui redirige `/` vers `/index.html` ?

Lorsque l’on utilise : `app.use(express.static("static"));` la route `/` est par défaut configuré sur un fichier qui se nomme `index.html`.

On peut changer ce comportement de la sorte:  
```js
app.use(express.static("static",{index:"autreFichier"}))
```

**Question 2.6** visiter la page d'accueil puis rafraichir (Ctrl+R) et _ensuite_ **forcer** le rafraichissement (Ctrl+Shift+R). Quels sont les codes HTTP sur le fichier `style.css` ? Justifier.

|Methode de rafraichissement|Code HTTP|
|--|--|
|Classique|`304 Not Modified`|
|Forcé|`200 OK`|

Le code http `304` indique que lors d'un rafraichissement classique le navigateur utilise le contenu du cache (si possible) pour charger la page.  
Cependant lors d'un rafrachissement forcé celui-ci efface le contenu du cache de cette page et ainsi le force à charger la version la plus recente de la page expliquant le code http `200`.

### Rendu avec EJS
On va utiliser le moteur EJS pour améliorer la page `random` générée dynamiquement côté serveur.

**Question 2.7** vérifier que l'affichage change bien entre le mode _production_ et le mode _development_.

On teste l'affichage d'une erreur avec `localhost/8000/toto` qui n'existe pas :

|Production|Development|
|--|--|
|<img width="480" alt="mode_prod" src="https://github.com/R0manoo/CC3/assets/109523009/e705bc8d-4c92-4b36-a3fc-c2d80397b507">|<img width="480" alt="mode_dev" src="https://github.com/R0manoo/CC3/assets/109523009/95ca6442-7d8b-4858-8e7b-2e0b0a0df4c5">|

L'affichage est donc correctement configuré en fonction du mode utilisé.


