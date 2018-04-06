import React from 'react';
import { withRouter } from 'react-router-dom';

import './styles/article.less'

class Article extends React.Component {
  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    const url = params.get('articleURL'); 

    this.setState({url});

    if (url)
      this.props.getArticle(url);
  }

  componentWillReceiveProps(nextProps) {  }

  changeInput = (name) => (event) => this.setState({[name] : event.target.value});
  
  createSuggestion = (name, text) => () => {
    console.log(this.state[name], text , 'we will send it to server');

    this.props.createSuggestion(this.state.url,text,this.state[name]);
  }

  renderParagraph(text, key) {
    return (<div className="paragraph-wrapper" key={key}>
      <div className="original">
        <h3>Original Text</h3>
        <p>
          {text}
        </p>
      </div>
      <div>
        <h3>User Version</h3>
        <textarea className="user-suggestion" onChange={this.changeInput(key)}/>
      </div>
      <div className="send">
        <button className="send-button" onClick={this.createSuggestion(key , text)}>Send</button>
      </div>
    </div>)
  }

  render() {
    return (<div className="container">
      <div className="content-wrapper">
        {!this.props.article && <h2>Enter Valid Url</h2>}
        
        {this.props.article && this.props.article.title && <h2>
          {this.props.article.title}
        </h2>}

        {this.props.article 
        && this.props.article.parapgraphs 
        && this.props.article.parapgraphs.map((item, index) => this.renderParagraph(item, index) )
        }

      </div>
    </div>)
  }
}

export default withRouter(Article);