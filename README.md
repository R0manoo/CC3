# Tutoriel HTTP/Express Node.js

## Partie 1 : serveur HTTP natif Node.js

### Installation
**Question 1.1** donner la liste des en-têtes de la réponse HTTP du serveur.

### Servir différents types de contenus

**Question 1.2** donner la liste des en-têtes qui ont changé depuis la version précédente.
**Question 1.3** que contient la réponse reçue par le client ?

**Question 1.4** quelle est l'erreur affichée dans la console ? Retrouver sur <https://nodejs.org/api> le code d'erreur affiché.
**Question 1.5** donner le code de `requestListener()` modifié _avec gestion d'erreur_ en `async/await`.
**Question 1.6** indiquer ce que cette commande a modifié dans votre projet.
**Question 1.7** quelles sont les différences entre les scripts `http-dev` et `http-prod` ?
Tester les **routes** suivantes :

- `http://localhost:8000/index.html`
- `http://localhost:8000/random.html`
- `http://localhost:8000/`
- ![beurre](https://github.com/R0manoo/CC3/assets/109523009/feb63cb0-6c6e-43ee-adfe-3de696dd4a26)

- `http://localhost:8000/dont-exist`

**Question 1.8** donner les codes HTTP reçus par votre navigateur pour chacune des quatre pages précédentes.


Maintenant, on veut ajouter une route `/random/:nb` où `:nb` est un paramètre entier avec le nombre d'entiers à générer. Ajouter cette route au `switch` et reprendre la page `random.html` pour générer autant de nombres qu'indiqué dans l'URL.

Pour cela, utiliser `request.url.split("/");` qui va décomposer le chemin demandé et faire le `switch` sur le premier niveau de l'arborescence. Faites en sorte que le `switch` traite `/index.html` et `/` de la même façon.
