library(stringr)

# Read data
# CSV from https://www.census.gov/data/datasets/time-series/demo/popest/2010s-counties-total.html#par_textimage_70769902
#setwd("~/SourceTree/covid19-new-total-plot-tool/data")

# population <- read.csv('co-est2019-alldata.csv', stringsAsFactors = F) 
population <- read.csv('http://www2.census.gov/programs-surveys/popest/datasets/2010-2019/counties/totals/co-est2019-alldata.csv', stringsAsFactors = F)
population_df <- population[,c("STNAME","CTYNAME",  "CENSUS2010POP", "POPESTIMATE2019")]
names(population_df) = c("state","county","pop2010", "pop2019")

head(population_df)

# Split in two different df. States and State:County
state_pop <- population_df[population_df$state == population_df$county, ]

# Confirm number of states. 50 + 1 DC
nrow(state_pop) # 52 states. DC has 2 entries

# Remove extra row for DC
state_pop <- state_pop[-9,]

# Reset row names
rownames(state_pop) <- NULL

# Location column
state_pop <- state_pop[,-2]
colnames(state_pop)[1] <- "location"

head(state_pop)

# Split - Get only the counties
county_pop <- population_df[population_df$state != population_df$county, ]
head(county_pop)

# Reset row names
rownames(county_pop) <- NULL
head(county_pop)

# Clean county string - remove "county" after the county's name
county_pop$county <- str_replace(county_pop$county, "County", "")
county_pop$county <- trimws(county_pop$county)
head(county_pop$county)

# Location column
county_pop$location <- paste(county_pop$state, county_pop$county, sep = ":")
county_pop <- county_pop[,c(-1,-2)]
county_pop <- county_pop[,c(3,1,2)]

head(county_pop)

# TODO: compare and filter counties in this csv with the counties in the NYT covid dataset

