import React, { useEffect, useState } from "react";

export default function Page1() {
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);

  // Modal states
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    id: null,
    firstName: "",
    email: "",
  });

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

    setShowEditModal(false);
    resetForm();
  }

  // DELETE
  async function deleteUser() {
    await fetch(`https://dummyjson.com/users/${selectedUserId}`, {
      method: "DELETE",
    });

    setUsersData(usersData.filter((user) => user.id !== selectedUserId));
    setShowDeleteModal(false);
  }

  function resetForm() {
    setFormData({ id: null, firstName: "", email: "" });
  }

  return (
    <div className="min-h-screen bg-blue-200 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4 text-center">
          User Data API (CRUD with Popup)
        </h1>

        {/* ADD FORM */}
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
          <button
            onClick={addUser}
            className="bg-blue-600 text-white px-4 rounded"
          >
            Add
          </button>
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
                      onClick={() => {
                        setFormData(user);
                        setShowEditModal(true);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUserId(user.id);
                        setShowDeleteModal(true);
                      }}
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

      {/* EDIT MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-96">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>

            <input
              className="border p-2 w-full mb-3"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-4"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateUser}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}

      {/* DELETE MODAL */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Confirm Delete</h2>
            <p className="mb-6">Are you sure you want to delete this user?</p>

            <div className="flex justify-center gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
