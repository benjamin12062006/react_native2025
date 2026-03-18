export const OBTENER_PRODUCTOS_EXITO = 'OBTENER_PRODUCTOS_EXITO';
export const SELECCIONAR_PRODUCTO = 'SELECCIONAR_PRODUCTO';
export const CONFIRMAR_ORDENAR_PLATILLO = 'CONFIRMAR_ORDENAR_PLATILLO';
export const ELIMINAR_PRODUCTO = 'ELIMINAR_PRODUCTO';
export const ACTUALIZAR_PRODUCTO = 'ACTUALIZAR_PRODUCTO';
export const MOSTRAR_RESUMEN= 'MOSTRAR_RESUMEN';
export const PEDIDO_ORDENADO = 'PEDIDO_ORDENADO';
export const PEDIDO_REALIZADO = 'PEDIDO_REALIZADO';

export interface Platillo {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  existencia: boolean;
  imagen: string;
  [key:string] : any;
}

// Nuevo tipo para platillos seleccionados (sin existencia)
export interface PlatilloSeleccionado extends Platillo {
  id: string;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
  [key:string] : any;
}