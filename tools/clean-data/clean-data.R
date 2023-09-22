#!/usr/bin/env Rscript

here::i_am("clean-data.R")

library(here)
library(readxl)
library(janitor, warn.conflicts=FALSE)
library(dplyr, warn.conflicts=FALSE)
library(stringr)
library(jsonlite)

args <- commandArgs(trailingOnly=TRUE)

if (length(args)==0) {
  stop("missing input filename", call.=FALSE)
}


file_path <- args

# Vérification des noms des onglets
# print(excel_sheets(file_path))

# Chargement des onglets, et nettoyage initial

data <- read_excel(file_path, "Table des Données") |> 
  clean_names()
corr1 <- read_excel(file_path, "Table de Correspondance (1)") |> 
  clean_names() 
corr2 <- read_excel(file_path, "Table de Correspondance (2)") |> 
  clean_names()
formulae <- read_excel(file_path, "Formules (traduction physique)") |> 
  clean_names() |> 
  rename(levier = leviers_en_vert_leviers_avec_deux_traductions_physiques) |>
  select(traduction_physique, cle_de_traduction)

# Correction des doublons dans les tables de correspondance
fixed_corr1 <- corr1 |>
  filter(lien_leviers != 'Sobriété tertiaire')

# Jointures
final_data <- data |>
  left_join(fixed_corr1, by = join_by(traduction_physique, leviers)) |>
  left_join(corr2, by = join_by(lien_leviers)) |>
  left_join(formulae, by = join_by(traduction_physique))|>
  select(-lien_leviers) |>
  
# Rename columns
  rename(name = traduction_physique,
         category = leviers,
         sector = secteurs,
         group = correspondance_secteurs,
         ratio = cle_de_traduction,
         objCO2 = objectifs_sgpe_en_k_tco2,
         objPhys = objectifs_sgpe_en_unite_physique) |>

# Corrections des valeurs en pourcentage
  mutate(ratio = case_when(
    name=="réduction d'emissions du secteur (annuel) (Industrie)" ~1,
    name=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~1,
    name=="réduction de consommation d'énergie annuelle (/2010)" ~1,
    TRUE ~ ratio)) |>
  mutate(objPhys = case_when(
    name=="réduction d'emissions du secteur (annuel) (Industrie)" ~objCO2,
    name=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~objCO2,
    name=="réduction de consommation d'énergie annuelle (/2010)" ~objCO2,
    TRUE ~ objPhys)) |>

# Ajout du chemin pour la création du treemap
  mutate(path = str_c(str_replace_all(sector, '/', '-'), '/', str_replace_all(name, '/', '-'))) |>

# Ajout des identifiants 
  mutate(id = case_when(
    name=="# voitures thermiques remplacées d'ici 2030" ~ "n_voitures",
    name=="km voiture évités (annuel) (Sobriété transport)" ~ "km_sobriete",
    name=="km voiture évités (annuel) (Report modal vélo/bus/train)" ~ "km_report",
    name=="km covoiturage additionnels (annuel)" ~ "km_covoit",
    name=="# bus thermiques remplacés d'ici 2030" ~ "n_bus",
    name=="T engrais azotés évités (annuel)" ~ "t_engrais",
    name=="réduction têtes bovins" ~ "n_bovins",
    name=="réduction d'emissions du secteur (annuel) (Industrie)" ~ "indus",
    name=="Gwh de production de chaleur passé en ENR (annuel)" ~ "prod_chaleur",
    name=="MW puissance éolien installée" ~ "eolien",
    name=="MW puissance PV installée" ~ "pv",
    name=="Tkm PL évités (annuel)" ~ "tkm_pl",
    name=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~ "methane",
    name=="T valorisées grâce à une plus grande incorporation de MPR (annuel)" ~ "valorisation",
    name=="réduction de consommation d'énergie annuelle (/2010)" ~ "cons_ener",
    name=="m² chauffés au fioul passés à une énergie décarbonnée d'ici 2030" ~ "chauf_fioul",
    name=="m² chauffés au gaz passés à une énergie décarbonnée d'ici 2030" ~ "chauf_gaz",
    name=="# logement (70m²) m2 rénovés en profondeur" ~ "renov",
    name=="# chaudières au fioul passées à une énergie décarbonnée d'ici 2030" ~ "chaud_fioul",
    name=="# chaudières au gaz  passées à une énergie décarbonnée d'ici 2030" ~ "chaud_gaz",
    name=="ha prairies non artificialisés" ~ "prairies",
    name=="ha cultures non artificialisés" ~ "cultures",
    name=="kml de haies supplémentaires d'ici 2030 (net)" ~ "haies",
    name=="ha de moindre retournement des prairies" ~ "retournement",
    name=="ha supplémentaires en couverts intermédiaires" ~ "couvert",
    name=="hectares additionnels de forêt en croissance" ~ "foret",
    TRUE ~ ""
  )) |>

# Ajout du label
  mutate(label = case_when(
    name=="# voitures thermiques remplacées d'ici 2030" ~ "Nombre de voitures thermiques remplacées",
    name=="km voiture évités (annuel) (Sobriété transport)" ~ "Kilomètres annuels de voiture évités (sobriété)",
    name=="km voiture évités (annuel) (Report modal vélo/bus/train)" ~ "Kilomètres annuels de voiture évités (report modal vélo/bus/train)",
    name=="km covoiturage additionnels (annuel)" ~ "Kilomètre annuels de covoiturage additionnels",
    name=="# bus thermiques remplacés d'ici 2030" ~ "Nombre de bus thermiques remplacées",
    name=="T engrais azotés évités (annuel)" ~ "Tonnes annuelles d’engrais azoté évitées",
    name=="réduction têtes bovins" ~ "Réduction du nombre de têtes de bovins",
    name=="réduction d'emissions du secteur (annuel) (Industrie)" ~ "Réductions d’émissions industrielles annuelles",
    name=="Gwh de production de chaleur passé en ENR (annuel)" ~ "GWh annuels de production de chaleur passés en ENR",
    name=="MW puissance éolien installée" ~ "Puissance éolienne installée (MW)",
    name=="MW puissance PV installée" ~ "Puissance photovoltaïque installée",
    name=="Tkm PL évités (annuel)" ~ "t·km annuelles PL évitées",
    name=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~ "Réduction annuelles d’emissions de captage méthane ISDND",
    name=="T valorisées grâce à une plus grande incorporation de MPR (annuel)" ~ "Tonnes annuelles valorisées grâce à une plus grande incorporation de MPR",
    name=="réduction de consommation d'énergie annuelle (/2010)" ~ "Réduction de consommation d’énergie annuelle par rapport à 2010",
    name=="m² chauffés au fioul passés à une énergie décarbonnée d'ici 2030" ~ "m² chauffés au fioul passés à une énergie décarbonnée",
    name=="m² chauffés au gaz passés à une énergie décarbonnée d'ici 2030" ~ "m² chauffés au gaz passés à une énergie décarbonnée",
    name=="# logement (70m²) m2 rénovés en profondeur" ~ "Nombre de logements (70m²) rénovés en profondeur",
    name=="# chaudières au fioul passées à une énergie décarbonnée d'ici 2030" ~ "Nombre de chaudières au fioul passées à une énergie décarbonnée",
    name=="# chaudières au gaz  passées à une énergie décarbonnée d'ici 2030" ~ "Nombre chaudières au gaz passées à une énergie décarbonnée",
    name=="ha prairies non artificialisés" ~ "Hectares de prairies non artificialisés",
    name=="ha cultures non artificialisés" ~ "Hectares de cultures non artificialisés",
    name=="kml de haies supplémentaires d'ici 2030 (net)" ~ "Kilomètres linéaires de haies supplémentaires (nets)",
    name=="ha de moindre retournement des prairies" ~ "Hectares de moindre retournement des prairies",
    name=="ha supplémentaires en couverts intermédiaires" ~ "Hectares supplémentaires en couverts intermédiaires",
    name=="hectares additionnels de forêt en croissance" ~ "Hectares additionnels de forêt en croissance",
    TRUE ~ ""
  ))  |>

# Suppression de la colonne name
  select(-name)


# Export
write_json(final_data, here('../../src/lib/data.json'), pretty = TRUE)
print("done")
