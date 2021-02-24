import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import Card from '../Cards/Card';
import {loadBlogs} from '../../Store/Actions/BlogsAction'
import { Redirect } from 'react-router-dom';

const Home = (props) => {
    useEffect(() => {
        props.loadBlogs(props.offset, props.blogs);
        return () => {
            props.resetBlogs();
        }
    }, []);

    const loadBlogs = (event) => {
        props.loadBlogs(props.offset, props.blogs);
    }

    const homeElement = props.error ? <div style={{color: 'red', fontSize: '1.4rem', textAlign: 'center', padding: '40px'}}>Something went wrong. Please try again</div> : (<div style={{width: '80%', margin: '0 auto',padding: '20px'}}>
            <h2 style={{textAlign:'center', padding: '15px', fontSize: '2.5rem'}}>Blogs</h2>
            <div className="row">
                {props.blogs.map(blog => <Card blogId={blog.id} key={blog.id + blog.title} title={blog.title} content={blog.content} author={blog.author} views={blog.views}/>)}
            </div>
        {props.remaining > 0 && props.blogs.length > 0 ? <button onClick={loadBlogs} style={{display: 'block', margin: '10px auto', fontSize: '1.4rem'}} type="button" className="btn btn-link">Load more...</button>: null}
        </div>);

    return(
        <>
            {props.isLoggedin ? homeElement: <Redirect to='/login' />}  
        </>  
    );
}

const mapStateToProps = (state) => {
    return {
        offset: state.Blogs.offset,
        limit: state.Blogs.limit,
        remaining: state.Blogs.limit,
        blogs: state.Blogs.blogs,
        error: state.Blogs.error,
        isLoggedin: state.Authorization.isLoggedin
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadBlogs: (offset, blogs) => dispatch(loadBlogs(offset, blogs)),
        resetBlogs: () => dispatch({type: 'RESET_BLOGLIST'})
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
