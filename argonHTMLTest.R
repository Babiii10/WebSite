
library(argonR)
index  = argonPage(
  title = "ArgonR Static Template",
  author =  "Somebody",
  description = "HTML Static Template",
  navbar = argonNavbar(id = "navbar"),
  footer = argonFooter(),
  # main content
  tags$style(HTML("
      .custom-margin {
        margin: 20px; /* Modifier cette valeur selon vos besoins */
      }
    ")),
  argonSection(class = "custom-margin",
               size = "lg",
               status = "warning",
               background_color = "white", # Définir la couleur de fond en blanc
               gradient = FALSE, # Désactiver le gradient
               separator = TRUE,
               separator_color = "white",
               shape = TRUE,
               argonColumn(
                 argonRow(
                   argonColumn(
                     width = 6,
                     argonH1(
                       display = 3, 
                       "ArgonR, HTML static template for R", 
                       htmltools::span("completed with examples")
                     ) %>% argonTextColor(color = "black"), # Modifier la couleur du texte en noir
                     argonLead(
                       "Argon is a great free UI package based on Bootstrap 
          4 that includes the most important components and features"
                     ) %>% argonTextColor(color = "black") # Modifier la couleur du texte en noir
                   ),
                   argonColumn(
                     width = 6,
                     argonImage(
                       src = "https://10web-site.ai/85/wp-content/uploads/sites/97/2024/04/black-man-tablet-and-smile-in-portrait-at-startup-68M4QPV_jchlkIoJ.webp",
                       floating = TRUE
                     ) %>% argonPersp(side = "right")
                     %>% argonBlur()
                   )
                 )
               )
               
  ),
  argonSection(class = "custom-margin"),
  argonSection(class = "custom-margin"),
  argonSection(class = "custom-margin"),
  argonSection(class = "custom-margin")
)

# create the path
path <- getwd()

# generate the static page
argonPageTemplate(filename = "test", path = path, argonPage = index)

