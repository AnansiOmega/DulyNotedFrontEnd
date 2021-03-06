import React from 'react'
import { Button, Form } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { fetchUserSuccess } from '../Actions/auth'
import { connect } from 'react-redux'

class Login extends React.Component {
    state = {
        username: '',
        password: '',
        error: null
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const reqObj = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch('http://localhost:3000/auth', reqObj)
        .then(resp => resp.json())
        .then(user => {
            if(user.error){
                this.setState({
                    error: user.error
                })
            } else {
                localStorage.setItem('myToken', user.token)
                this.props.fetchUserSuccess(user)
                this.props.history.push('/home')
            }
        })
    }

    render(){
        const myStyle = {backgroundColor: 'rgba(255,248,199,0.3)'}
        return(
            <Form className='login' onSubmit={this.handleSubmit}>
                {this.state.error && <h4 style={{color: 'red'}}>{this.state.error}</h4>}
            <Form.Field>
                <label>Username:</label>
              <input style={myStyle} name='username' onChange={this.handleChange} placeholder='Username' />
            </Form.Field>
            <Form.Field>
                <label>Password:</label>
              <input style={myStyle} type='password' name='password' onChange={this.handleChange} placeholder='Password' />
            </Form.Field>
            <Button style={myStyle} type='submit'>Login</Button>
            <Link to='/signup'>
            <Button style={myStyle}>Signup</Button>
            </Link>
          </Form>
        )
    }
}

const mapDispatchToProps = {
    fetchUserSuccess
}

export default connect(null, mapDispatchToProps)(Login)