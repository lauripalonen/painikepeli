import React from 'react'

const UserForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  handleLogin,
  handleSignUp,
  notification
}) => {
  return (
    <div className="account-block">
      <h2>Player account</h2>
      <form className="user-form">
        <label htmlFor="username">Username </label>
        <br />
        <input
          className="input-field"
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
        <br />
        <br />
        <label htmlFor="password">Password </label>
        <br />
        <input
          className="input-field"
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />
      </form>
      <div>
        <button onClick={handleLogin} className="normal-button">LOG IN</button> or <button onClick={handleSignUp} className="normal-button">SIGN UP</button>
      </div>
      <p style={{ textAlign: 'center' }}>{notification}</p>
    </div>
  )
}

export default UserForm