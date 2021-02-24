let initialState = {
    expires: null,
    isLoggedin: false,
    id: '',
    name: '',
    email: '',
    formError: false
};

if(localStorage.getItem('userData')) {
    initialState = JSON.parse(localStorage.getItem('userData'));
}

const AuthReducer = (state=initialState, action) => {
    switch(action.type) {
        
        case 'LOGIN': 
            let updatedUserState = {...action.values};
            delete updatedUserState['token'];
            localStorage.setItem("authenticationToken", action.values.token);
            localStorage.setItem("userData", JSON.stringify(updatedUserState));
            return {
                ...state,
                ...updatedUserState
            };        
        
        case 'SIGNUP': 
        
            return {
                ...state
            };  
        case 'FORM_ERROR': 
            
            return {
                ...state,
                formError: true
            };
        case 'CLEAR_FORM_ERROR': 
            
            return {
                ...state,
                formError: false
            };

        default: return state;
    }
}

export default AuthReducer;