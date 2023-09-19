import React, { useEffect } from 'react';

function AdminTable() {
  useEffect(() => {
    const container = document.getElementById('container');
    if (container) {
      container.style.alignItems = 'flex-start';
    }

    return () => {
      if (container) {
        container.style.justifyContent = 'center'; 
      }
    };
  }, []);

  return(
    <table className="start">
      <tr>
        <th>Sr. No.</th>
        <th>Team Name</th>
        <th>Team Email</th>
        <th>Reschedule</th>
      </tr>
    </table>
  );
}

export default AdminTable;
