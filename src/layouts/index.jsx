import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

function Layout() {
    return (
        <div>
            <Navbar />
            <main className="bg-white min-h-[92vh] shadow-lg mt-[7.2vh]">
                <Outlet />
            </main>
        </div>
    );
};

export default Layout;
