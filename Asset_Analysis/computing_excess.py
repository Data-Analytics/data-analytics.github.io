import pandas as pd 
results_data= pd.read_csv('excess_data.csv')
#age	category	color	electors	name	party	pc	polled_votes	rank	sex	state	votes	year
#state,constituency,poll_date,name,party,age,gender,education,category,assets,criminal_cases,color
results_data['pc'] =[pc.title() for pc in results_data['pc']] 
results_data['party'] =[pc.title() for pc in results_data['party']] 
results_data['state'] =[pc.title() for pc in results_data['state']]
results_data['sub_name'] =[pc.lower().replace('.','').replace(' ','').replace(',','').replace('(','').replace(')','') for pc in results_data['name']]
elections_data= pd.read_csv('elections_data_our_1.csv')
results_data = results_data.set_index(['pc','party'])
elections_data = elections_data.set_index(['constituency_name','party_name'])

results_data['poll_date'] = elections_data['poll_date']
results_data['education'] = elections_data['education']
results_data['gender'] = elections_data['gender']
results_data['category'] = elections_data['category']
results_data['assets'] = elections_data['assets']
results_data['criminal_cases'] = elections_data['criminal_cases']
results_data['age'] = elections_data['age']
results_data['gender'] = elections_data['gender']
results_data.reset_index().to_csv('results_data_excess_1.csv',index=False)