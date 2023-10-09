.PHONY: all
all: locustfile.py

.PHONE: run
run: all
	locust

input.har:
	@echo "Générez un fichier har à partir de la console de développement Chrome, et sauvegardez le comme 'input.har'"
	@exit 1

locustfile.py: input.har
	har2locust input.har --resource-types=xhr,script,stylesheet,image,font,document,other > locustfile.py

.PHONY: clean
clean:
	rm locustfile.py
