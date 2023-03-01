import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {GoThreeBars} from 'react-icons/go'
import Cookies from 'js-cookie'
import './index.css'

class Header extends Component {
  state = {displayButton: false}

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  onToggleNavItems = () => {
    this.setState(prevState => ({displayButton: !prevState.displayButton}))
  }

  renderListItems = () => (
    <ul className="header-list-con">
      <Link className="link-el" to="/">
        <li>
          <h1 className="header-text">Home</h1>
        </li>
      </Link>
      <Link className="link-el" to="/shelf">
        <li>
          <h1 className="header-text">Bookshelves</h1>
        </li>
      </Link>
      <li>
        <button className="logout" type="button" onClick={this.onClickLogout}>
          Logout
        </button>
      </li>
    </ul>
  )

  render() {
    const {displayButton} = this.state
    return (
      <nav testid="header" className="navbar-con">
        <Link to="/" className="link-el">
          {' '}
          <img
            className="logo-image"
            src="https://res.cloudinary.com/djbsa7llg/image/upload/v1676621824/Group_7731_nuz134.png"
            alt="website logo"
          />
        </Link>
        <div className="lg-nav-item-con">{this.renderListItems()}</div>
        <div className="sm-nav-item-con">
          <button
            type="button"
            className="toggle-button"
            onClick={this.onToggleNavItems}
          >
            <GoThreeBars className="nav-icon" />
          </button>
          <div className="toggle-con">
            {displayButton && this.renderListItems()}
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
