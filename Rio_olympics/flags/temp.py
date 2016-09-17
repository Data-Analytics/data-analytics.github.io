import urllib
image = urllib.URLopener()
for k in xrange(300,400):
  try:
	image.retrieve("http://olympicshub.stats.com/flags/48x48/"+str(k)+".png",str(k)+".png")
  except:
  	print k 