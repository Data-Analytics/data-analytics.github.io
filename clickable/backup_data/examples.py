import pandas as pd  
import urllib
import csv
import requests
from lxml import etree
data = pd.read_csv('assembly_tn_detail.csv')


def scrape_data(year,url):
  #sub_datas = ['7_transmembrane_receptor','ADAM','Cadherin','CD','Connexin','EGF','Fibronectin','Fz','GPR','Immunoglobulin','Integrin','Ion_channel','Ion_transport','kinase','Lectin','Major_Facilitator_Superfamily','Receptor_family_ligand','SLC','TNF','Transporters','Zinc_finger'] 
  #for sub_data in sub_datas[:2]:
    sub_url = 'http://data-analytics.github.io/Election_Data/tamil_nadu.html?year='+str(year)+'&acct_no='+str(url)+'#perConstituency'
    print sub_url
    html = etree.HTML(urllib2.urlopen(sub_url).read())

    for table in html.findall('.//title'):
            print table.text
            
for index,row in data.iterrows():
     scrape_data(row['YEAR'],row['AC_NO'])
     


