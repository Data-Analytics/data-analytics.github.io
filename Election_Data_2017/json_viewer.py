import pandas as pd 
import json
json_data=open('uttarpradesh.assembly.json').read()
data = json.loads(json_data)

for value in data.values():
	print(value)
