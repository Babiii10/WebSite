library(argonR)
library(shiny)
library(vembedr)
library(fontawesome)

services = argonPage(
  title = "ArgonR Static Template",
  author =  "Somebody",
  description = "HTML Static Template",
  # tags$style(HTML("
  #     .custom-margin {
  #       margin: 5px; /* Modifier cette valeur selon vos besoins */
  #     }
  #   ")),
  
  # tags$head(
  #   tags$style(HTML("
  #     .main-navbar {
  #       background-color: #123456;  # Remplacez par la couleur de votre choix
  #     }
  #   "))
  # ),
  navbar = argonNavbar(
    id = "main-navbar",
    src = "https://demos.creative-tim.com/argon-design-system/assets/img/brand/white.png",
    # left menu
    argonNavMenu(
      argonDropdown(
        name = "Components",
        size = "lg",
        argonDropdownItem(
          name = "Getting Started",
          description = "BlaBlaBlaB",
          src = "test.html",
          icon = argonIcon("spaceship"),
          status = "danger"
        ),
        argonDropdownItem(
          name = "Foundation",
          description = "BlaBla",
          src = "",
          icon = argonIcon(name = "palette"),
          status = "warning"
        ),
        argonDropdownItem(
          name = "Components",
          description = "Blabla",
          src = "",
          icon = argonIcon(name = "ui-04"),
          status = "success"
        )
      )
    ),
    # right menu
    argonNavMenu(
      side = "right",
      argonNavItem(
        name = "Services",
        src = "services.html",
        icon = "Services",
        tooltip = "Our services"
      ),
      argonNavItem(
        name = "Pricing",
        src = "pricing.html",
        icon = "Pricing",
        tooltip = "Our pricing"
      ),
      argonNavItem(
        name = "About Us",
        src = "about-Us.html",
        icon = "About Us",
        tooltip = "About Us"
      ),
      argonNavItem(
        name = "Contact Us",
        src = "Contact-Us.html",
        icon = "Contact Us",
        tooltip = "Contact Us"
      )
    )
  ),
  footer = argonFooter(
    has_card = FALSE,
    argonContainer(
      size = "lg",
      argonRow(
        argonColumn(
          width = 3,
          # argonIconWrapper(
          #   iconTag = argonIcon("atom"),
          #   size = "lg",
          #   status = "success",
          #   shadow = TRUE,
          #   hover_shadow = TRUE
          # ),
          argonH1(
            display = 4,
            "Data N'Go"
          ),
          argonLead(
            "Our Team"
          ),
          argonLead(
            "Our Process"
          ),
          argonLead(
            "Pricing"
          )
        ),
        argonColumn(
          width = 4,
          argonCarousel(
            width = 12,
            id = "carousel2",
            argonCarouselItem(
              src = "Pellicule/logo2.png",
              active = TRUE
            ),
            argonCarouselItem(
              src = "Pellicule/logo7.png",
              active = FALSE
            ),
            argonCarouselItem(
              src = "Pellicule/logo1.png",
              active = FALSE
            )
          )
        ),
        argonColumn(
          width = 5,
          argonH1(
            "Operational work hours", display = 4,
          ),
          argonTable(
            cardWrap = F,
            headTitles = c(
              "Mon - Wed",
              "Thur - Fri",
              "Weekend"
            ),
            argonTableItems(
              argonTableItem(
                dataCell = TRUE, 
                argonBadge(
                  text = ": 9AM - 4PM",
                  status = "info"
                )
              ),
              argonTableItem(
                dataCell = T,
                argonBadge(
                  text = ": 9AM - 5PM",
                  status = "primary"
                )
              ),
              argonTableItem(
                dataCell = TRUE, 
                argonBadge(
                  text = ": Closed",
                  status = "danger"
                )
              )
            )
          )
          
        )
      )
    )
    
  ),
  #tags$br(nrow = 5), " section pour la barre navbar
  argonSection(
    size = "fluid",
    status = "default",
    gradient = TRUE,
    separator = F,
    separator_color = "white",
    shape = F
  ),
  argonSection(#class = "custom-margin",
    size = "fluid",
    status = "default",
    background_color = "white", # Définir la couleur de fond en blanc
    gradient = F, # Désactiver le gradient
    separator = F,
    separator_color = "white",
    shape = TRUE,
    argonRow(
      div(style = "text-align: center;",
        argonH1("Services", display = 1) %>% argonTextColor(color = "white"),
        argonH1("At Data N’Go, we help you unlock the power of 
                data for your business growth. Our services are 
                designed to provide you the best-in-class data-driven solutions. 
                Here’s how we can help you.", display = 4) %>% argonTextColor(color = "white")
      ),
      tags$br(nrow = 3),
      argonRow(
        argonColumn(
          width = 6,
          tags$br(nrow=7),
          argonImage(
            src = "Pellicule/service_img.png"
          )
        ), 
        argonColumn(
          width = 6,
          argonLead("| Our solutions") %>% argonTextColor(color = "white"),
          argonH1("Data-driven solutions for accelerated growth", display = 3) %>% argonTextColor(color = "white"),
          argonLead("Our strategic data-driven services 
                    are designed to help you achieve your business goals. 
                    Let’s create a customized plan for your success.") %>% argonTextColor(color = "white"),
          argonRow(
            argonColumn(
              width = 6,
              argonRow(
                argonColumn(
                  argonIconWrapper(
                    iconTag = fontawesome::fa(name = "facebook", fill = "blue", height = "3em", width = "3em"),
                    size = "lg",
                    #status = "default",
                    shadow = TRUE,
                    gradient_color = "#3333FF",
                    hover_shadow = TRUE
                  )
                ),
                argonColumn(
                  argonLead("9,723 Account boosted")%>% argonTextColor(color = "black") 
                )
              ),
              argonRow(
                argonColumn(
                  argonIconWrapper(
                    iconTag = fontawesome::fa(name = "instagram", fill = "#C13584", height = "3em", width = "3em"),
                    size = "lg",
                    #status = "default",
                    shadow = TRUE,
                    gradient_color = "#C13584",
                    hover_shadow = TRUE
                  )
                ),
                argonColumn(
                  argonLead("4,865 Account promoted")%>% argonTextColor(color = "black") 
                )
              )
              ,
              argonRow(
                argonColumn(
                  argonIconWrapper(
                    iconTag = fontawesome::fa(name = "tiktok", fill = "black", height = "3em", width = "3em"),
                    size = "lg",
                    #status = "default",
                    shadow = TRUE,
                    gradient_color = "black",
                    hover_shadow = TRUE
                  )
                ),
                argonColumn(
                  argonLead("3,749 Account optimized")%>% argonTextColor(color = "black") 
                )
              )
              #argonIcon(name = "ni ni-facebook-rect"),
              #argonTextColor(tag = "9,723 Account boosted", color = "black")
            ),
            argonColumn(
              width = 6,
              argonRow(
                argonColumn(
                  argonIconWrapper(
                    iconTag = fontawesome::fa(name = "twitter", fill = "#3399FF", height = "3em", width = "3em"),
                    size = "lg",
                    #status = "default",
                    shadow = TRUE,
                    gradient_color = "#3399FF",
                    hover_shadow = TRUE
                  )
                ),
                argonColumn(
                  argonLead("6,473 Account managed")%>% argonTextColor(color = "black") 
                )
              ),
              argonRow(
                argonColumn(
                  argonIconWrapper(
                    iconTag = fontawesome::fa(name = "youtube", fill = "#FF3333", height = "3em", width = "3em"),
                    size = "lg",
                    #status = "default",
                    shadow = TRUE,
                    gradient_color = "#FF3333",
                    hover_shadow = TRUE
                  )
                ),
                argonColumn(
                  argonLead("5,763 Account grow")%>% argonTextColor(color = "black")
                )
              ),
              argonRow(
                argonColumn(
                  argonIconWrapper(
                    iconTag = fontawesome::fa(name = "linkedin", fill = "#0000CC", height = "3em", width = "3em"),
                    size = "lg",
                    #status = "default",
                    shadow = TRUE,
                    gradient_color = "#0000CC",
                    hover_shadow = TRUE
                  )
                ),
                argonColumn(
                  argonLead("84,763 User hired")%>% argonTextColor(color = "black") 
                )
              )
            )
          )
        )
      ),
      tags$br(nrow = 3),
      argonRow(
        div(style = "text-align: center;",
            argonLead("Our services") %>% argonTextColor(color = "white"),
            argonH1("Data-driven insights for your business growth", 
                    display = 1) %>% argonTextColor(color = "white")
        ),
        argonRow(
          
          argonCard(
            width = 4,
            background_color = "secondary",
            argonH1("Data Analysis", display = 4),
            argonLead("Analyzing your data to gain insights and drive results."),
            src ="#",
            btn_text = "Get Started", 
            "$299/month"
          ),
          argonCard(
            width = 4,
            background_color = "secondary",
            src ="#",
            argonH1("Data Visualization", display = 4),
            argonLead("Visualizing your data to unlock its full potential."),
            btn_text = "Get Started", 
            "$499/month"
          ),
          argonCard(
            src ="#",
            width = 4,
            btn_text = "Get Started", 
            background_color = "secondary",
            argonH1("Data Science", display = 4),
            argonLead("Leveraging the power of data science for your business growth."),
            "$199 /month"
          )
          
        ),
        argonRow(
          
          argonCard(
            src ="#",
            width = 4,
            btn_text = "Get Started", 
            background_color = "secondary",
            argonH1("Machine Learning", display = 4),
            argonLead("Leveraging machine learning to predict customer behavior and identify new sales opportunities."),
            "$249/month"
          ),
          argonCard(
            src ="#",
            width = 4,
            btn_text = "Get Started", 
            background_color = "secondary",
            argonH1("Data Visualization", display = 4),
            argonLead("Communicating the story behind your data through compelling visualizations."),
            "$375/month"
          ),
          argonCard(
            src ="#",
            width = 4,
            btn_text = "Get Started", 
            background_color = "secondary",
            argonH1("Machine Learning", display = 4),
            argonLead("Empowering your business with the best-in-class machine learning models."),
            "$205/month"
          )
          
        )
        
      )
    )
  ),
  argonSection(
    size = "fluid",
    status = "warning",
    background_color = "white", # Définir la couleur de fond en blanc
    gradient = FALSE, # Désactiver le gradient
    separator = F,
    #separator_color = "white",
    shape = T,
    argonRow(
     div(style = "text-align: center;",
       argonColumn(width = 12,
         argonLead("| Our portfolio") %>% argonTextColor(color = "black")
       )
     ),
     br(), br(),
     argonRow(
       argonColumn(
         width = 10,
         argonH1("A showcase of success stories", display = 2)
       ),
       argonColumn(
         width = 2,
         argonButton(name = "show all",
                     src = "services.html",
                     status = "secondary",
                     icon = argonIcon("send"),
                     size = "lg",
                     toggle_modal = TRUE,
                     modal_id = "modal3")
       )
     ),
     argonRow(
       argonCard(width = 12,
         status = "default",
         background_color ="default",
         argonRow(
           argonColumn(
             argonImage(
               src = "Pellicule/service_img2.png"
             )
           ),
           argonColumn(
             argonH1("Client:ABC Inc.", display = 4) %>% argonTextColor(color = "white"),
             argonH1("Project:Data-driven Marketing Strategy", display = 4) %>% argonTextColor(color = "white"),
             argonLead("We helped ABC Inc. to increase their sales by 30% by 
           developing a data-driven marketing strategy. Our team analyzed 
           their customer data and developed a personalized marketing campaign 
           that resonated with their target audience. 
                     This led to a significant 
                     increase in customer engagement and sales.") %>% argonTextColor(color = "white"),
             argonButton(name = "Read more",
                         src = "services.html",
                         status = "secondary",
                         icon = argonIcon("collection"),
                         size = "lg")
           )
         )
       )
     ),
     br(), br(),
     argonRow(
       argonCard(width = 12,
                 status = "default",
                 background_color ="default",
                 argonRow(
                   argonColumn(
                     argonH1("Client: XYZ Corp.", display = 4) %>% argonTextColor(color = "white"),
                     argonH1("Project: Machine Learning Model Development", display = 4) %>% argonTextColor(color = "white"),
                     argonLead("We developed a machine learning model for XYZ Corp. 
                               that helped them predict customer behavior 
                               and identify new sales opportunities. 
                               This led to a 35% increase in their 
                               sales and helped them 
                               stay ahead of their 
                               competition.") %>% argonTextColor(color = "white"),
                     argonButton(name = "Read more",
                                 src = "services.html",
                                 status = "secondary",
                                 icon = argonIcon("collection"),
                                 size = "lg")
                   ),
                   argonColumn(
                     argonImage(
                       src = "Pellicule/service_img3.png"
                     )
                   )
             )
       )
     )
    )
  )
)

# Create the path
path <- getwd()

# Generate the static page
argonPageTemplate(filename = "services", path = path, argonPage = services)
