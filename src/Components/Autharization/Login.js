import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {login} from '../../Store/Actions/AuthActions';

const Login = (props) => {  
    let formErrorTimeout;
    if(props.formError === true) {
        formErrorTimeout = setTimeout(() => {
            props.clearFormError();
        }, 2000)
    }

    const [formState, updateFormState] = useState({
        email: '',
        password: '',
        fieldErrors: []
    });

    const changeHandler = (event, targetInput) => {
        updateFormState((state) => {
            return {
                ...state,
                [targetInput]: event.target.value
            }
        });
    }

    useEffect(() => {
        return () => {
            clearTimeout(formErrorTimeout);
        }
    }, []);

    const submitHandler = (event) => {
        event.preventDefault();
        var emailReg = /\S+@\S+\.\S+/;        
        let isValid = true;
        let errors = []
        if(formState.email.trim().length <= 0) {
            errors.push('Email field must not be empty');
            isValid = isValid && false;
        }
        else if(!emailReg.test(formState.email)) {
            errors.push('Email must be in correct format');
            isValid = isValid && false;
        }

        if(formState.password.trim().length < 6) {
            errors.push('Password field must be at least 6 characters long');
            isValid = isValid && false;
        }
        
        if(isValid) {
            props.login(formState.email, formState.password, updateFormState);
        }

        else {
            updateFormState(state => {
                return {
                    ...state,
                    fieldErrors: [...errors]
                }
            })

            setTimeout(() => {
                updateFormState(state => {
                    return {
                        ...state,
                        fieldErrors: []
                    }
                })
            }, 2500)
        }

    }

    const loginForm = (<div style={{width: '70%', margin: '0 auto'}}>
    <h3 style={{textAlign: 'center', padding: '40px 0px'}}>
        Login form
    </h3>
    <div style={{width: '90%', paddingBottom: '40px'}}>
        {formState.fieldErrors.map((error, index) => <div key={index} className="alert alert-danger" role="alert">
            {error}
        </div>
        )}
    </div>
    <form>
        <div className="form-group">
            <label forhtml="email">Email address</label>
            <input onChange={(event) => {changeHandler(event, 'email')}} value= {formState.email} style={{width: '90%'}} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />                    
        </div>
        <div className="form-group">
            <label forhtml="password">Password</label>
            <input onChange={(event) => {changeHandler(event, 'password')}} value= {formState.password} style={{width: '90%'}} type="password" className="form-control" id="password" placeholder="Password" />
        </div>
        <div style={{color:'red', paddingBottom: '10px', fontSize: '0.9rem'}}>{props.formError ? 'Invalid Email/Password': null}</div>
        <button onClick={submitHandler} style={{width: '20%'}} type="submit" className="btn btn-primary">Login</button>
    </form>
</div>        
);

    return (
        <>
            {props.isLoggedin ? <Redirect to='/' /> : <>{loginForm}</>}
        </>        
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedin: state.Authorization.isLoggedin,
        name: state.Authorization.name,
        formError: state.Authorization.formError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password, updateFormState) => dispatch(login(email, password, updateFormState)),
        clearFormError: () => dispatch({type: 'CLEAR_FORM_ERROR'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);