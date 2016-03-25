import csv
import glob
import re
CSV_DATA_FOLDER = "assets/data/csv/"
OUT_FILE = "assets/data/csv/summary.csv"

class DataTransformer(object):
    ''' Ingests all the CSV files and transforms these to a single summary CSV file for all indian states
    '''

    def get_csv_filenames_from_dir(self, dir_name):
        return glob.glob("%s*.csv" % dir_name)

    def generate_summary_file(self):
            csv_filename_list = self.get_csv_filenames_from_dir(CSV_DATA_FOLDER) 
            out_csv_file = open(OUT_FILE, "wb")
            csv_writer = csv.writer(out_csv_file, delimiter=',')
            header_written = False
            for csv_filename in csv_filename_list:
                with open(csv_filename, "rb") as csv_file:
                    csv_reader = csv.reader(csv_file, delimiter=",")
                    if header_written:
                        next(csv_reader, None)
                    for row in csv_reader:
                        if not header_written:
                            csv_writer.writerow(row)
                            header_written = True
                        elif re.search(r'\d', row[4]):
                            if "Less than" in row[4]: 
                                break
                            else:
                                csv_writer.writerow(row)
            out_csv_file.close()

if __name__ == '__main__':
    obj = DataTransformer() 
    obj.generate_summary_file()         
