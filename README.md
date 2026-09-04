# QCM — Vocabulaire technique des formes de pièces

Petite application web (HTML/CSS/JS pur, aucune dépendance) pour s'entraîner
à reconnaître le vocabulaire technique des formes de pièces (STI2D — 2I2D
I.T.E.C.), à partir des dessins isométriques annotés d'une flèche.

Les images utilisées sont extraites **exactement** de la fiche
"Vocabulaire technique à compléter" fournie (mêmes dessins, mêmes flèches).

## Utilisation

1. Ouvrir `index.html` dans un navigateur (ou héberger le dossier sur
   GitHub Pages).
2. Choisir 5 ou 10 questions.
3. Pour chaque dessin, choisir le bon terme parmi 4 propositions.
4. Score final affiché à la fin.

## Déploiement sur GitHub Pages

1. Créer un dépôt et y pousser tout le contenu de ce dossier
   (`index.html`, `style.css`, `script.js`, `data.js`, `images/`).
2. Dans les paramètres du dépôt → *Pages* → source : branche `main`,
   dossier `/root`.
3. L'appli sera accessible à `https://<utilisateur>.github.io/<repo>/`.

## Structure

```
index.html      page principale
style.css       mise en forme
script.js       logique du QCM (sélection aléatoire, score, feedback)
data.js         banque de questions (image → terme correct) + liste
                complète des termes (pour générer les mauvaises réponses)
images/         dessins extraits de la fiche source
```

## Compléter la banque de questions

Le fichier `data.js` contient un tableau `QUESTION_BANK`. Pour ajouter une
question, ajouter une image dans `images/` puis une ligne :

```js
{ img: "images/mon_image.png", answer: "Terme correct" }
```

Le terme doit être orthographié comme dans `ALL_TERMS` (utilisé pour
générer les 3 mauvaises réponses).

## Remarque

36 des ~40 termes de la fiche de vocabulaire sont couverts (les dessins
ambigus ou ne correspondant pas clairement à un terme unique de la fiche —
filetage, moletage, rotule... — ont été volontairement écartés pour éviter
toute question dont la réponse ne serait pas certaine).
