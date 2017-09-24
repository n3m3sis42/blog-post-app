import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { fetchPost, deletePost } from '../actions'

class PostsShow extends Component {

  componentDidMount() {
    // NOTE if you don't want to "eagerly fetch," i.e. fetch post
    // even if it's already been fetched by index, add an if
    // usually better to fetch anyway unless concerned about
    // network usage (or maybe limit of API calls?)
    const { id }  = this.props.match.params
    this.props.fetchPost(id)
  }

  onDeleteClick = () => {
    const { id }  = this.props.match.params
    this.props.deletePost(id, () => {
      this.props.history.push('/')
    })
  }

  render() {
    const { post } = this.props

    if (!post) {
      return <div>Loading...</div>
    }

    return (
      <div>
      <Link to='/'>Back to Index</Link>
      <button
        className='btn btn-danger pull-xs-right'
        onClick={this.onDeleteClick}
      >
        Delete Post
      </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow)


function mapStateToProps({ posts }, ownProps) {
  return { post: posts[ownProps.match.params.id] }
}
