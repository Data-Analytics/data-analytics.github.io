import pandas as pd 
data = pd.read_csv('assembly_pondi.csv')
data_total = pd.read_csv('assembly_pondi_totals.csv')
data_total['AC_NAME'] = [j.title() for j in data_total['AC_NAME']]
data = data.set_index(['year','constituency'])
data_total = data_total.set_index(['YEAR','AC_NAME'])
data['polled_votes'] = data_total['VOTES']
data.reset_index().to_csv('assembly_pondi_percentages.csv',index=False)