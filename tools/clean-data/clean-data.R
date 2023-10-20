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

data <- read_excel(file_path, "Sheet1") |>
  clean_names()


# Jointures
final_data <- data |>
  rename(
         id = identifiant_stable,
         leverName = leviers,
         sector = secteur,
         group = chantier,
         ratioCO2toPhys = cle_de_traduction,
         objPhys = ordre_de_grandeur_donnee,
         unitPhys = texte_dans_l_interface_unite_physique,
         unitCO2 = texte_dans_l_interface_unite_k_tco2,
         editionDisabled = case_grisee,
         noTranslation = case_sans_traduction,
         comment1 = commentaire_1,
         comment2 = commentaire_2) |>
  mutate(editionDisabled = case_when(editionDisabled=='OUI' ~TRUE, TRUE ~ FALSE),
         noTranslation = case_when(noTranslation=='OUI' ~TRUE, TRUE ~ FALSE)) |>

# # Corrections des valeurs en pourcentage
#   mutate(ratioCO2toPhys = case_when(
#     traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~1,
#     traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~1,
#     traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~1,
#     TRUE ~ ratioCO2toPhys)) |>
#   mutate(objPhys = case_when(
#     traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~objCO2,
#     traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~objCO2,
#     traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~objCO2,
#     TRUE ~ objPhys)) |>

# Corrections des textes
  mutate(unitCO2 = str_replace(unitCO2, "kTCO2 évités", "ktCO₂e évitées")) |>
  mutate(unitPhys = str_replace(unitPhys, "kTCO2 évités", "ktCO₂e évitées")) |>
  mutate(sector = str_replace(sector, "Energie", "Énergie")) |>

# Ajout du chemin pour la création du treemap
  mutate(pathSector = str_c(str_replace_all(sector, '/', '-'), '/', str_replace_all(leverName, '/', '-'))) |>
  mutate(pathGroup = str_c(str_replace_all(group, '/', '-'), '/', str_replace_all(leverName, '/', '-')))

# # Suppression de la colonne name
#   select(-traduction_physique)

# Export
write_json(final_data, here('../../src/lib/assets/data.json'), pretty = TRUE)
print("done")
