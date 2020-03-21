from mongoengine import *
from mongoConfig import *
import math
import time
import sys
sys.path.append('..')
from helpers import log

def calculateTFIDF(): 
    startTime = time.time()
    connect(databaseName, host=databaseAddr, port=27017)
    terms = InvertedIndex.objects()
    log('tfidf', 'Calculating TFIDF scores')
    for termEntry in terms: 
        term = termEntry['term']
        idf = termEntry['idf']

        # log("tfidf", 'Calculating '+term)

        for i in range(0, len(termEntry["doc_info"])):
            tf = termEntry['doc_info'][i]['termCount']
            log_tf = 0
            if (tf != 0):
                log_tf = math.log(tf, 2) + 1
            tf_idf = log_tf * idf
            termEntry['doc_info'][i]['tfidf']=tf_idf
        
        termEntry.save()
        
    log("time", 'Execution finished in '+str(time.time()-startTime)+' seconds.')

if __name__ == "__main__":
  calculateTFIDF()
    

