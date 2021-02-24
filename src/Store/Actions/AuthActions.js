import axios from '../../AxiocConfig/Axio.config';

export const login = (email, password) => {
    return (dispatch, getState) => {
        
        axios.post('/api/authenticate', {
            email: email,
            password: password
        }).then (authData => {
            const authValues = {
                expires: authData.data.expires,
                isLoggedin: true,
                name: authData.data.user.name,
                id: authData.data.user.id,
                email: authData.data.user.email,
                token: authData.data.token,
                loginError: false
            }

            dispatch({type: 'LOGIN', values: authValues});
            return authData;
        })
        .catch(err => dispatch({type: 'FORM_ERROR'}));  
        
    }
}

export const signup = (name, email, password, updateFormState) => {
    return (dispatch) => {        
        axios.post('/api/users/new', {
            name: name,
            email: email,
            password: password
        }).then (authData => {
            
            updateFormState(state => {
                return {                    
                    ...state,
                    signupSuccess: true,
                }                    
            })
            return authData;
        })
        .catch(err => dispatch({type: 'FORM_ERROR'}));    
        
    }
}