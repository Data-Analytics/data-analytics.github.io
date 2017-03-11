import pandas as pd

data = pd.read_csv('punjab.csv')
data_latest = pd.read_csv('punjab_2017.csv')
fixed_cols = data.columns
data= pd.concat([data,data_latest],ignore_index=True)
data.to_csv('punjab.csv',index=False)
print (fixed_cols)