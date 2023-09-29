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
  rename(name = leviers,
         sector = secteurs,
         group = correspondance_secteurs,
         ratio = cle_de_traduction,
         objCO2 = objectifs_sgpe_en_k_tco2,
         objPhys = objectifs_sgpe_en_unite_physique) |>

# Corrections des valeurs en pourcentage
  mutate(ratio = case_when(
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~1,
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~1,
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~1,
    TRUE ~ ratio)) |>
  mutate(objPhys = case_when(
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~objCO2,
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~objCO2,
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~objCO2,
    TRUE ~ objPhys)) |>

# Ajout des identifiants 
  mutate(id = case_when(
    traduction_physique=="# voitures thermiques remplacées d'ici 2030" ~ "n_voitures",
    traduction_physique=="km voiture évités (annuel) (Sobriété transport)" ~ "km_sobriete",
    traduction_physique=="km voiture évités (annuel) (Report modal vélo/bus/train)" ~ "km_report",
    traduction_physique=="km covoiturage additionnels (annuel)" ~ "km_covoit",
    traduction_physique=="# bus thermiques remplacés d'ici 2030" ~ "n_bus",
    traduction_physique=="T engrais azotés évités (annuel)" ~ "t_engrais",
    traduction_physique=="réduction têtes bovins" ~ "n_bovins",
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~ "indus",
    traduction_physique=="Gwh de production de chaleur passé en ENR (annuel)" ~ "prod_chaleur",
    traduction_physique=="MW puissance éolien installée" ~ "eolien",
    traduction_physique=="MW puissance PV installée" ~ "pv",
    traduction_physique=="Tkm PL évités (annuel)" ~ "tkm_pl",
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~ "methane",
    traduction_physique=="T valorisées grâce à une plus grande incorporation de MPR (annuel)" ~ "valorisation",
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~ "cons_ener",
    traduction_physique=="m² chauffés au fioul passés à une énergie décarbonnée d'ici 2030" ~ "chauf_fioul",
    traduction_physique=="m² chauffés au gaz passés à une énergie décarbonnée d'ici 2030" ~ "chauf_gaz",
    traduction_physique=="# logement (70m²) m2 rénovés en profondeur" ~ "renov",
    traduction_physique=="# chaudières au fioul passées à une énergie décarbonnée d'ici 2030" ~ "chaud_fioul",
    traduction_physique=="# chaudières au gaz  passées à une énergie décarbonnée d'ici 2030" ~ "chaud_gaz",
    traduction_physique=="ha prairies non artificialisés" ~ "prairies",
    traduction_physique=="ha cultures non artificialisés" ~ "cultures",
    traduction_physique=="kml de haies supplémentaires d'ici 2030 (net)" ~ "haies",
    traduction_physique=="ha de moindre retournement des prairies" ~ "retournement",
    traduction_physique=="ha supplémentaires en couverts intermédiaires" ~ "couvert",
    traduction_physique=="hectares additionnels de forêt en croissance" ~ "foret",
    TRUE ~ ""
  )) |>

# Ajout du label
  mutate(tradPhys = case_when(
    traduction_physique=="# voitures thermiques remplacées d'ici 2030" ~ "Nombre de voitures thermiques remplacées",
    traduction_physique=="km voiture évités (annuel) (Sobriété transport)" ~ "Kilomètres annuels de voiture évités (sobriété)",
    traduction_physique=="km voiture évités (annuel) (Report modal vélo/bus/train)" ~ "Kilomètres annuels de voiture évités (report modal vélo/bus/train)",
    traduction_physique=="km covoiturage additionnels (annuel)" ~ "Kilomètres annuels de covoiturage additionnels",
    traduction_physique=="# bus thermiques remplacés d'ici 2030" ~ "Nombre de bus thermiques remplacés",
    traduction_physique=="T engrais azotés évités (annuel)" ~ "Tonnes annuelles d’engrais azoté évitées",
    traduction_physique=="réduction têtes bovins" ~ "Réduction du nombre de têtes de bovins",
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~ "Réduction d’émissions industrielles annuelles",
    traduction_physique=="Gwh de production de chaleur passé en ENR (annuel)" ~ "GWh annuels de production de chaleur passés en ENR",
    traduction_physique=="MW puissance éolien installée" ~ "Puissance éolienne installée (MW)",
    traduction_physique=="MW puissance PV installée" ~ "Puissance photovoltaïque installée (MW)",
    traduction_physique=="Tkm PL évités (annuel)" ~ "t·km annuelles PL évitées",
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~ "Réduction annuelle d’émissions de captage méthane ISDND",
    traduction_physique=="T valorisées grâce à une plus grande incorporation de MPR (annuel)" ~ "Tonnes annuelles valorisées grâce à une plus grande incorporation de MPR",
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~ "Réduction de consommation d’énergie annuelle par rapport à 2010",
    traduction_physique=="m² chauffés au fioul passés à une énergie décarbonnée d'ici 2030" ~ "m² chauffés au fioul passés à une énergie décarbonée",
    traduction_physique=="m² chauffés au gaz passés à une énergie décarbonnée d'ici 2030" ~ "m² chauffés au gaz passés à une énergie décarbonée",
    traduction_physique=="# logement (70m²) m2 rénovés en profondeur" ~ "Nombre de logements (70m²) rénovés en profondeur",
    traduction_physique=="# chaudières au fioul passées à une énergie décarbonnée d'ici 2030" ~ "Nombre de chaudières au fioul passées à une énergie décarbonée",
    traduction_physique=="# chaudières au gaz  passées à une énergie décarbonnée d'ici 2030" ~ "Nombre de chaudières au gaz passées à une énergie décarbonée",
    traduction_physique=="ha prairies non artificialisés" ~ "Hectares de prairies non artificialisés",
    traduction_physique=="ha cultures non artificialisés" ~ "Hectares de cultures non artificialisés",
    traduction_physique=="kml de haies supplémentaires d'ici 2030 (net)" ~ "Kilomètres linéaires de haies supplémentaires (nets)",
    traduction_physique=="ha de moindre retournement des prairies" ~ "Hectares de moindre retournement des prairies",
    traduction_physique=="ha supplémentaires en couverts intermédiaires" ~ "Hectares supplémentaires en couverts intermédiaires",
    traduction_physique=="hectares additionnels de forêt en croissance" ~ "Hectares additionnels de forêt en croissance",
    TRUE ~ ""
  ))  |>

# Ajout du chemin pour la création du treemap
  mutate(path = str_c(str_replace_all(group, '/', '-'), '/', str_replace_all(id, '/', '-'))) |>
  
# Suppression de la colonne name
  select(-traduction_physique)

# Export
write_json(final_data, here('../../src/lib/assets/data.json'), pretty = TRUE)
print("done")
