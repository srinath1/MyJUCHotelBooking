import React from 'react'

const RegisterForm = ({handleSubmit,name,setName,password,setPassword,email,setEmail}) => {
  return (
    
     <form onSubmit={handleSubmit} className="mt-2">
      <div className="form-group mb-2">
        <label className="form-label">Your name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

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

      <button className="btn btn-primary" disabled={!name ||!email || !password}>Submit</button>
    </form>
    
  )
}

export default RegisterForm