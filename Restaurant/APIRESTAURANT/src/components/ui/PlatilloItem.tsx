import React from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { FirebaseContext } from '../../firebase';
import { Platillo } from '../../types';

const PlatilloItem: React.FC<{ platillo: Platillo }> = ({ platillo }) => {
    const { firebaseApp } = React.useContext(FirebaseContext);

    const actualizarDisponibilidad = async (id: string, disponibilidad: boolean) => {
        try {
            const platilloRef = doc(firebaseApp.db, 'platillos', id); // Obtiene la referencia al documento
            await updateDoc(platilloRef, { existencia: disponibilidad }); // Actualiza el campo "existencia"
            console.log(`Disponibilidad actualizada para el platillo con ID: ${id}`);
        } catch (error) {
            console.error("Error al actualizar la disponibilidad:", error);
        }
    };

    return (
        <div className="flex items-center border-b border-gray-200 py-4">
            {/* Imagen del platillo */}
            <div className="w-1/3">
                {platillo.imagen ? (
                    <img
                        src={platillo.imagen}
                        alt={platillo.nombre}
                        className="w-32 h-32 object-cover rounded-lg shadow-md" // Estilos para cuadrado perfecto
                    />
                ) : (
                    <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-lg">
                        <p className="text-gray-500">Sin imagen</p>
                    </div>
                )}
            </div>

            {/* Contenido del platillo */}
            <div className="w-2/3 pl-4">
                <h2 className="text-xl font-bold">{platillo.nombre}</h2>
                <p className="text-gray-600">Categoría: {platillo.categoria}</p>
                <p className="text-gray-600">Precio: ${platillo.precio}</p>
                <p className="text-gray-600 mt-2">{platillo.descripcion}</p>
                <select
                    value={platillo.existencia ? 'disponible' : 'no-disponible'}
                    onChange={(e) =>
                        actualizarDisponibilidad(platillo.id, e.target.value === 'disponible')
                    }
                    className="mt-2 border border-gray-300 rounded-lg p-2"
                >
                    <option value="disponible">Disponible</option>
                    <option value="no-disponible">No disponible</option>
                </select>
            </div>
        </div>
    );
};

export default PlatilloItem;
