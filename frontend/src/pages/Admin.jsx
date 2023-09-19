import React from 'react';
import LoginCard from '../components/LoginCard';
import AdminTable from '../components/AdminTable';
import '../styles/admin.css';

function Admin() {
  return (
    <div id="parent-container">
      <div id="container">
        <AdminTable />
      </div>
    </div>
  );
}

export default Admin;
