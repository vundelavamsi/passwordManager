import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './index.css'

const colorHexCodes = ['#0b69ff', '#94a3b8', '#b6c3ca']

class PasswordManager extends Component {
  state = {
    websiteInput: '',
    usernameInput: '',
    passwordInput: '',
    passwordsList: [],
    isChecked: false,
  }

  deletePassword = id => {
    const {passwordsList} = this.state
    const filteredPassword = passwordsList.filter(
      eachItem => eachItem.id !== id,
    )
    this.setState({passwordsList: filteredPassword})
  }

  onChecked = () => {
    this.setState(prevState => ({isChecked: !prevState.isChecked}))
  }

  onChangeWebsite = event => {
    this.setState({websiteInput: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({usernameInput: event.target.value})
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  onSearchPassword = event => {
    const searchValue = event.target.value
    const {passwordsList} = this.state
    const filteredPasswords = passwordsList.filter(eachItem =>
      eachItem.website.toLowerCase().includes(searchValue.toLowerCase()),
    )
    this.setState({passwordsList: filteredPasswords})
  }

  onAddNewPassword = event => {
    event.preventDefault()
    const {websiteInput, usernameInput, passwordInput} = this.state
    const newPasswordDetails = {
      id: uuidv4(),
      website: websiteInput,
      username: usernameInput,
      password: passwordInput,
    }
    this.setState(prevState => ({
      passwordsList: [...prevState.passwordsList, newPasswordDetails],
      websiteInput: '',
      usernameInput: '',
      passwordInput: '',
    }))
  }

  render() {
    const {
      websiteInput,
      usernameInput,
      passwordInput,
      passwordsList,
      isChecked,
    } = this.state

    const passwordLength = passwordsList.length !== 0

    return (
      <div className="app-container">
        <div className="password-manager-image-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="logo"
          />
        </div>
        <div className="password-input-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="password-manager-image"
          />
          <form className="add-password-container">
            <h1 className="password-name">Add New Password</h1>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Website"
                className="input-item"
                value={websiteInput}
                onChange={this.onChangeWebsite}
              />
            </div>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-logo"
              />
              <input
                type="text"
                placeholder="Enter Username"
                className="input-item"
                value={usernameInput}
                onChange={this.onChangeUsername}
              />
            </div>
            <div className="input-item-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-logo"
              />
              <input
                type="password"
                placeholder="Enter Password"
                className="input-item"
                value={passwordInput}
                onChange={this.onChangePassword}
              />
            </div>
            <div className="add-button-container">
              <button
                className="add-button"
                type="submit"
                onClick={this.onAddNewPassword}
              >
                Add
              </button>
            </div>
          </form>
        </div>
        <div className="your-password-container">
          <div className="count-and-search-container">
            <div className="count-container">
              <h1 className="your-password-count-heading">Your Passwords</h1>
              <p className="your-password-count">{passwordsList.length}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-logo"
              />
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                onChange={this.onSearchPassword}
              />
            </div>
          </div>
          <hr className="line" />
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="check-input"
              id="checkbox"
              checked={isChecked}
              onChange={this.onChecked}
            />
            <label htmlFor="checkbox" className="label-heading">
              Show Passwords
            </label>
          </div>
          {!passwordLength && (
            <div className="no-password-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password-image"
              />
              <p className="no-password-para">No Passwords</p>
            </div>
          )}
          {passwordLength && (
            <ul className="passwords-items-container">
              {passwordsList.map(eachPassword => (
                <PasswordItem
                  key={eachPassword.id}
                  passwordItem={eachPassword}
                  colorHexCodes={colorHexCodes}
                  isChecked={isChecked}
                  deletePassword={this.deletePassword}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default PasswordManager
