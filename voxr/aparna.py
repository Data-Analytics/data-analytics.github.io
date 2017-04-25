import pandas as pd 
data = pd.read_json('sample.json')
for k in range(0,len(data)):
   data[:k].to_json('sample_'+str(k)+'.json',orient='records')
    