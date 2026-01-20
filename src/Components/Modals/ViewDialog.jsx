import React from "react";

export default function ViewDialog({ open, user, onClose }) {
  if (!open || !user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded w-96">
        <h2 className="text-xl flex font-bold mb-4">User Details</h2>

        <p><b>ID:</b> {user.id}</p>
        <p><b>Name:</b> {user.firstName}</p>
    <p><b>Email:</b> {user.email}</p>
    <p><b>Phone:</b> {user.phone}</p>
        <p><b>Age:</b> {user.age}</p>
          <p><b>BloodGroup:</b> {user.bloodGroup}</p>
           <p><b>Birthday:</b> {user.birthDate}</p>
            <p><b>Eyecolor:</b> {user.eyeColor}</p>
            <p><b>Country:</b> {user.address.country} </p>
            <p><b>Username:</b> {user.username}</p>
             <p><b>Password:</b> {user.password}</p>

        <div className="text-right mt-4">
          <button
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-1 rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
