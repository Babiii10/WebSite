library(argonR)
library(shiny)
library(vembedr)
library(fontawesome)

pricing = argonPage(
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
      div(style = "text-align: center;",
          argonH1("Pricing", display = 1),
          h4("We offer a range of digital services designed 
            to unlock your data’s full potential. Let us help 
            you turn insights into action with our 
              powerful data science tools.") %>% argonTextColor("black")
      ),
      #container = TRUE,
      argonRow(style = "margin-left: 10px; margin-right: 10px;",
        argonCard(
          statut = "default",
          background_color = "default",
          width = 4,
          argonH1("Silver", display = 1) %>% argonTextColor("white"),
          h4("$ 1,000") %>% argonTextColor("white"),
          h6("Take the first step in optimizing 
        your data strategy with our Data Analysis package. 
        Our team of experts will provide actionable 
        insights to drive your business forward.") %>% argonTextColor("white"),
          
          tags$p(fa("check-square", fill = "green"), argonTextColor(h6("Expert Data Analysis"), color = "white")),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("Detailed Reporting"), color = "white")),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("Dedicated Support"), color = "white") ),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("Standard Support & Guidance"), color = "white"))
          
        ),
        argonCard(
          statut = "default",
          background_color = "default",
          width = 4,
          argonH1("Gold", display = 1) %>% argonTextColor("white"),
          h4("$ 2,000") %>% argonTextColor("white"),
          h6("Elevate your data capabilities with our 
           Data Visualization package. Make informed 
           decisions with our easy-to-understand visual 
           representations of even the most 
           complex data sets.") %>% argonTextColor("white"),
          tags$p(fa("check-square", fill = "green"), argonTextColor(h6("Beautiful Data Visualization"), color = "white")),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("Interactive Dashboards"), color = "white")),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("Dedicated Support"), color = "white") ),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("(All from Silver)"), color = "white"))
          
        ),
        argonCard(
          statut = "default",
          background_color = "default",
          width = 4,
          argonH1("Platinum", display = 1) %>% argonTextColor("white"),
          h2("$ 4,900") %>% argonTextColor("white"),
          h6("Harness the power of machine learning 
           with our comprehensive Machine Learning package. 
           Our solutions will help you automate key processes, 
           optimize performance, 
           and drive growth.") %>% argonTextColor("white"),
          tags$p(fa("check-square", fill = "green"), argonTextColor(h6("Advanced Machine Learning"), color = "white")),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("Custom Data Solutions"), color = "white")),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("VIP Support"), color = "white") ),
          tags$p(fa("check-square", fill = "green"), argonTextColor( h6("(All from Silver & Gold)"), color = "white"))
        )
      ),
      argonRow(
        div(style = "text-align: left;",
            argonLead("| Why choose us"),
            br(),
            argonH1("Your partner in data-driven success", display = 3)
        ),
        argonColumn(
          width = 7,
          argonImage(
            src = "Pellicule/experts.png",
          )
        ), 
        argonColumn(
          width = 5,
          argonBadge(
            text = "1/ Data Analysis",
            status = "default"
          ),
          argonLead("We help businesses analyze their data, identify key insights, and make data-driven decisions."),
          argonBadge(
            text = "2/ Data Visualization",
            status = "default"
          ),
          argonLead("Our team creates visually stunning data visualizations that communicate complex information in an easily digestible way."),
          argonBadge(
            text = "3/ Machine Learning",
            status = "default"
          ),
          argonLead("We leverage machine learning algorithms to uncover patterns and insights in your data, helping you make more informed decisions."),
          argonBadge(
            text = "4/ Customized Solutions",
            status = "default"
          ),
          argonLead("We work closely with you to understand your unique data needs and develop customized solutions that help you achieve your business goals.")
        )
      ),
      argonRow(
        argonLead(" | Payment transparency") %>% argonTextColor("black"),
        argonRow(
          argonColumn(
            width = 7,
            argonH1("Transparent pricing for better results", display = 1) %>% argonTextColor("black"),
            argonRow(
              argonColumn(
                width = 6,
                argonH1("Custom Cost Estimates", display = 4),
                "We provide detailed project proposals that outline all costs, 
            deliverables, and timelines, ensuring no surprises before work begins."
              ),
              argonColumn(
                width = 6,
                argonH1("No Hidden Fees" , display = 4) %>% argonTextColor("black"),
                "Our pricing structures are transparent, 
            with no surprise charges or unexpected add-on costs, 
            giving you peace of mind."
              )
            ),
            br(),
            argonRow(
              argonColumn(
                width = 6,
                argonH1("Flexible Payment Options", display = 4),
                "We offer various payment methods and are happy 
              to discuss flexible schedules to accommodate your 
              preferences and financial needs."
              ),
              argonColumn(
                width = 6,
                argonH1("Itemized Invoicing", display = 4) %>% argonTextColor("black"),
                "Our invoices provide a clear breakdown of all services 
              rendered and associated costs, ensuring complete 
              transparency throughout the billing process."
              )
            )
          ),
          argonColumn(
            width = 5,
            br(),br(),br(),br(),
            tags$video(src = "Pellicule/Pricing.mp4", 
                         type = "video/mp4", 
                         controls = NA, 
                         width = "600px", height = "400px")
            #,
            # embed_url("https://www.youtube.com/watch?v=uV4UpCq2azs") %>%
            #   #use_start_time("1m32") %>%
            #   # use_bs_responsive() %>%
            #   use_align("center")
          )
        )
      )
    )
  )
  
)



# Create the path
path <- getwd()

# Generate the static page
argonPageTemplate(filename = "pricing", path = path, argonPage = pricing)