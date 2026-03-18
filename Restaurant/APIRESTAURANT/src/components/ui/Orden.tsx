import React, { useEffect, useState, useContext } from 'react';
import { Pedido, ItemPedido } from '../../types';
import { FirebaseContext } from '../../firebase';
import { collection, doc, updateDoc } from 'firebase/firestore';


const Orden = ({ pedido }: { pedido: Pedido }) => {
    const [tiempoEntrega, setTiempoEntrega] = useState<number>(0);
    const { firebaseApp } = useContext(FirebaseContext);



    const definirTiempo = async (id: string, tiempo: number) => {
        console.log(`Definiendo tiempo de entrega para el pedido ${id}: ${tiempo} minutos`);
        // guardar el tiempo de entrega en Firestore

        try{
            const pedidosCollectionRef = collection(firebaseApp.db, 'pedidos');
            const pedidoDocRef = doc(pedidosCollectionRef,id)

            await updateDoc(pedidoDocRef, {
                tiempoEntrega: tiempo, // Actualiza el campo tiempoEntrega del pedido
            })
        }catch (error) {
            console.error('Error al definir el tiempo de entrega:', error);
        }

    }

    return (
        <div className='sm:w-1/2 lg:w-1/3 xl:w-1/4 p-3'>
            <div className='p-3 shadow-md bg-white rounded-lg'>
                <h1 className='text-yellow-600 font-bold text-xl mb-2'>{pedido.id}</h1>
                {pedido.total.map((item: ItemPedido) => (
                    <div key={item.id}>
                        <p className='text-gray-600'>{item.cantidad} {item.nombre}</p>
                        <p className='text-gray-600 font-bold'> Total a pagar: ${item.total}</p>
                    </div>
                ))}
            </div>
            {pedido.tiempoEntrega === 0 && (
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm'>Tiempo de entrega</label>
                    <input
                        type="number"
                        min="1"
                        max="20"
                        placeholder="20"
                        className='shadow border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        onChange={e => setTiempoEntrega(Number(e.target.value))}
                    />
                    <button
                        onClick={() => definirTiempo(pedido.id, tiempoEntrega)}
                        type="submit"
                        className='bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white'
                    >
                        Definir Tiempo
                    </button>
                    {/* presionar a true completado */}
                </div>
            )}

            {pedido.tiempoEntrega > 0 &&
                <>
                <button
                    onClick={async () => {
                        const pedidosCollectionRef = collection(firebaseApp.db, 'pedidos');
                        const pedidoDocRef = doc(pedidosCollectionRef, pedido.id);
                        await updateDoc(pedidoDocRef, { completado: true });
                    }}
                    type="submit"
                    className='bg-green-600 hover:bg-green-700 w-full mt-5 p-2 text-white'
                >
                    Marcar como Completado
                </button>
                    <div className='mb-4'>
                        <p className='text-gray-600'>Tiempo de entrega: {pedido.tiempoEntrega} minutos</p>
                    </div>
                </>
            }

        </div>
    )
}

export default Orden
