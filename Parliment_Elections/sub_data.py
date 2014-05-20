import pandas as pd 
data = pd.read_csv('data.csv')
#pc	year	state	party	name	sex	age	category	votes	electors	rank	color	#polled_votes
data['pc'] = [pc.upper() for pc in data['pc']]
list_data=[]
for pc in data['pc'].unique():
    pc_data = data[(data['pc']==pc)]
    pc_data = pc_data.sort('votes',ascending=False)
    pc_data['rank'] = [k+1 for k in xrange(len(pc_data))]
    pc_data = pc_data.set_index(['pc','votes'])
    list_data.append(pc_data)
rank_data = pd.concat(list_data)
rank_data.reset_index().to_csv('rank_data.csv',index=False)    
#group_data = data.groupby('PC')['VOTES'].sum()#.reset_index()
#data = data.set_index('PC')
#data['Total_votes'] = group_data#['VOTES']
#data.reset_index().to_csv('data.csv',index=False)