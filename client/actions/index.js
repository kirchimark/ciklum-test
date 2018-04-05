import api from '../api';

export const getArticle = (url) => (dispatch) => {
  console.log('GET ARTICLE');
  return api.getArticle(url)
    .then(data => {
      dispatch({type: "RECEIVE_ARTICLES", payload: data});
    })
    .catch(error => {
      console.log(error );
    })
}

export const createSuggestion = (articleUrl,originalText,userText) => (dispatch) => {
  return api.createSuggestion(articleUrl,originalText,userText)
    .then(data => {
      console.log(data);
    })
    .catch(console.log);
}