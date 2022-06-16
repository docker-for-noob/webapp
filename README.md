# WebApp

Partie Front du projet Docker for Noods.  
*Par Camille ARSAC, Rémi COUFOURIER, Florian LEROY, Guillaume MARCEL, Steven NATIVEL, Cédric PIERRE-AUGUSTE et Arthur POULLIN.*

Nous travaillons avec une architecture hexagonale en typescript. La partie rendu de templating en React à sa propre documentation spécifique [ici](./src/infrastructure/views/react-ui/README.md).


## **Pour travailler en local**
### **Pour build le projet**

Dans le dossier du projet lancer les commandes suivante : 
```
yarn install-project 
```
>*Script personnalisé correspondant à*  
`yarn install; cd src/infrastructure/views/react-ui; yarn install`
```
docker-compose build
```

### **Pour lancer le docker du projet**

Dans le dossier du projet : 
```
docker-compose up -d
```

Puis aller sur l'url : http://localhost:3999/

### **Pour voir les logs du projet**

Dans le dossier du projet : 
```
docker-compose logs
docker-compose logs -f webapp
```
### **Pour arrêter le docker du projet**

Dans le dossier du projet : 
```
docker-compose down
```


## **Pour voir vos dockers qui tourne sur votre machine**

```
docker ps -a
``` 
ou 
```
docker-compose ps
```

## **Pour lancer les tests du projet**

Actuellement tous les tests sont dans le dossier /src/tests. *Il n'y a pour le moment pas de test sur la partie React.*  
Dans le dossier du projet :

```
yarn test
```

## **Pour lancer le formatteur**

On utilise prettier pour formatter notre code. 
Pour le lancer, aller dans le dossier courant :
```
yarn format
```
> A savoir, si vous ne formattez pas votre code vous même. Lors d'un pull request, la pipeline créera automatiqument un commit mettant au bon format votre code si cela n'a pas été fait en avant. Donc il faudra remettre à jour votre branche. Voir [ici](./GIT.md) pour les commandes git pour vous aider.  

### **Pour lancer le linter**

Dans le dossier du projet :
```
yarn lint-project
```
>*Script personnalisé correspondant à*  
`yarn run lint; cd src/infrastructure/views/react-ui; yarn run lint;`
