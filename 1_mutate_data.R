make_new_cases <- function(df){
  df[['new_cases']] <- df[['cases']] - lag(df[['cases']], 1)
  df[['log_new_cases']] <- log2(df[['new_cases']])
  df[['log_cases']] <- log2(df[['cases']])
  return(df)
}


harris <- read.csv('harris.csv', stringsAsFactors = F)
harris_lag <- make_new_cases(harris)
write.csv(harris_lag, 'harris_lag.csv', row.names=F)

texas <- read.csv('texas.csv', stringsAsFactors = F)
texas_lag <- make_new_cases(texas)
write.csv(texas_lag, 'texas_lag.csv', row.names=F)



# Putting together texas and harris county for comparison
harris_lag_tmp <- harris_lag %>% 
  select(log_new_cases, log_cases) %>%
  mutate(label="Harris County")

texas_lag_tmp <- texas_lag %>% 
  select(log_new_cases, log_cases) %>%
  mutate(label="Texas State")

comparison_lag <- rbind(texas_lag_tmp, harris_lag_tmp)

write.csv(comparison_lag, 'comparison_lag.csv', row.names=F)



