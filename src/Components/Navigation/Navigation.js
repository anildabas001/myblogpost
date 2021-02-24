import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux'

const Navigation = (props) => {

    const navElements = props.isLoggedin ? (<li className="nav-item">
        <a href="#" className="nav-link">
        Welcome {props.name}
    </a>
</li>) :(<><li className="nav-item">
                    <Link to='/login' className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to='/signup' className="nav-link">
                        Signup
                    </Link>
                </li></>)
    return (
        <nav className={'navbar navbar-expand-lg navbar-dark bg-dark justify-content-between'}>  
            <div style={{width: '70%', margin: '0 auto', display: 'flex', justifyContent:'space-between', color: 'white'}}>
            <Link to="/" className="navbar-brand">
                MyBlogPost
            </Link>              
            <ul style={{display: 'flex'}} className="nav navbar-nav justify-content-end">
                {navElements}
            </ul>
            </div>            
        </nav>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedin: state.Authorization.isLoggedin,
        name: state.Authorization.name
    }
}

export default connect(mapStateToProps, null)(Navigation);