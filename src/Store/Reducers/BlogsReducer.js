let initialState = {
    offset: 0,
    limit: 12,
    remaining: 0,
    blogs: [],
    error: false
};

const BlogsReducer = (state=initialState, action) => {
    switch(action.type) {
        
        case 'LOAD_BLOGS': 
            let updatedBlogsState = action.values;            
            return {
                ...state,
                ...updatedBlogsState
            };
        
        case 'RESET_BLOGLIST':             
            return {
                ...initialState
            };   
        
        case 'ERROR':
            return {
                ...initialState,
                error: true,
            };  
        
        default: return state;
    }
}

export default BlogsReducer;