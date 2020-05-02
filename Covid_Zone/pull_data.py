import glob as glob
import pandas as pd
import json

state_list = glob.glob('*.json')
print (state_list)
load_data = []
for state in state_list:
    state_json = open(state)
    state_data = json.load(state_json)
    if state.split('.')[0]=='india':
        data = state_data['objects'][state.split('.')[0]]['geometries']
    else:
        data = state_data['objects'][state.split('.')[0]+'_district']['geometries']
        for sub_data in data:
            load_data.append(sub_data['properties'])       
            #print (sub_data['properties'])
print (load_data)        
combine_data = pd.read_json(load_data)
print (combine_data)    
#{'dt_code': '343', 'district': 'South 24 Parganas', 'st_nm': 'West Bengal', 'st_code': '19', 'year': '2011_c'}
#data['objects']['westbengal_district']['geometries'][0]['properties']['']
