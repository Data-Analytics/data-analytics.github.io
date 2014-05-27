import pandas
data = pandas.read_csv('parliament_2014_data.csv')
print data['votes']

#data['votes'] = data['votes'].apply(int)
data = data.groupby(['party','year'])['votes'].sum()
#party	year	state	pc	name	sex	age	category	votes	electors	rank	color	
data.reset_index().to_csv('grouped_parliament_10.csv',index=False)