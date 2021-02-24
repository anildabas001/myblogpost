import axios from '../../AxiocConfig/Axio.config';

export const loadBlogs = (offset, blogs) => {
    return (dispatch) => {
        axios.get(`/api/blog/list?offset=${offset}&limit=9`).then(responseData => {            
            
            const data = responseData.data;
            let blogList = [];
            if(blogs.length > 0) {
                blogList = [...blogs];
            }
            

           data.data.forEach(blog => {
                blogList.push ({
                    id: blog.id,
                    author: blog.author_user.name,
                    title: blog.title,
                    content: blog.content,
                    views: blog.views
                });
            }); 
            
            const blogsState = {
                offset: data.offset + 1,
                limit: data.limit,
                remaining: data.remaining,
                error: false,
                blogs: blogList
            }
            dispatch({type: 'LOAD_BLOGS', values: blogsState});
        }).catch(err => {dispatch({type: 'ERROR'})})
    }
}
