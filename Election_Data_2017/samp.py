import pandas as pd
for states in ['Punjab','Goa','Manipur','Uttar_Pradesh','Uttarakhand']:
	data = pd.read_csv(states+'.csv')
	data_latest = pd.read_csv(states+'_2017.csv')
	fixed_cols = data.columns
	data= pd.concat([data,data_latest],ignore_index=True)
	data.to_csv(states+'.csv',index=False)
