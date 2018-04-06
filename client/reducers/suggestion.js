const suggestionReducer = (state={approved: [], notApproved: []}, action) => {
  switch(action.type) {
      case "RECEIVE_NOT_APPROVED": 
        return {approved: [], notApproved: action.payload};
      case "RECEIVE_APPROVED": 
        return  {approved: action.payload, notApproved: []};
      default:
          return state;
  }
}

export default suggestionReducer