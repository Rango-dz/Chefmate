import time
from os.path import exists
from shutil import rmtree
import sys
sys.path.append('..')
from helpers  import log
from getpass import getpass
import bcrypt

from crawler import Crawler
from dataParser import DataParser
from databaseBuilder import DatabaseBuilder
from calculateTFIDF import calculateTFIDF
from calculateIDF import calculateIDF
from calculatePageRank import calculatePageRank
from calculateHubAuth import calculateHubAuth

domains = [
    {'name': 'Tasty', 'root': 'https://tasty.co/'},
    {'name': 'SimplyRecipes', 'root': 'https://www.simplyrecipes.com/'},
    {'name': 'EpiCurious', 'root': 'https://www.epicurious.com/'},
]

loginPwd = '$2b$12$xteJc6kD6a3QSpi3MCHz5OyJWFY47uls8iw33Y.mwhqPtd168bOt.'.encode('UTF-8')

def buildIndex(iterations, threads=1, reset=False, resetFiles=False, passwordLock=True, dev=False, options={'crawl':True, 'pageRank': True, 'parse':True, 'hits': True, 'database':True, 'idf':True, 'tfidf':True}):
  log('build index', 'Running full suite of crawler programs.')
  programStartTime = time.time()

  loginSuccess = False
  if reset and passwordLock:
    log("info", "You are about to reset the database")
    pwd = getpass('Enter password to continue:').encode('UTF-8')
    if(bcrypt.checkpw(pwd, loginPwd)):
      loginSuccess = True
      log('login', 'Login successful. Resetting databases.')
    else:
      log('login', 'Login failed. Reset operation not performed')
  
  else:
    loginSuccess = True

  if resetFiles and exists('domains'):
    log('cleanup', 'Removing old domains folder')
    rmtree('./domains')

  reset and loginSuccess and DatabaseBuilder.resetInvertedIndex() and DatabaseBuilder.resetCrawler()

  for domain in domains:
    domainStartTime = time.time()

    options['crawl'] and Crawler(domain['name'], domain['root']).runSitemapCrawler()

    inlinkGraphFile = 'domains/'+domain['name']+'/'+domain['name']+'_inlinks.json'
    outlinkGraphFile = 'domains/'+domain['name']+'/'+domain['name']+'_outlinks.json'
    
    options['parse'] and DataParser(domain['name'], domain['root'], threads).runParser()

    options['pageRank'] and calculatePageRank(domain['name'], inlinkGraphFile, outlinkGraphFile, 3)
    options['hits'] and calculateHubAuth(domain['name'], inlinkGraphFile, outlinkGraphFile, 3)
    options['database'] and DatabaseBuilder(domain['name'], threads=threads, mode='DEV' if dev else 'PROD').buildRawText()


    log("time", domain['name']+" finished running in "+str(time.time()-domainStartTime)+" seconds.")
  
  options['idf'] and calculateIDF(threads)
  options['tfidf'] and calculateTFIDF(threads)
  log("time", "Program finished running in "+str(time.time()-programStartTime)+" seconds.")