library(argonR)
library(shiny)
library(vembedr)
library(fontawesome)

aboutUs = argonPage(
  tags$style(HTML("
      .custom-margin {
        margin: 20px; /* Modifier cette valeur selon vos besoins */
      }
    ")),
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
  # main content
  argonSection(
    size = "fluid",
    status = "default",
    gradient = TRUE,
    separator = F,
    separator_color = "white",
    shape = F
  ),
  argonSection( #class = "custom-margin",
    size = "fluid",
    status = "secondary",
    gradient = F,
    separator = F,
    separator_color = "white",
    shape = F,
    argonRow(
      div(style = "text-align: center;",
          argonH1("About Us ", display = 1),
          h4("Welcome to your partner for data science and visualization.
             We are committed to helping businesses and individuals turn 
             their data into actionable insights and drive 
             growth.") %>% argonTextColor("black")
      )
    )
  ),
  argonSection(
    
    argonRow(
      argonColumn(
        width = 5,
        argonImage(
          src = "https://10web-site.ai/85/wp-content/uploads/sites/97/2024/04/black-man-tablet-and-smile-in-portrait-at-startup-68M4QPV_jchlkIoJ.webp",
          floating = F
        ),
        br(),br(),br(),
        argonH1("Our vision", display = 4) %>% argonTextColor(color = "white"),
        argonLead("Our vision is to help businesses harness 
                    the power of their data to make informed 
                    decisions that drive real 
                    business growth.")%>% argonTextColor(color = "white"), 
        br(),br(),
        argonButton(
          name = "Learn More",
          status = "primary",
          icon = argonIcon("collection"),
          size = "lg",
          toggle_modal = TRUE,
          modal_id = "modal2"
        ) 
      ),
      argonColumn(
        width = 7,
        argonLead("| Who we are") %>% argonTextColor(color = "white"),
        argonH1("Empowering businesses with data-driven insights", display = 4)%>% argonTextColor(color = "white"),
        argonProgress(value = 80, status = "danger", text = "Data Analysis"),
        argonProgress(value = 90, status = "danger", text = "Data Visualization"),
        argonProgress(value = 75, status = "danger", text = "Machine Learning"),
        argonProgress(value = 95, status = "danger", text = "Lorem ipsum"),
        
        argonH1("Our mission", display = 4)%>% argonTextColor(color = "white"),
        br(),
        argonRow(
          argonColumn( width = 3,
                       argonIconWrapper(
                         iconTag = argonIcon("atom"),
                         size = "lg",
                         status = "danger",
                         shadow = TRUE,
                         gradient_color = "green",
                         hover_shadow = TRUE
                       ),
                       argonLead("Empowering Businesses With Data")%>% argonTextColor(color = "white") 
          ),
          argonColumn( width = 3,
                       argonIconWrapper(
                         iconTag = argonIcon("chart-pie-35"),
                         size = "lg",
                         status = "danger",
                         shadow = TRUE,
                         gradient_color = "green",
                         hover_shadow = TRUE
                       ),
                       argonLead("Uncovering Data Insights")%>% argonTextColor(color = "white") 
          ),
          argonColumn(
            width = 3,
            argonIconWrapper(
              iconTag = argonIcon("align-left-2"),
              size = "lg",
              status = "danger",
              shadow = TRUE,
              gradient_color = "green",
              hover_shadow = TRUE
            ),
            argonLead("Making Data-Driven Decisions Easy")%>% argonTextColor(color = "white") 
          ),
          argonColumn(width = 3,
                      argonIconWrapper(
                        iconTag = argonIcon("tv-2"),
                        size = "lg",
                        status = "danger",
                        shadow = TRUE,
                        gradient_color = "green",
                        hover_shadow = TRUE
                      ),
                      argonLead("Customized Data Solutions For Your Business")%>% argonTextColor(color = "white") 
          )
        )
        
      )
    )
    
  )
  
)

# Create the path
path <- getwd()

# Generate the static page
argonPageTemplate(filename = "about-Us", path = path, argonPage = aboutUs)