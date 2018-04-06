const zone = "http://localhost:3000"

const getArticle = (url) => {
  return fetch(`${zone}/api/getArticle?url=${url}`)
    .then(result => result.json());
}

const createSuggestion = (articleUrl,originalText,userText,value) => {
  return fetch(`${zone}/api/suggestion/save`, {
    method: 'post',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({articleUrl,originalText,userText,value}),
    
  })
    .then(result => result.json())
}

const fetchAllNotApproved = () => {
  return fetch(`${zone}/api/suggestion/fetchAll/notapproved`)
    .then(result => result.json())
};

const fetchAllApproved = () => {
  return fetch(`${zone}/api/suggestion/fetchAll/approved`)
    .then(result => result.json())
};

const deleteSuggestion = (articleUrl, originalText) => {
  return fetch(`${zone}/api/suggestion/delete`, {
    method: 'delete',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({articleUrl, originalText})
  })
  .then(result => result.json());
}

const approve = (_id, value) => {
  return fetch(`${zone}/api/suggestion/update`, {
    method: 'post',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({_id, value})
  })
  .then(result => result.json());
}

export default {
  getArticle,
  createSuggestion,
  fetchAllApproved,
  fetchAllNotApproved,
  deleteSuggestion,
  approve,
};

