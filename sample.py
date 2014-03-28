import glob 
import pandas
data = glob.glob('*/')
k = []
for j in data:
    j = data = glob.glob(j+'*.js')
    for l in j:
        k.append(l)
        
k = pandas.Series(k)
list = k.unique()
for y in list:
    print y#.split('\\')[1]