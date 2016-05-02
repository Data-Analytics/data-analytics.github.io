import pandas as pd 
data = pd.read_csv('assembly_tn_detail.csv')

data['Total seats'] = 1
data_1 = data[(data['rank']==1)]

data_1 = data_1.groupby(['PARTY','ST_NAME']).sum()

data = data.groupby(['PARTY','ST_NAME']).sum()

data['Winning Seats'] = data_1['Total seats']

data.reset_index().to_csv('party_count_tn.csv',index=False)

