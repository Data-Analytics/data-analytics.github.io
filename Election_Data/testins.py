import pandas as pd 
data = pd.read_csv('tn_data_bottom_15.csv')
data = data[:-10]
for k in data:
