import pandas as pd 
pl = pd.read_csv('parliament_list.csv')
data = pd.read_csv('rank_data.csv')
data = data[(data['rank']==1)]
rank_data = pd.concat([pl,data],ignore_index=True)
rank_data.to_csv('parliament_2014.csv',index=False)