library(argonR)
library(shiny)
library(vembedr)
library(fontawesome)

contactUs = argonPage(
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
    shape = TRUE,
    argonRow(
      
    )
  )
  
)



# Create the path
path <- getwd()

# Generate the static page
argonPageTemplate(filename = "Contact-Us", path = path, argonPage = contactUs)