import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FirebaseContext } from '../../firebase';
import { collection, onSnapshot, QuerySnapshot, DocumentData } from 'firebase/firestore';
import PlatilloItem from '../ui/PlatilloItem';
import { Platillo } from '../../types';

const Menu: React.FC = () => {
    const { firebaseApp } = useContext(FirebaseContext);
    const [platillos, setPlatillos] = useState<Platillo[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(firebaseApp.db, 'platillos'),
            (snapshot: QuerySnapshot<DocumentData>) => {
                const platillosData = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Platillo[];
                setPlatillos(platillosData);
                console.log(platillosData);
            },
            (error) => {
                console.error("Error al obtener los platillos:", error);
            }
        );

        return () => unsubscribe(); // Limpia el listener al desmontar el componente
    }, [firebaseApp]);

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Menú</h1>
            <Link
                to="/nuevo-platillo"
            >
                <button
                    type="button"
                    className="bg-blue-800 px-5 py-2 font-bold text-white uppercase rounded hover:bg-blue-900"
                >
                    Nuevo Platillo
                </button>
            </Link>

            <div className="mt-5">
                {platillos.length > 0 ? (
                    <div className="space-y-4">
                        {platillos.map(platillo => (
                            <PlatilloItem key={platillo.id} platillo={platillo} />
                        ))}
                    </div>
                ) : (
                    <p>No hay platillos disponibles.</p>
                )}
            </div>
        </>
    );
};

export default Menu;
