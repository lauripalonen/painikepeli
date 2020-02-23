import React from 'react'

const UserForm = ({
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
}) => {
  return (
    <div>
      <h2>Account</h2>
      <form>

        <label htmlFor="username">Username </label>
        <br/>
        <input
          type="text"
          value={username}
          name="Username"
          onChange={handleUsernameChange}
        />
        <br/>
        <label htmlFor="password">Password </label>
        <br/>
        <input
          type="password"
          value={password}
          name="Password"
          onChange={handlePasswordChange}
        />

      </form>
    </div>
  )
}

export default UserForm