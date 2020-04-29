library(plumber)
pwd <- Sys.getenv("PWD")
print(paste("pwd var is set to", pwd))

if(pwd != ""){
    app_path <- paste(pwd, "plot_function.R", sep="/")
} else{
    app_path <- "plot_function.R"
}
r <- plumb(app_path)  # Where 'plumber.R' is the location of the file shown above
r$run(port=8000)