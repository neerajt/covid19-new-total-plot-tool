library(plumber)
pwd <- Sys.getenv("PWD")
heroku_port <- Sys.getenv("PORT")

print(paste("pwd var is set to", pwd))

if(pwd == "/"){
    app_path <- "/app/plot_function.R"
} else if(pwd != ""){
    app_path <- paste(pwd, "plot_function.R", sep="/")
} else{
    app_path <- "plot_function.R"
}

if(heroku_port == ""){
    port <- 8000
} else if(heroku_port != ""){
    port <- heroku_port
}

r <- plumb(app_path)  # Where 'plumber.R' is the location of the file shown above
r$run(port=port)