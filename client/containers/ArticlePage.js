import React from 'react';
import { connect } from 'react-redux';
import { getArticle, createSuggestion } from '../actions'

import Article from '../components/Article';

const mapStateToProps = (state) => ({
  article: state.article
});

const dispatchStateToProps = (dispatch) => ({
  getArticle: (url) => dispatch(getArticle(url)),
  createSuggestion: (articleUrl,originalText,userText,value) => dispatch(createSuggestion(articleUrl,originalText,userText,value)),
});

export default connect(mapStateToProps, dispatchStateToProps)(Article);