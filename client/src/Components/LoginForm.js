import React from 'react'

const LoginForm = ({handleSubmit,password,setPassword,email,setEmail}) => {
  return (
    
     <form onSubmit={handleSubmit} className="mt-2">
      

      <div className="form-group mb-2">
        <label className="form-label">Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="form-group mb-2">
        <label className="form-label">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button className="btn btn-primary" disabled={!email || !password}>Submit</button>
    </form>
    
  )
}

export default LoginForm