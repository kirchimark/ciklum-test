const zone = "http://localhost:3000"

const getArticle = (url) => {
  return fetch(`${zone}/api/getArticle?url=${url}`)
    .then(result => result.json());
}

const createSuggestion = (articleUrl,originalText,userText) => {
  return fetch(`${zone}/api/suggestion/save`, {
    method: 'post',
    headers: {
      'Content-Type' : 'application/json',
    },
    body: JSON.stringify({articleUrl,originalText,userText}),
    
  })
    .then(result => result.json())
}

export default {
  getArticle,
  createSuggestion
};

