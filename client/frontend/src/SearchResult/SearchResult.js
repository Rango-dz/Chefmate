import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import HeaderSearch from '../Headers/HeaderSearch';
import { Redirect } from 'react-router-dom';
import Results from './Results';
import NoResults from './NoResults';
import Timeout from './Timeout';
// import loading from '../images/loading.gif';
import CircularProgress from '@material-ui/core/CircularProgress';
import { publicDecrypt } from 'crypto';

const GLOBAL_TIMEOUT = 20;

const useStyles = makeStyles((theme) => ({
  container: {
    width: '100vw',
  },
  // loading: {
  //   marginTop: '80px',
  // },
  loading: {
    color: 'rgb(230, 95, 85)',
    marginTop: '150px',
  },
}));

var seconds = 0;
var stillLoading = true;

function SearchResult(props) {
  const styles = useStyles();
  const [loginRedirect, changeLoginRedirect] = useState(false);
  const oldQuery = props.match.params.query;
  const [documents, changeDocuments] = useState([]);
  const [isLoading, changeLoading] = useState(true);
  const [timedOut, changeTimedOut] = useState(false);
  const [numSearched, updateNumSearched] = useState(0);
  const [searchTime, changeSearchTime] = useState(1.12);
  const [userLikesDislikes, changeUserLikesDislikes] = useState([]);

  seconds = 0;
  stillLoading = true;
  var cancel = setInterval(clockUpdate, 1000, changeTimedOut);

  async function checkAuthentication() {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') return;
    const { data } = await axios.get('/checkAuthenticated');
    if (data.success === 0) {
      changeLoginRedirect(true);
    }
  }

  useEffect(() => {
    checkAuthentication();
    fetchQueryResults();
  }, []);

  async function fetchQueryResults() {
    const startTime = Date.now();
    const { data } = await axios.get(`/search/${oldQuery}`);
    const docUrls = data['content']['sortedDocUrls'];
    updateNumSearched(docUrls.length);
    fetchDocuments(docUrls).then(() => {
      changeSearchTime((Date.now() - startTime) / 1000);
      changeLoading(false);
      stillLoading = false;
    });
  }

  async function fetchDocuments(docUrls) {
    const { data } = await axios.post('/fetchDocuments', { docUrls: docUrls });
    changeDocuments(data['content']['documents']);
    changeUserLikesDislikes([data['content']['likes'], data['content']['dislikes']]);
  }

  return (
    <div className={styles.container}>
      {loginRedirect && <Redirect to="/" />}
      <HeaderSearch initialSearch={oldQuery} />
      {isLoading ? (
        // <img className={styles.loading} src={loading} alt="loading..." />
        <CircularProgress className={styles.loading} size={100} />
      ) : timedOut ? (
        <Timeout />
      ) : documents.length > 0 ? (
        <Results
          documents={documents}
          numSearched={numSearched}
          searchTime={searchTime}
          likesDislikes={userLikesDislikes}
        />
      ) : (
        <NoResults />
      )}
    </div>
  );
}

export default SearchResult;

function clockUpdate(changeTimedOut) {
  if (stillLoading) {
    seconds++;
    console.log('secs: ' + seconds + ' isLoading: ' + stillLoading); 
    if (seconds > GLOBAL_TIMEOUT && stillLoading) {
      changeTimedOut(true);
    }
    
  }
  //log('time update', seconds);
}