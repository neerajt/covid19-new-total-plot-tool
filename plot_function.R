# plot function

library(dplyr)
library(lubridate)
library(ggplot2)

# example API call

# http://localhost:8000/plot?location_list=Texas:Harris&location_list=New%20York&location_list=New%20York:New%20York%20City

covid19_counties_url <- 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv'
covid19_states_url <- 'https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv'

# read data

covid19_counties <- read.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv', stringsAsFactors = F) %>%
  mutate(date=lubridate::ymd(date)) %>%
  group_by(state, county) %>%
  mutate(new_cases=cases - lag(cases, 1),
         new_deaths=deaths - lag(deaths, 1)) %>%
  ungroup()

covid19_states <- read.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv') %>%
  mutate(date=lubridate::ymd(date)) %>%
  group_by(state) %>%
  mutate(new_cases=cases - lag(cases, 1),
         new_deaths=deaths - lag(deaths, 1)) %>%
  ungroup()

parse_location_string <- function(location_string) {
  location_pair <- strsplit(location_string, ":")[[1]]
  location_vec <- c(state = location_pair[1], county = location_pair[2])
  return(location_vec)
}

pull_data_for_location <- function(
  location_string,
  state_df = covid19_states,
  county_df = covid19_counties
) {
  location_vec <- parse_location_string(location_string)
  if (grepl(":", location_string)) {
    # pull from the county data
    location_df <- county_df %>%
      filter(state == location_vec['state'] & county == location_vec['county'])
  } else {
    # pull from the state data
    location_df <- state_df %>%
      filter(state == location_vec['state'])
  }
  return(location_df)
}


#* @filter cors
cors <- function(res) {
    res$setHeader("Access-Control-Allow-Origin", "*")
    plumber::forward()
}

#* return raw covid 19 data for one or more locations
#* @param location_list The location or locations to plot
#* @json
#* @get /src-data
pull_data_for_location_list <- function(location_list){
  plot_df <- data.frame()
  for(location in location_list){
    comparison <- pull_data_for_location(location) %>%
      select(date, cases, new_cases, deaths, new_deaths) %>%
      mutate(location_name=location)

    plot_df <- rbind(plot_df, comparison)
  }
  return(plot_df)
}

#* return plottable covid 19 data for one or more locations
#* @param location_list The location or locations to plot
#* @json
#* @get /plot-data
plot_data <- function(location_list){
  plot_df <- pull_data_for_location_list(location_list) %>%
    group_by(location_name) %>%
    mutate(x = date, y = cases) %>%
    select(x, y) %>%
    filter(!is.na(x) & !is.na(y))
  return(plot_df)
}

#* plot covid 19 data for one or more locations
#* @param location_list The location or locations to plot
#* @png
#* @get /plot
plot_location <- function(location_list) {
  print(paste("Location List:", location_list))

   plot_df <- pull_data_for_location_list(location_list)
   plt <- ggplot(plot_df) + 
     geom_point(aes(x=date, y=cases, color=location_name)) +
     scale_x_date(date_labels = "%b-%d") +
     labs(title="Total Cases by Date",
          subtitle="in some place(s)",
          caption="Data from The New York Times, based on reports from state and local health agencies.")
   return(print(plt))
}

#* @assets ./static /
list()
