library(plumber)
r <- plumb("plot_function.R")  # Where 'plumber.R' is the location of the file shown above
r$run(port=8000)