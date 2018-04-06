import React from 'react';
import { connect } from 'react-redux';

import {fetchNotApproved, 
  deleteSuggestion, 
  approve, 
  createSuggestionAndUpdate, 
  fetchAllApproved} from '../actions'
import Results from '../components/Results';


const mapStateToProps = (state) => ({
  suggestion: state.suggestion
});
const dispatchStateToProps = (dispatch) => ({
  fetchNotApproved: () => dispatch(fetchNotApproved()),
  fetchApproved: () => dispatch(fetchAllApproved()),
  deleteSuggestion: (articleUrl , originalText, update) => dispatch(deleteSuggestion(articleUrl, originalText, update)),
  approve: (_id, value, update) => dispatch(approve(_id, value, update)),
  createSuggestionAndUpdate: (articleUrl,originalText,userText,value) => dispatch(createSuggestionAndUpdate(articleUrl,originalText,userText,value)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Results);