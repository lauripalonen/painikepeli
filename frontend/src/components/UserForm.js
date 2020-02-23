import React from 'react'

const UserForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Player account</h2>
      <form className="inner-form">
        <label htmlFor="username">Username </label>
        <br/>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
          className="input-field"
        />
        <br/>
        <br />
        <label htmlFor="password">Password </label>
        <br/>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
          className="input-field"
        />
      </form>
    </div>
  )
}

export default UserForm