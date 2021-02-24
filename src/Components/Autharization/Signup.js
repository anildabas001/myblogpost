import React, {useState} from 'react';
import {connect} from 'react-redux';
import { Redirect } from 'react-router-dom';
import {signup} from '../../Store/Actions/AuthActions'

const Signup = (props) => {

    if(props.formError === true) {
        setTimeout(() => {
            props.clearFormError();
        }, 1500)
    }

    const [formState, updateFormState] = useState({
        name: '',
        email: '',
        password: '',
        fieldErrors: [],
        signupSuccess: false
    });

    if(formState.signupSuccess === true) {
        setTimeout(() => {
            updateFormState((state) => {
                return {
                    ...state,
                    signupSuccess: false
                }
            })
        }, 1500)
    }

    const changeHandler = (event, targetInput) => {
        updateFormState((state) => {
            return {
                ...state,
                [targetInput]: event.target.value
            }
        });
    }

    const submitHandler = (event) => {
        event.preventDefault();
        var emailReg = /\S+@\S+\.\S+/;        
        let isValid = true;
        let errors = []
        if(formState.name.trim().length <= 0) {
            errors.push('Name field must not be empty');
            isValid = isValid && false;
        }
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
            props.signup(formState.name, formState.email, formState.password, updateFormState);
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

    return (
        <div style={{width: '70%', margin: '0 auto'}}>
            <h3 style={{textAlign: 'center', padding: '40px 0px'}}>
                Signup form
            </h3>
            <div style={{width: '90%', paddingBottom: '15px'}}>
                {formState.fieldErrors.map((error, index) => <div key={index} className="alert alert-danger" role="alert">
                {error}
            </div>
            )}
         </div>
            <form>
                <div className="form-group">
                    <label forhtml="name">Name</label>
                    <input onChange={(event) => {changeHandler(event, 'name')}} value= {formState.name} style={{width: '90%'}} type="name" className="form-control" id="name" placeholder="Enter Name" />                    
                </div>
                <div className="form-group">
                    <label forhtml="email">Email address</label>
                    <input onChange={(event) => {changeHandler(event, 'email')}} value= {formState.email} style={{width: '90%'}} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />                    
                </div>
                <div className="form-group">
                    <label forhtml="password">Password</label>
                    <input onChange={(event) => {changeHandler(event, 'password')}} value= {formState.password} style={{width: '90%'}} type="password" className="form-control" id="password" placeholder="Password" />
                </div>
                <div style={{color:'green', paddingBottom: '15px', fontSize: '0.9rem'}}>{formState.signupSuccess ? 'User Created Successfully. Please Login': null}</div>
                <div style={{color:'red', paddingBottom: '10px', fontSize: '0.9rem'}}>{props.formError ? 'Signup failed': null}</div>
                <button onClick={submitHandler} style={{width: '20%'}} type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>        
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedin: state.Authorization.isLoggedin,
        formError: state.Authorization.formError
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signup: (name, email, password, updateFormState) => dispatch(signup(name, email, password, updateFormState)),
        clearFormError: () => dispatch({type: 'CLEAR_FORM_ERROR'})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup);