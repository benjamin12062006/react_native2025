import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => {
    return (
        <div className="md:w-2/5 xl:w-1/5 bg-gray-800">
            <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold">RestaurantApp</p>

                <p className="mt-3 text-gray-600">Administra tu restaurant en las siguientes opciones:</p>

                <nav className="mt-10">
                    <NavLink className={({ isActive }) => isActive ? "text-yellow-500 p-1 block" : "p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"} end to="/">Órdenes</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-yellow-500 p-1 block" : "p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"} end to="/menu">Menú</NavLink>
                    <NavLink className={({ isActive }) => isActive ? "text-yellow-500 p-1 block" : "p-1 text-gray-400 block hover:bg-yellow-500 hover:text-gray-900"} end to="/nuevo-platillo">Nuevo Platillo</NavLink>
                </nav>
            </div>
        </div>
    );
}

export default Sidebar;
