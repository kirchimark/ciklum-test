import React from 'react';
import { connect } from 'react-redux';

import Results from '../components/Results';

const mapStateToProps = (state) => ({
  article: state.article
});
const dispatchStateToProps = (dispatch) => ({});

export default connect(mapStateToProps, dispatchStateToProps)(Results);