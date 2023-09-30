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


# Jointures
final_data <- data |>
  left_join(corr1, by = join_by(traduction_physique, leviers)) |>
  left_join(corr2, by = join_by(lien_leviers)) |>
  left_join(formulae, by = join_by(traduction_physique))|>
  select(-lien_leviers) |>
  
# Rename columns
  rename(id = identifiant_stable,
         name = leviers,
         sector = secteurs,
         group = correspondance_secteurs,
         ratioCO2toPhys = cle_de_traduction,
         objCO2 = objectifs_sgpe_en_k_tco2,
         objPhys = objectifs_sgpe_en_unite_physique,
         unitPhys = texte_dans_l_interface_unite_physique,
         unitCO2 = texte_dans_l_interface_unite_k_tco2) |>

# Corrections des valeurs en pourcentage
  mutate(ratioCO2toPhys = case_when(
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~1,
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~1,
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~1,
    TRUE ~ ratioCO2toPhys)) |>
  mutate(objPhys = case_when(
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~objCO2,
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~objCO2,
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~objCO2,
    TRUE ~ objPhys)) |>

# Corrections des textes
  mutate(unitCO2 = str_replace(unitCO2, "kTCO2 évités", "ktCO₂ évitées")) |>
  mutate(sector = str_replace(sector, "Energie", "Énergie")) |>

# Ajout du chemin pour la création du treemap
  mutate(path = str_c(str_replace_all(sector, '/', '-'), '/', str_replace_all(name, '/', '-'))) |>
  mutate(path2 = str_c(str_replace_all(group, '/', '-'), '/', str_replace_all(name, '/', '-'))) |>
  
# Suppression de la colonne name
  select(-traduction_physique)

# Export
write_json(final_data, here('../../src/lib/assets/data.json'), pretty = TRUE)
print("done")
