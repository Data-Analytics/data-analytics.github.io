import pandas as pd 
mapper = pd.read_csv('file_mapper.csv')
sub_data = []

for index,row in mapper.iterrows():
	sub_data.append(pd.read_csv(row['url']))
data = pd.concat(sub_data,ignore_index=True)
data = data[(data['votes']>1)]

ranked_data = []
for k in data['constituency'].unique():
	select_data = data[(data['constituency']==k)]
	select_data['votes'] = [int(j) for j in select_data['votes']]
	select_data.sort(['votes'], ascending=[False], inplace=True)
	select_data['rank'] = [(j+1) for j in xrange(len(select_data))]
	ranked_data.append(select_data)	
all_data = pd.concat(ranked_data,ignore_index=True)	
all_data['name'] = all_data['candidate']
all_data.to_csv('real_time.csv',index=False)
	