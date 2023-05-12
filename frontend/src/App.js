import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const backendURL = process.env.REACT_APP_BACKEND_URL || "http://127.0.0.1:5000"
  useEffect(() => {
    fetch(`${backendURL}/users`)
      .then((res) => {
        return res.json()
      })
      .then((data) => {
        setUsers(data)
      })
  }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const formData = new FormData(event.target);
  //   const user = {
  //     ho_ten: formData.get('ho_ten'),
  //     nam_sinh: formData.get('nam_sinh'),
  //     truong: formData.get('truong')
  //   };

  //   fetch(`${backendURL}/user`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(user)
  //   })
  //     .then(res => res.json())
  //     .then(data => {
  //       console.log(data);
  //       // Do something with the response, e.g. show a success message
  //     });
  // };

  return (
    <div>
      <h1>List of Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <div>{user.ho_ten}</div>
            <div>{user.nam_sinh}</div>
            <div>{user.truong}</div>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
