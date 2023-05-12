import React, { useState, useEffect } from 'react';

function AddUser({ backendURL, handleAddUser }) {
    const [user, setUser] = useState({
        ho_ten: '',
        nam_sinh: '',
        truong: ''
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`${backendURL}/user`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            setUser({
                ho_ten: '',
                nam_sinh: '',
                truong: ''
            });
            handleAddUser(data);
        });
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div>
            <h2>Add a User</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="ho_ten">Họ tên:</label>
                    <input type="text" id="ho_ten" name="ho_ten" value={user.ho_ten} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="nam_sinh">Năm sinh:</label>
                    <input type="text" id="nam_sinh" name="nam_sinh" value={user.nam_sinh} onChange={handleInputChange} />
                </div>
                <div>
                    <label htmlFor="truong">Trường:</label>
                    <input type="text" id="truong" name="truong" value={user.truong} onChange={handleInputChange} />
                </div>
                <button type="submit">Save</button>
            </form>
        </div>
    );
}

export default AddUser;
