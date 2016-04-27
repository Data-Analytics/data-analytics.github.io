import pandas as pd 
data = pd.read_csv('assembly_pondi_detail.csv')

data_1 = data[(data['rank']==1)] 
data_2 = data[(data['rank']==2)] 

data_1 = data_1.set_index(['YEAR','AC_NAME'])
data_2 = data_2.set_index(['YEAR','AC_NAME'])

data_1['margin'] = data_1['VOTES'] - data_2['VOTES']

data_1.reset_index().to_csv('testing.csv',index=False)
