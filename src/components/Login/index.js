import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {username: '', password: '', showErrorMsg: false, errorMsg: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
    console.log(event.target.value)
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
    console.log(event.target.value)
  }

  onLoginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onLoginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onClickSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()

    if (response.ok === true) {
      this.onLoginSuccess(data.jwt_token)
    } else {
      this.onLoginFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, showErrorMsg, errorMsg} = this.state

    const token = Cookies.get('jwt_token')

    if (token !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div testid="login" className="bg-login">
        <img
          className="login-img"
          src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676620581/Rectangle_1467_n0s0jr.png"
          alt="website login"
        />
        <div className="login-form-con">
          <form>
            <img
              className="logo"
              src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676621824/Group_7731_nuz134.png"
              alt="login website logo"
            />
            <div className="login-input-con">
              <label htmlFor="username">Username*</label>
              <input
                id="username"
                onChange={this.onChangeUsername}
                value={username}
                type="text"
                className="login-input"
              />
            </div>
            <div className="login-input-con">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                onChange={this.onChangePassword}
                value={password}
                type="password"
                className="login-input"
              />
            </div>
            <button
              onClick={this.onClickSubmit}
              className="submit-button"
              type="submit"
            >
              Login
            </button>
            {showErrorMsg && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
