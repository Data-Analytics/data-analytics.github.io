import pandas as pd 
results_data= pd.read_csv('set_data.csv')
#age	category	color	electors	name	party	pc	polled_votes	rank	sex	state	votes	year
#state,constituency,poll_date,name,party,age,gender,education,category,assets,criminal_cases,color
results_data['pc'] =[pc.title() for pc in results_data['pc']] 
results_data['state'] =[pc.title() for pc in results_data['state']]
results_data['sub_name'] =[pc.lower().replace('.','').replace(' ','').replace(',','').replace('(','').replace(')','') for pc in results_data['name']]
elections_data= pd.read_csv('elections_data.csv')
elections_data['constituency'] =[pc.title() for pc in elections_data['constituency']] 
elections_data['state'] =[pc.title() for pc in elections_data['state']]
elections_data['sub_name'] =[pc.lower().replace('.','').replace(' ','').replace(',','').replace('(','').replace(')','') for pc in elections_data['name']]
party_names = pd.read_csv('party_names.csv')
constituency_names= pd.read_csv('constituency_names.csv')
constituency_names = constituency_names.set_index('constituency')
elections_data = elections_data.set_index('constituency')
elections_data['constituency_name'] = constituency_names['pc']
elections_data = elections_data.reset_index()
party_names = party_names.set_index('Form_type')
elections_data = elections_data.set_index('party')
elections_data['party_name'] = party_names
elections_data = elections_data.reset_index()
party_names = party_names.reset_index()
elections_data = elections_data[(elections_data['party_name']).isin(party_names['Party'])]
elections_data.to_csv('elections_data_our_1.csv',index=False)
results_data = results_data.set_index(['sub_name','pc','party'])
elections_data = elections_data.set_index(['sub_name','constituency_name','party_name'])
#print len(elections_data)
results_data['poll_date'] = elections_data['poll_date']
results_data['education'] = elections_data['education']
results_data['gender'] = elections_data['gender']
results_data['category'] = elections_data['category']
results_data['assets'] = elections_data['assets']
results_data['criminal_cases'] = elections_data['criminal_cases']
results_data['age'] = elections_data['age']
results_data['gender'] = elections_data['gender']
results_data.reset_index().to_csv('results_data_1.csv',index=False)