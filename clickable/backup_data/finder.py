import pandas as pd 
data = pd.read_csv('assembly_pondi.csv')
data = data[['constituency','year','party']].set_index(['constituency','year']).unstack(level=1)
data.reset_index().to_csv('combined_data_pondi.csv',index=False)