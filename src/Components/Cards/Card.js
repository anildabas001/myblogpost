import React from 'react';
import {Link} from 'react-router-dom';

const Card = (props) => {
    return(
  <div style={{marginBottom: '10px', fontSize: '0.8rem'}} className="col-sm-4">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{props.title}</h5>
        <p className="card-text">{props.content}</p>
        <p className="card-text">Author: {props.author}</p>
        <p className="card-text">Views: {props.views}</p>
        <Link className="btn btn-primary" style={{color: 'white'}} to={`/blog/${props.blogId}`} >Go to Blog</Link>
      </div>
    </div>
  </div>
    );
}

export default Card;    