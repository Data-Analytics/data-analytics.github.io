import pandas as pd 
data = pd.read_csv('assembly_tn_detail.csv')
data_total = pd.read_csv('assembly_tn.csv')

data_total = data_total.groupby(['year'])['polled_votes'].sum()

data['party'] = [j if j in ['DMK','IND','INC','CPM','CPI','ADMK','JNP','PMK','TMC(M)','BJP','MDMK','CPI(M)','DMDK','MNMK'] else 'Others' for j in data['PARTY']]

data = data.groupby(['party','YEAR'])['VOTES'].sum().reset_index().set_index('YEAR')
data['polled_votes'] = data_total
data = data.reset_index()

data['votes_percentage'] = (data['VOTES']/data['polled_votes'])*100

data = data[['party','YEAR','votes_percentage']].set_index(['YEAR','party']).unstack()

data.to_csv('vote_share_predict.csv')


