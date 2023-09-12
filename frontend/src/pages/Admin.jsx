import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Admin() {
    return (
        <div className="parent-container">
            <div className="container">
                <table>
                    <td>Sr. No.</td>
                    <td>Check</td>
                    <td>Team Name</td>
                    <td>Email</td>
                    <td>Time of Arrival</td>
                </table>
            </div>
        </div>
    );
}
