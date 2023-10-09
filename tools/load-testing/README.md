# Effectuer des tests de montée en charge avec Locust

- installer [Locust](https://locust.io/) et [har2locust](https://github.com/SvenskaSpel/har2locust), idealement dans un virtualenv

  `pip install -r requirements.txt`

- générer un fichier [har](https://developer.chrome.com/docs/devtools/network/reference/#save-as-har) dans Chrome (le format exporté par Firefox pose problème), et le sauvegarder sous le nom `input.har`

- générer le fichier Locust

  `make`

- éventuellement, éditer le fichier locustfile.py généré
- lancer l'interface web de Locust

  `make run`
