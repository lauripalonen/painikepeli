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
    <div>
      <h2>Player account</h2>
      <form className="inner-form">
        <label htmlFor="username">Username </label>
        <br />
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          className="input-field"
        />
        <br />
        <br />
        <label htmlFor="password">Password </label>
        <br />
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          className="input-field"
        />
      </form>
      <div className="button-block">
        <button onClick={handleLogin} className="normal-button">LOG IN</button> or <button onClick={handleSignUp} className="normal-button">SIGN UP</button>
      </div>
      <p style={{ textAlign: 'center' }}>{notification}</p>
    </div>
  )
}

export default UserForm