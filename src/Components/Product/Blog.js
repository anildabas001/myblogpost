import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Card from '../Cards/Card';
import {loadBlogs} from '../../Store/Actions/BlogsAction'
import { Redirect, withRouter} from 'react-router-dom';
import axios from '../../AxiocConfig/Axio.config';

const Blog = (props) => {
    const [blogState, updateBlogState] = useState({
        content: '',
        title: '',
        publishedOn: '',
        author: ''
    });
    
    useEffect(() => {
        axios.get(`/api/blog/single/${props.match.params.id}`).then(responseData => {
            updateBlogState(state => {
                return {
                    ...state,
                    content: responseData.data.content,
                    publishedOn: responseData.data.created_at,
                    title: responseData.data.title,
                    author: responseData.data.author_user.name
                }
            })
        })
    }, [props.match.params.id]);

    

    return(
        <div style={{width: '70%', margin: '60px auto', padding: '20px', boxShadow: '0 15px 10px #777'}}>
            <h2 style={{textAlign: 'center', padding: '0px', margin: '0px'}}>{blogState.title}</h2>
            <p style={{textAlign: 'center', padding: '0px', margin: '0px', fontSize: '0.86rem'}}>by {blogState.author}</p>
            <p style={{textAlign: 'center', padding: '0px', margin: '0px', fontSize: '0.8rem'}}>Published on: {blogState.publishedOn}</p>
            <p>{blogState.content}</p>
        </div>  
    );
}

const mapStateToProps = (state) => {
    return {
        blogs: state.Blogs.blogs
    }
}

export default connect(mapStateToProps, null)(withRouter(Blog));
