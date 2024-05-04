if(interactive()){
  library(argonR)
  library(shiny)
  library(vembedr)
  library(fontawesome)
  
  # generate the page
  example <- argonPage(
    title = "ArgonR Static Template",
    author =  "Somebody",
    description = "HTML Static Template",
    navbar = argonNavbar(
      id = "main-navbar",
      #src = "Pellicule/logo9.png", 
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
    argonSection(
      size = "lg",
      status = "default",
      gradient = TRUE,
      separator = F,
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
            ) %>% argonTextColor(color = "white"),
            argonLead(
              "Argon is a great free UI package based on Bootstrap 
          4 that includes the most important components and features"
            ) %>% argonTextColor(color = "white")
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
    argonSection(
      size = "lg",
      status = "warning",
      background_color = "white", # Définir la couleur de fond en blanc
      gradient = FALSE, # Désactiver le gradient
      separator = F,
      separator_color = "white",
      shape = TRUE,
      argonRow(
        argonColumn(width = 6,
                    argonH1("Unlock the power of your data with Data N'Go", display = 1) %>% argonTextColor(color = "black") ,
                    argonLead("Data N’Go is a digital agency that specializes in data analysis, visualization, and machine learning to help businesses unlock the full potential of their data.") %>% argonTextColor(color = "black"),
                    argonRow(
                      argonIcon(name = "star", color = "danger"),
                      argonIcon(name  = "star", color = "danger"),
                      argonIcon(name = "star", color = "danger"),
                      argonIcon(name = "star", color = "danger"),
                      argonIcon(name = "star", color = "danger")
                      
                    ),
                    htmltools::span("4.8/5 étoiles parmi 250 clients") %>% argonTextColor(color = "black")
        ), 
        argonColumn(width = 6,
                    textInput("email",placeholder = "Ex: Email", value = NULL, label = tagList(argonIcon(name = "ni ni-email-83"), "Email")),
                    textInput("Name", placeholder = "Ex: Jean louis", value = NULL, label = tagList(argonIcon(name = "ni ni-single-02"), "Name")),
                    textInput("phone", placeholder = "Ex: +33 6 01 02 03 04", value = NULL, label = tagList(argonIcon(name = "ni ni-mobile-button"), "Phone Number")),
                    argonButton(name = "Get started",
                                status = "primary",
                                icon = argonIcon("send"),
                                size = "lg",
                                toggle_modal = TRUE,
                                modal_id = "modal1"),
                    # argonModal(
                    #   id = "modal1",
                    #   #title = "This is a modal",
                    #   status = "danger",
                    #   gradient = TRUE,
                    #   "The form was sent successfully."
                    #   ),
                    shiny::verbatimTextOutput("show_msg")
                    
        )
      )
    ),
    # argonSection(
    #   size = "lg",
    #   status = "warning",
    #   background_color = "white", # Définir la couleur de fond en blanc
    #   gradient = FALSE, # Désactiver le gradient
    #   separator = TRUE,
    #   separator_color = "white",
    #   shape = TRUE
    # ),
    argonSection(
      argonRow(
        argonColumn(
          width = 5,
          argonImage(
            src = "https://10web-site.ai/85/wp-content/uploads/sites/97/2024/04/black-man-tablet-and-smile-in-portrait-at-startup-68M4QPV_jchlkIoJ.webp",
            floating = TRUE
          ),
          br(),br(),br(),br(),
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
          argonLead("About us") %>% argonTextColor(color = "white"),
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
    ),
    
    argonSection(
      size = "lg",
      status = "warning",
      background_color = "white", # Définir la couleur de fond en blanc
      gradient = FALSE, # Désactiver le gradient
      separator = F,
      #separator_color = "white",
      shape = TRUE,
      argonRow(
        argonRow(
          
          argonColumn(
            width = 8,
            argonLead(" | Specialization") %>% argonTextColor(color = "black"),
            argonH1("Data analysis, visualization, and machine learning for data-driven growth", display = 1) %>% argonTextColor(color = "black"),
            argonH1("Our values:" , display = 3)%>% argonTextColor(color = "black"),
            argonRow(
              argonColumn(
                argonH1("Data-Driven Solutions", display = 4) %>% argonTextColor(color = "black"),
                argonLead("We provide customized data solutions that help businesses achieve their goals and drive growth.") %>% argonTextColor(color = "black"),
              ),
              argonColumn(
                
                argonH1("Expertise in Data Science", display = 4) %>% argonTextColor(color = "black"),
                argonLead("Our team consists of experienced data scientists with a deep understanding of the latest data science techniques and technologies.") %>% argonTextColor(color = "black"),
                
              )
            )
          ),
          argonColumn(
            width = 4,
            embed_url("https://www.youtube.com/watch?v=uV4UpCq2azs") %>%
              use_start_time("1m32") %>%
              use_align("center")
          )
          
        ),
        br(nrow=2),
        argonRow(
          argonColumn(
            width = 3,
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
            br(),
            br(),
            br(),
            argonH1("Empowering your business with data-driven insights and solutions", 
                    display = 4) %>% argonTextColor(color = "black"),
            br(),
            div(style = "text-align: center;",
                argonButton(
                  name = "Learn More",
                  src = "ourProcess.html",
                  status = "info",
                  icon = argonIcon("collection"),
                  size = "lg",
                  toggle_modal = TRUE,
                  modal_id = "modal2"
                ) %>% argonTextColor(color = "white")
            )
            
            # argonSocialButton(
            #   src = "http://rinterface.com",
            #   status = "info",
            #   icon = fontawesome::fa(name = "facebook", fill = "blue")
            # )
          ),
          argonColumn(
            width = 3,
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
        ),
        br(nrow=2),
        argonRow(
          
          div(style = "text-align: center;",
              argonLead("|Our services"),
              argonH1("Data-driven insights for your business growth", display = 1)
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
          # 2 
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
          )
          
        )
        
      )
    ),
    argonSection(
      argonRow(
        tags$script(src = "assets/vendor/headroom/headroom.min.js"),
        div(style = "text-align: center;",
          argonLead("| Testimonials")  %>% argonTextColor(color = "white"),
          br()
        ),
        argonRow(
          argonColumn(
            width = 9,
            argonH1("See what our clients have to say about 
                    our data-driven solutions and expertise", 
                    display = 4) %>% argonTextColor(color = "white")
          ),
          argonColumn(
            width = 3,
            argonButton(
              src = "#",
              name = "All testimonials",
              status = "secondary"
            )
          )
        ),
        argonRow(
          argonCard(
            width = 6,
            argonTextColor(tag = h4("“Data N’Go has been an essential 
                    partner in helping us unlock the power of our data.
                    Their team of experts has provided us with invaluable 
                    insights and solutions that 
                    have driven our business growth.”"), color = "black"),
            argonRow(
              argonColumn(
                width = 6,
                argonImage(
                  width = "80px",
                  src = "Pellicule/Brian Davis.png",
                  card_mode = T,
                )
              ),
              argonColumn(
                width = 6,
                argonLead("Brian Davis"),
                "CMO, Trendsetter Styles"
              )
            )
            
          ),
          argonCard(
            width = 6,
            argonTextColor(tag = h4("“Their data visualization solutions 
                    have completely transformed the way we communicate
                    complex data to our stakeholders. We couldn’t be happier 
                    with the results.”"), color = "black"),
            argonRow(
              argonColumn(
                width = 6,
                argonImage(
                  width = "50px",
                  src = "Pellicule/Michael Lee.png",
                  card_mode = T,
                )
              ),
              argonColumn(
                width = 6,
                argonLead("Michael Lee"),
                "Director, The Online Emporium"
              )
            )
          )
        ),
        argonRow(
          argonCard(
            width = 6,
            background_color = "secondary",
            argonTextColor(tag = h4("“Data N’Go’s machine learning algorithms have helped
                    us uncover insights that we would never have discovered 
                    otherwise. Their expertise in data science is 
                    truly impressive.”"),color = "black"),
            argonRow(
              argonColumn(
                width = 6,
                argonImage(
                  width = "100px",
                  src = "Pellicule/Sarah Wilson.png",
                  card_mode = T,
                )
              ),
              argonColumn(
                width = 6,
                argonLead("Sarah Wilson"),
                "Founder, Greenly Technologies"
              )
            )
          ),
          argonCard(
            width = 6,
            background_color = "secondary",
          argonTextColor(tag = h4("“Their customized data solutions have helped us
                    make data-driven decisions that have had a significant 
                    impact on our business growth. We highly 
                    recommend their services.”"), color = "black"),
            argonRow(
              argonColumn(
                width = 6,
                argonImage(
                  width = "100px",
                  src = "Pellicule/Mark Johnson.png",
                  card_mode = T,
                )
              ),
              argonColumn(
                width = 6,
                argonLead("Mark Johnson"),
                "Marketing Director, Acme Solutions"
              )
            )
          )
        )
        
      )
    ),
    argonSection(
      argonRow(
        argonProfileStat(value = 5, description = "Marketing Director, Acme Solutions")
      )
    )
  )
  
  observeEvent(input$modal1,{
    output$show_msg = shiny::renderText({
      "  vd "
    })
  })
  
  # create the path
  path <- getwd()
  
  # generate the static page
  argonPageTemplate(filename = "home", path = path, argonPage = example)
  
  
}