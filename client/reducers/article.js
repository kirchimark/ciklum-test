const articleReducer = (state=null, action) => {
  switch(action.type) {
      case "RECEIVE_ARTICLES": 
        state = action.payload;
        return state;
      default:
          return state;
  }
}

export default articleReducer