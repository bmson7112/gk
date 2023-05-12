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
        const usersWithId = data.map((user, index) => ({ ...user, id: index }));
        setUsers(usersWithId)
      })
  }, []);

  const handleDelete = (userId) => {
    fetch(`${backendURL}/delete/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: userId })
    })
      .then(res => res.json())
      .then(data => {
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
        console.log(data);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const user = {
      Name: formData.get('Name'),
      YearOfBirth: formData.get('YearOfBirth'),
      School: formData.get('School')
    };

    fetch(`${backendURL}/user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
      });
  };

  return (
    <div>
      <h1>List of Users</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date of Birth</th>
            <th>School</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.Name}</td>
              <td>{user.YearOfBirth}</td>
              <td>{user.School}</td>
              <td><button onClick={() => handleDelete(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Add a User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Name">Họ tên:</label>
          <input type="text" id="Name" name="Name" />
        </div>
        <div>
          <label htmlFor="YearOfBirth">Năm sinh:</label>
          <input type="text" id="YearOfBirth" name="YearOfBirth" />
        </div>
        <div>
          <label htmlFor="School">Trường:</label>
          <input type="text" id="School" name="School" />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default App;
