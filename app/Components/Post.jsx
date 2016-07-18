import React, { Component, PropTypes } from 'react'
import Dotdotdot from 'react-dotdotdot';
import HtmlToReact from 'html-to-react';
import {
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromRaw,
  CompositeDecorator,
  DefaultDraftBlockRenderMap,
} from 'draft-js'

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createWithContent(convertFromRaw(Object.assign({}, JSON.parse(props.postData.content), {entityMap: {}}))),
      immediateView: false,
    }
    this.formatDate = () => {
      return new Date (parseInt(this.props.postData.createdAt)).toDateString()
    }
    this.openImmediateView = () => {
      this.setState({immediateView: !this.state.immediateView})
    }
  }
  render(){
    const {editorState} = this.state;
    const postData = this.props.postData
    var contentState = editorState.getCurrentContent();
    return(
      <div className="blog-post">
        <h1>{postData.title}</h1>
        <h4>Clifford Wright • {this.props.postData.created_at} • Subject: {postData.subject}</h4>
        <div>
        </div>
        <div style={{textAlign: "justify"}} className={this.state.immediateView ? "" : "ellipsis"}>
          <Editor 
            readOnly={true}
            editorState={editorState}
          />
        </div>
        <div style={{textAlign: "center"}}>
          <input
            onClick={this.openImmediateView}
            className="read-more-btn"
            type="button"
            value="Read More"
          />
        </div>
      </div>
    )
  }
}

const styles = {
  button: {
    marginTop: 10,
    textAlign: 'center',
  },
}

Post.propTypes = {
  postData: PropTypes.object.isRequired,

}
