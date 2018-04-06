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

export const createSuggestion = (articleUrl,originalText,userText,value) => (dispatch) => {
  console.log('CREATE SUGGESTION');
  return api.createSuggestion(articleUrl,originalText,userText,value)
    .then(data => {
      
    })
    .catch(console.log);
}

export const createSuggestionAndUpdate = (articleUrl,originalText,userText,value) => (dispatch) => {
  dispatch(createSuggestion(articleUrl,originalText,userText,value))
    .then(() => {
      dispatch(fetchNotApproved());
    })
    .catch(console.log)
}

export const fetchNotApproved = () => (dispatch) => {

  return api.fetchAllNotApproved()
    .then(data => {
      dispatch({type: "RECEIVE_NOT_APPROVED", payload: data});
    })
    .catch(console.log)
}

export const fetchAllApproved = () => (dispatch) => {
  
  return api.fetchAllApproved()
    .then(data => {
      dispatch({type: "RECEIVE_APPROVED", payload: data});
    })
    .catch(console.log);
}

export const deleteSuggestion = (articleUrl, originalText, update) => (dispatch) => {
  console.log('DELETE SUGGESTION');
  return api.deleteSuggestion(articleUrl , originalText)
    .then(data => {
      if (update)
       dispatch(fetchNotApproved())
      else
       dispatch(fetchAllApproved())
    })
    .catch(console.log)
}

export const approve = (_id, value, update) => (dispatch) => {
  console.log('APPROVE SUGGESTION');
  return api.approve(_id, value)
    .then(data => {
      if (update)
      dispatch(fetchNotApproved())
     else
      dispatch(fetchAllApproved())
    })
    .catch(console.log)
}