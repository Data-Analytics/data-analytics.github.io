import pandas as pd 
data = pd.read_csv('assembly_tn_detail.csv')

data_1 = data[(data['rank']==1)] 
data_2 = data[(data['rank']==2)] 

data_1 = data_1.set_index(['YEAR','AC_NAME'])
data_2 = data_2.set_index(['YEAR','AC_NAME'])

data_1['margin'] = data_1['VOTES'] - data_2['VOTES']

data_1 = data_1.reset_index()

data_1 = data_1[(data_1['margin']>=20000)] 

data_1 = data_1[['AC_NAME','YEAR','PARTY']].set_index(['AC_NAME','YEAR']).unstack(level=1)
data_1.reset_index().to_csv('tn_20000_data.csv',index=False)

#data_1 = data_1.groupby(['YEAR','PARTY'])['rank'].sum()
#data_1.unstack().fillna(0).reset_index().to_csv('sample_tn.csv',index=False)

#data_1.reset_index().to_csv('testing_tn.csv',index=False)
