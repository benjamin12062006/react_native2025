// Interfaces compartidas para la aplicación del restaurante

export interface Platillo {
    id: string;
    nombre: string;
    precio: number;
    categoria: string;
    descripcion: string;
    imagen: string;
    existencia: boolean;
}

// Interface para nuevo platillo (sin id ya que se genera automáticamente)
export interface NuevoPlatillo {
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    descripcion: string;
    existencia: boolean;
}

export interface ItemPedido {
    cantidad: number;
    categoria: string;
    descripcion: string;
    id: string;
    imagen: string;
    nombre: string;
    precio: number;
    total: number;
    // poner su key 
    [key: string]: string | number; 
}

export interface Pedido {
    id: string;
    completado: boolean;
    creado: number;
    tiempoEntrega: number;
    total: ItemPedido[];
}
