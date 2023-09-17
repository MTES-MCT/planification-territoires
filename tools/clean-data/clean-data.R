#!/usr/bin/env Rscript

here::i_am("clean-data.R")

library(here)
library(readxl)
library(janitor, warn.conflicts=FALSE)
library(dplyr, warn.conflicts=FALSE)
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
enriched_data <- data |>
  left_join(fixed_corr1, by = join_by(traduction_physique, leviers)) |>
  left_join(corr2, by = join_by(lien_leviers)) |>
  left_join(formulae, by = join_by(traduction_physique))|>
  select(-lien_leviers)

# Corrections des valeurs en pourcentage
fixed_data <- enriched_data |>
  mutate(cle_de_traduction = case_when(
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~1,
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~1,
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~1,
    TRUE ~ cle_de_traduction)) |>
  mutate(objectifs_sgpe_en_unite_physique = case_when(
    traduction_physique=="réduction d'emissions du secteur (annuel) (Industrie)" ~objectifs_sgpe_en_k_tco2,
    traduction_physique=="réduction d'emissions du secteur (annuel) (Captage méthane ISDND)" ~objectifs_sgpe_en_k_tco2,
    traduction_physique=="réduction de consommation d'énergie annuelle (/2010)" ~objectifs_sgpe_en_k_tco2,
    TRUE ~ objectifs_sgpe_en_unite_physique))

# Rename columns
final_data <- fixed_data |>
  rename(id = traduction_physique,
         levier = leviers,
         secteur = secteurs, 
         groupe = correspondance_secteurs,
         ratio = cle_de_traduction,
         obj_co2 = objectifs_sgpe_en_k_tco2,
         obj_phys = objectifs_sgpe_en_unite_physique)

# Export
write_json(final_data, here('../../src/lib/data.json'))
print("done")
