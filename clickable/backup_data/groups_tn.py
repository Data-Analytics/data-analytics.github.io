import pandas as pd 
data = pd.read_csv('assembly_tn_detail.csv')

data['Total Candidates'] = 1

data_1 = data[(data['rank']==1)] 
data_1 = data_1.set_index(['YEAR','AC_NAME'])

data = data.groupby(['YEAR','AC_NAME'])['Total Candidates'].sum()

data_1['Total Candidates'] = data

data_1.reset_index().to_csv('tested_tn.csv',index=False)