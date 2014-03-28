import pandas 
import urllib2
from lxml import etree
def scrape_title(visuals):
    url = 'http://data-analytics.github.io/%s'%visuals
    html = etree.HTML(urllib2.urlopen(url).read())
    for h1 in html.findall('.//title'):
        title = h1.text
        print title
data = pandas.read_csv('visualisation_list.csv')
for index,name in data.iterrows():
    scrape_title(name['url']);
