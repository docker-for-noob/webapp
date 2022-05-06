# WebApp

Partie Front du projet Docker for Noods.  
Par Camille ARSAC, Rémi COUFOURIER, Florian LEROY, Guillaume MARCEL, Steven NATIVEL, Cédric PIERRE-AUGUSTE et Arthur POULLIN.

## **Pour travailler en local**
### **Pour build le projet**

Dans le dossier du projet : 
```b
yarn install
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
```
### **Pour arrêter le docker du projet**

Dans le dossier du projet : ```docker-compose down```


## **Pour lancer en production**

Vous pouvez lancer ses commandes en local même si c'est pour la production pour vérifier que tout se passera bien en production justement. Attention pas de reload en version de production !
### **Pour build**

Dans le dossier du projet : 
```
docker-compose -f docker-compose-prod.yaml build
```

### **Pour lancer le docker**

Dans le dossier du projet : 
```
docker-compose -f docker-compose-prod.yaml up -d
```

Puis aller sur l'url : http://localhost:8181/

### **Pour voir les logs**

Dans le dossier du projet : 
```
docker-compose -f docker-compose-prod.yaml logs
```

### **Pour arrêter le docker**

Dans le dossier du projet : 
```
docker-compose -f docker-compose-prod.yaml down
```



## **Pour voir vos dockers qui tourne sur votre machine**

```
docker ps -a
``` 
ou 
```
docker-compose ps
```

