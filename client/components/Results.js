import React from 'react';

import './styles/result.less';

class Results extends React.Component {

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const url = params.get('showApproved'); 

    this.setState({url : url === 'true'});

    if (url === 'true')
      this.props.fetchApproved()
    else
      this.props.fetchNotApproved();
  }
  
  deleteSuggestion = (articleUrl , originalText) => () => {
    this.props.deleteSuggestion(articleUrl , originalText , !this.state.url);
  }
  
  approveSuggestion = (_id) => () => {
    this.props.approve(_id , true, !this.state.url);
  }
  

  createSuggestion = (_id) => (event) => {
    this.setState({[_id]: event.target.value});
  }

  createAndUpdate = (item) => () => {
    console.log(item.articleUrl, item.originalText, this.state[item._id], 'approved')
    this.props.createSuggestionAndUpdate(item.articleUrl, item.originalText, this.state[item._id], 'approved');
  }

  renderSuggestion = (suggestions,key) => {
    return <div className="suggestions-container" key={key}>
      <div>
        <div>
          <h3>Original text</h3>
          <span>{suggestions[0]['originalText']}</span>
        </div>
        <button className="delete-button" onClick={this.deleteSuggestion(suggestions[0].articleUrl, suggestions[0].originalText)}>Delete</button>
      </div>
      <h3>User suggestions:</h3>
      {suggestions.map((suggestion,i) => <div key={suggestion.userText + i} className="approve">
        <span>{suggestion.userText}</span>
        <button onClick={this.approveSuggestion(suggestion._id)}>Approve</button>
      </div>)}
      <div className="approve">
        <div className="inputWrapper" style={{width: '50%'}}>
          <input type="text" placeholder="Enter your suggestion" onChange={this.createSuggestion(suggestions[0]._id)}/>
        </div>
        <button onClick={this.createAndUpdate(suggestions[0])}>Approve</button>
      </div>
    </div>
  }

  render() {
    return(<div className="container">
      <div className="content-wrapper">
          <h3>Approve page</h3>

          {this.props.suggestion && 
            this.props.suggestion.notApproved.length > 0 && 
            this.props.suggestion.notApproved.map((item,key) => this.renderSuggestion(item,key))
            }

          {this.props.suggestion && 
            this.props.suggestion.approved.length > 0 && 
            this.props.suggestion.approved.map((item,key) => this.renderSuggestion(item,key))
            }
        </div>
      </div>)
  }
}

export default Results;