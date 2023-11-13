#!/usr/bin/env Rscript

here::i_am("clean-data.R")

library(here)
library(readxl)
library(janitor, warn.conflicts=FALSE)
library(dplyr, warn.conflicts=FALSE)
library(stringr)
library(jsonlite)

args <- commandArgs(trailingOnly=TRUE)

# if (length(args)==0) {
#   stop("missing input filename", call.=FALSE)
# }


file_path <- args
# file_path <- "../../../../data.xlsx"

# Vérification des noms des onglets
# print(excel_sheets(file_path))

# Chargement des onglets, et nettoyage initial

data <- read_excel(file_path, "OUTPUT", na="N/A") |>
  clean_names()


# Jointures
final_data <- data |>
  rename(
         id = identifiant_stable,
         leverName = leviers,
         sector = secteur,
         group = chantier,
         ratioCO2toPhys = cle_de_traduction,
         objCO2 = objectifs_sgpe_en_k_tco2,
         unitPhys = texte_dans_l_interface_unite_physique,
         unitCO2 = texte_dans_l_interface_unite_k_tco2,
         startPoint2019 =point_de_depart_2019,
         editionDisabled = case_grisee,
         disabledComment = explication_pour_les_cases_grisees,
         noTranslation = case_sans_traduction,
         comment = commentaire,
         regionName = region,
         regionEnabled = region_accessible,
         regionComment = commentaire_region_accessible,
         regionLocked = region_verrouillee,
         regionLockedComment = commentaire_region_verrouillee,
         showTarget = masquer_lobjectif
         ) |>
  mutate(editionDisabled = case_when(editionDisabled=='OUI' ~TRUE, TRUE ~ FALSE),
         noTranslation = case_when(noTranslation=='OUI' ~TRUE, TRUE ~ FALSE),
         regionEnabled = case_when(regionEnabled=='OUI' ~TRUE, TRUE ~ FALSE),
         regionLocked = case_when(regionLocked=='OUI' ~TRUE, TRUE ~ FALSE),
         showTarget = case_when(showTarget=='OUI' ~FALSE, TRUE ~ TRUE),
         relative = case_when(startPoint2019!=0 ~TRUE, TRUE ~ FALSE)
         ) |>


# Correction des sauts de ligne
  mutate(comment = str_replace_all(comment, "\r\n", "\n"),
         unitPhys = str_replace_all(unitPhys, "\r\n", "\n"),
         unitCO2 = str_replace_all(unitCO2, "\r\n", "\n"),
         ) |>
# Corrections des textes
  mutate(unitCO2 = str_replace(unitCO2, "kTCO2 évités", "ktCO₂e évitées")) |>
  mutate(unitPhys = str_replace(unitPhys, "kTCO2 évités", "ktCO₂e évitées")) |>
  mutate(sector = str_replace(sector, "Energie", "Énergie")) |>

# Ajout du chemin pour la création du treemap
  mutate(pathSector = str_c(str_replace_all(sector, '/', '-'), '/', str_replace_all(leverName, '/', '-'))) |>
  mutate(pathGroup = str_c(str_replace_all(group, '/', '-'), '/', str_replace_all(leverName, '/', '-')))


# Export
write_json(final_data, here('../../src/lib/assets/data.json'), pretty = TRUE)
print("done")
