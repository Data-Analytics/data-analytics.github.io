import pandas
data = pandas.read_csv('parliament.csv')
#party,year,state,pc,name,sex,age,category,votes,electors,rank,color
data = data.groupby(['pc','year','state'])['votes'].sum()
parliament_data = pandas.read_csv('parliament_list.csv') 
parliament_data = parliament_data.set_index(['pc','year','state'])
parliament_data['polled_votes'] = data
parliament_data.reset_index().to_csv('parliament_data_list.csv',index=False)
#testing = pandas.read_csv('testing.csv')
#data = data.set_index('party')
#data['color'] = '#999'
#testing = testing.set_index('Party')
#print testing.index
#print data.index
#data['color'] = testing['Color']
#data.reset_index().to_csv('parliament.csv',index=False)