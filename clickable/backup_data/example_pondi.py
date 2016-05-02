import pandas as pd
data = pd.read_csv('assembly_pondi_group.csv')
data = data.groupby(['2001','2006'])['count'].sum()
data.reset_index().to_csv('sankey_data_pondi.csv',index=False)

