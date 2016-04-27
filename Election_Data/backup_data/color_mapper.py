import pandas as pd 

color = pd.read_csv('color_mapper.csv')
color = color.set_index('party')

data = pd.read_csv('assembly_pondi.csv')
data = data.set_index('party')
data['color'] = color['color']
data.reset_index().to_csv('assembly_pondi_color.csv',index=False)
