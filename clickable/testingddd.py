import pandas as pd 
data = pd.read_csv('tn_data.csv')
data = data[(data['1991']=='PMK') | (data['1996']=='PMK') | (data['2001']=='PMK') | (data['2006']=='PMK') | (data['2011']=='PMK')]
data = data.to_csv('pmk_bastions.csv',index=False)
