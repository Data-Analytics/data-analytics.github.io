import pandas as pd 
data = pd.read_csv('population.csv')
life = pd.read_csv('life_data.csv')
data = data.set_index('Country')
life = life.set_index('Country')
life['population'] = data['Population']
life.reset_index().to_csv('data.csv')