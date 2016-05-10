import pandas as pd 
data = pd.read_csv('real_time.csv')
map = pd.read_csv('color_mapper.csv')

data = data[~data['party'].isin(list(map['party'].unique()))]

print data['party'].unique()

