library(ggplot2)
library(scales)


# read data
harris_lag <- read.csv('harris_lag.csv', stringsAsFactors = F)
texas_lag <- read.csv('texas_lag.csv', stringsAsFactors = F)
comparison_lag <- read.csv('comparison_lag.csv', stringsAsFactors = F)

# plot data
texas_vs_harris_plt <- ggplot(comparison_lag) +
  geom_line(aes(x=log_cases, y=log_new_cases, color=label)) +
  geom_abline(linetype=2) +
  scale_x_continuous(breaks = trans_breaks("log2", function(x) 2^x),
                     labels = trans_format("log2", math_format(2^.x))) +
  labs(title="New Cases by Total Cases",
    subtitle="in Texas and Harris County",
    caption="Data from The New York Times, based on reports from state and local health agencies.") +
  xlab("Total Cumulative Cases") +
  ylab("New Cases per Day") 
print(texas_vs_harris_plt)




plt <- ggplot(comparison_lag) +
  geom_line(aes(x=log_cases, y=log_new_cases)) +
  geom_abline(linetype=2) +
  labs(title="New Cases by Total Cases",
       subtitle="in Texas and Harris County",
       caption="Data from The New York Times, based on reports from state and local health agencies.") +
  xlab("Total Cumulative Cases") +
  ylab("New Cases per Day") 
print(plt)



