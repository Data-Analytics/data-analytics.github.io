import glob
import csv 

photos = open('photo_mapper.csv', 'w')
files = csv.writer(photos)
files.writerows([['constituency','file_src']])
for folder in glob.glob('*'):
  for file_name in glob.glob(folder+'/*.*'):
		files.writerows([[folder,file_name]])
photos.close()
