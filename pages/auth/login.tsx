import Router from 'next/router';
import React from "react";
import { useState } from "react";


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  function handleSignin(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    const body = {
      username,
      password
    }
    
    fetch('/api/auth/login', {
      body: JSON.stringify(body),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      throw res;
    })
    .then(body => {
      const { message : _, jwtToken } = body;
      localStorage.setItem('jwt', jwtToken);
      Router.push(`/blog`);
    })
    .catch(error => console.error(error))
  }

  return <div>
    <input type="text" placeholder="Username" value={username}
      onChange={event => setUsername(event.target.value)}
    />
    <input type="password" placeholder="Password" value={password}
      onChange={event => setPassword(event.target.value)}
    />
    <button onClick={handleSignin}>Sign In</button>
  </div>
}