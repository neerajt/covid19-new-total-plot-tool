# plot function

library(dplyr)
library(lubridate)
library(ggplot2)
# read data

covid19_counties <- read.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv', stringsAsFactors = F)
write.csv(covid19_counties, 'covid19_counties.csv', row.names = F)

covid19_states <- read.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')
texas <- covid19_states %>%
  filter(state=="Texas") %>%
  mutate(date=lubridate::ymd(date))
write.csv(texas, 'texas.csv', row.names = F)

do_one_thing <- function(comparison_list){
  plot_df <- pull_data_for_location(comparison_list)
  plt <- ggplot(plot_df) +
    geom_point(aes(x=date, y=cases)) +
    ggtitle(paste("Cases by date for: ", comparison_list))
  return(plt)
}

do_more_than_one_thing <- function(comparison_list){
  # do something like this
  # harris_lag_tmp <- harris_lag %>% 
  #   select(log_new_cases, log_cases) %>%
  #   mutate(label="Harris County")
  # 
  # texas_lag_tmp <- texas_lag %>% 
  #   select(log_new_cases, log_cases) %>%
  #   mutate(label="Texas State")
  # 
  # comparison_lag <- rbind(texas_lag_tmp, harris_lag_tmp)
}

parse_location_string <- function(location_string){
  location_pair <- strsplit(location_string, ":")[[1]]
  location_vec <- c(state=location_pair[1], county=location_pair[2])
  return(location_vec)
}

pull_data_for_location <- function(location_string, state_df=covid19_states, county_df=covid19_counties){
  location_vec <- parse_location_string(location_string)
  if(grepl(":", location_string)){
    # pull from the county data
    location_df <- county_df %>%
      filter(state==location_vec['state'] & county==location_vec['county'])
  } else{
    # pull from the state data
    location_df <- state_df %>%
      filter(state==location_vec['state'])
  }
  return(location_df)
}

# assert(plot_one_or_more("Texas:Harris"), length(result(25)))

# plot_one_or_more(c("Texas:Harris", "Texas"))

plot_location <- function(comparison_list=NULL){
  # Plots new by cumulative cases for a given location (or locations)
  if(length(comparison_list) > 1){
    print("Do more than one thing. Coming soon!")
  } else if (length(comparison_list) == 1){
      plt <- do_one_thing(comparison_list)
  } else {
    print("Please enter one or more locations")
  }
  return(plt)
}
