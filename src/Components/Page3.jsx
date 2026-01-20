import React, { useEffect, useState } from 'react';

export default function Page3() {
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
