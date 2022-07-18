# Git

Notre projet suit [conventional commit](https://www.conventionalcommits.org/en/v1.0.0/).   
>Attention une vérification de la syntaxe des commit sera faite.

Petits rappels des commandes git qui peuvent être utile :
```
git add .

git commit -m "votre message"
git commit --amend
    #pour commiter dans le commit précédent

git pull --rebase 

git push
git push --force-with-lease
    #si vous avez utilisé --amend ou réécrit l'historique

git stash
    #pour sauvegarder vos données
git stash pop
    #pour récupérer vos données mis en stash

git rebase -i HEAD~X
    #pour récrire votre historique de commit
    #X correspond au nombre de commit que vous voulez réécrire

git rebase origin/nom_de_branch
```