import pandas as pd
data = pd.read_csv('assembly_tn_group.csv')
data = data.groupby(['2001','2006'])['count'].sum()
data.reset_index().to_csv('sankey_data.csv',index=False)

