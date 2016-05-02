import pandas as pd 
data = pd.read_csv('kerala_data_testters.csv')
color = pd.read_csv('color_mapper.csv')


for k in data['parties'].unique():
	if k not in list(color['party']):
		print k 
		
		
