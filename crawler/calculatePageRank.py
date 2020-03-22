import time
import sys
sys.path.append('../..')

from Chefmate.crawler.fileIO import FileIO
from Chefmate.crawler.graph import Graph
from Chefmate.helpers import log

def calculatePageRank(domain:str, inlinkGraphFile:str, outlinkGraphFile:str, iterations:int, lambdaVar:float=0.0001, testMode=False):
  startTime = time.time()
  inlinkGraph = Graph(FileIO.readJsonFile(inlinkGraphFile))
  outlinkGraph = Graph(FileIO.readJsonFile(outlinkGraphFile))

  pages = set(outlinkGraph.nodes.keys()).union(inlinkGraph.nodes.keys())
  pageLength = len(pages)

  currentRank_I = {}
  updatedRank_R = {}

  for page in pages:
    currentRank_I[page] = 1.0 / pageLength
  
  for k in range(0, iterations):
    for page in pages:
      updatedRank_R[page] = lambdaVar / pageLength

    for page in pages:
      Q = inlinkGraph.get(page).keys()

      if len(Q) > 0:
        for linkPage in Q:
          updatedRank_R[linkPage] += (1.0-lambdaVar)*currentRank_I[page]/len(Q)
      else:
        for linkPage in Q:
          updatedRank_R[linkPage] += (1.0-lambdaVar)*currentRank_I[page]/pageLength

    for rank in updatedRank_R:
      currentRank_I[rank] = updatedRank_R[rank]

  not testMode and FileIO.writeJsonFile(currentRank_I, 'domains/' + domain + '/' + domain + '_pageRank.json')
  log('time', 'PageRank calculation for ' + domain + ' completed in ' + str(time.time()-startTime) + ' seconds')

  return currentRank_I

if __name__ == '__main__':
  # pageRanks = calculatePageRank(domain='Tasty', 
  #   inlinkGraphFile='./domains/Tasty/Tasty_inlinks.json', 
  #   outlinkGraphFile='./domains/Tasty/Tasty_outlinks.json', 
  #   iterations=3
  # )
  pageRanks = calculatePageRank(domain='test', inlinkGraphFile='./test/inlinks.json', outlinkGraphFile='./test/outlinks.json', iterations=3, testMode=True)
  print('PageRanks:', pageRanks)