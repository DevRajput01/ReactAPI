import React, { useEffect, useState } from 'react';

export default function Page1() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    const url = "https://dummyjson.com/users";
    let response = await fetch(url);
    response = await response.json();
    setUsersData(response.users);
  }

  return (
    <div className="p-6">
  <h1 className="text-2xl font-bold mb-4">Fetch data from API</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full border border-gray-300">
      <thead className="bg-gray-100">
        <tr>
          <th className="border px-4 py-2 text-left">First Name</th>
          <th className="border px-4 py-2 text-left">Last Name</th>
          <th className="border px-4 py-2 text-left">Age</th>
          <th className="border px-4 py-2 text-left">Email</th>
          <th className="border px-4 py-2 text-left">Phone</th>
           <th className="border px-4 py-2 text-left">BloodGroup</th>
        </tr>
      </thead>

      <tbody>
        {usersData.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="border px-4 py-2">{user.firstName}</td>
            <td className="border px-4 py-2">{user.lastName}</td>
            <td className="border px-4 py-2">{user.age}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.phone}</td>
            <td className="border px-4 py-2">{user.bloodGroup}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  );
}


import React, { useEffect, useState } from "react";

export default function Page1() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    email: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    getUserData();
  }, []);

  // READ
  async function getUserData() {
    setLoading(true);
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();
    setUsersData(data.users);
    setLoading(false);
  }

  // CREATE
  async function addUser() {
    if (!formData.firstName || !formData.email) return;

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const newUser = await response.json();
    setUsersData([newUser, ...usersData]);

    resetForm();
  }

  // DELETE
  async function deleteUser(id) {
    await fetch(`https://dummyjson.com/users/${id}`, {
      method: "DELETE",
    });

    setUsersData(usersData.filter((user) => user.id !== id));
  }

  // EDIT (Load data into form)
  function editUser(user) {
    setFormData(user);
    setIsEditing(true);
  }

  // UPDATE
  async function updateUser() {
    const response = await fetch(
      `https://dummyjson.com/users/${formData.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      }
    );

    const updatedUser = await response.json();

    setUsersData(
      usersData.map((user) =>
        user.id === updatedUser.id ? updatedUser : user
      )
    );

    resetForm();
  }

  function resetForm() {
    setFormData({ id: null, firstName: "", email: "" });
    setIsEditing(false);
  }

  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          User CRUD with API
        </h1>

        {/* FORM */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="First Name"
            className="border p-2 flex-1"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 flex-1"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />

          {isEditing ? (
            <button
              onClick={updateUser}
              className="bg-green-600 text-white px-4 rounded"
            >
              Update
            </button>
          ) : (
            <button
              onClick={addUser}
              className="bg-blue-600 text-white px-4 rounded"
            >
              Add
            </button>
          )}
        </div>

        {/* TABLE */}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="w-full border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">ID</th>
                <th className="border p-2">Name</th>
                <th className="border p-2">Email</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersData.map((user) => (
                <tr key={user.id}>
                  <td className="border p-2">{user.id}</td>
                  <td className="border p-2">{user.firstName}</td>
                  <td className="border p-2">{user.email}</td>
                  <td className="border p-2 space-x-2">
                    <button
                      onClick={() => editUser(user)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
