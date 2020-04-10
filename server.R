library(plumber)
r <- plumb("plot_function.R")
r$run(port = 8000)