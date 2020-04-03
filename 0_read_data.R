library(dplyr)
library(lubridate)
# read data

covid19 <- read.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-counties.csv', stringsAsFactors = F)

write.csv(covid19, 'covid19.csv', row.names = F)

harris <- covid19 %>%
  filter(state=="Texas" & county=="Harris") %>%
  mutate(date=lubridate::ymd(date))

write.csv(harris, 'harris.csv', row.names = F)

covid19_states <- read.csv('https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv')

texas <- covid19_states %>%
  filter(state=="Texas") %>%
  mutate(date=lubridate::ymd(date))

write.csv(texas, 'texas.csv', row.names = F)


