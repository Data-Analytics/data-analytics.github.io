import pandas as pd 
data = pd.read_csv('assembly_tn_detail.csv')
data = data[(data['YEAR']==2011)]
data['last_party'] = data['PARTY']

