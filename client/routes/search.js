const log = require('../logger');
const makeRequest = require('../makeRequest');
const sendPacket = require('../sendPacket');

const { User, Query } = require('../mongoConfig');


module.exports = app => {
  app.get('/search/:query', async (request, response) => {
    const query = request.params['query'];
    log('query', query);
    const data = await makeRequest('ranker', `query/${query}`);
  
    const queryDBObject = new Query({query: query, userid: request.user ? request.user._id : null });
    queryDBObject.save((err) => {
      if(err) log('error', 'Could not successfully save query');
    })
  
    log('ranker', data.message);
    return response.json(
      sendPacket(data.success, `Successfully received response from ranker: ${query}`, data.content)
    );
  });

  app.post('/fetchDocuments', async (req, res) => {
    const startTime = Date.now()
    log('fetch', 'Fetching documents from ranker')
  
    const docUrls = req.body['docUrls'].slice(0, 60)
    const data = await makeRequest('ranker', 'fetchDocuments', 'POST', {docUrls: docUrls})
    const documents = data['content']['documents']
    log('fetch', `Received documents from ranker. Execution time ${(Date.now() - startTime) / 1000} seconds.`)
    
    if(req.user != undefined) {
      User.findById(req.user._id, (err, user) => {
        if(err) log('error', 'Unable to find user')
        else {
          return res.json(sendPacket(1, 'Successfully fetched documents', {documents: documents, likes: user['likes'], dislikes: user['dislikes']}))
        }
      })
    }
    else return res.json(sendPacket(1, 'Successfully fetched documents', {documents: documents, likes: {}, dislikes: {}}))
  })
}