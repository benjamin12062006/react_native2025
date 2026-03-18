import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from '../../firebase';
import { collection, onSnapshot, QuerySnapshot, DocumentData, query, where } from 'firebase/firestore';
import Orden from '../ui/Orden';
import { ItemPedido, Pedido } from '../../types';


const Ordenes: React.FC = () => {
    const { firebaseApp } = useContext(FirebaseContext);
    const [pedidos, setPedidos] = useState<Pedido[]>([]);

    useEffect(() => {
        const pedidosCollectionRef = collection(firebaseApp.db, 'pedidos');
        const q = query(pedidosCollectionRef, where("completado", "==", false));

        const snapshot = onSnapshot(q, manejarSnapshot, err => console.log(err))

        // Asegurarse de limpiar la suscripción al desmontar el componente
        return () => snapshot();


    }, [firebaseApp]);

    function manejarSnapshot(snapshot: QuerySnapshot<DocumentData>) {
        const pedidos = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            };
        }) as Pedido[];
        setPedidos(pedidos);
        console.log('Pedidos obtenidos:', pedidos);
        // Aquí puedes hacer algo con los pedidos obtenidos, como guardarlos en el estado
    }


    return (
      <>
        <h1 className="text-3xl font-light mb-4">Órdenes</h1>
        
        <div className='sm-flex sm:flex-wrap -mx-3'> {/*  */}
            {pedidos.map(pedido =>(
                <Orden
                    key={pedido.id}
                    pedido={pedido}
                />
            ))}            

        </div>
      </>
    );
}

export default Ordenes;






