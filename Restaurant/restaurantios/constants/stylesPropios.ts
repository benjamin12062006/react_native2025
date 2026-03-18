// Tipos base para diferentes categorías de estilos
export type LayoutStyles = {
    container: string;
    centrado: string;
    columna: string;
    fila: string;
}

export type ButtonStyles = {
    primario: string;
    secundario: string;
    texto: string;
    textoBoton: string;
}

export type ColorStyles = {
    fondoPrimario: string;
    fondoSecundario: string;
    textoPrimario: string;
    textoSecundario: string;
}

// Tipo principal que combina todos los estilos
export type StylesPropios = {
    layout: LayoutStyles;
    buttons:ButtonStyles;
    colors: ColorStyles;
}


// Constantes de layout sin comillas
const LAYOUT_CONTAINER = `flex-1 bg-white`;
const LAYOUT_CENTRADO = `flex-1 justify-center items-center`;
const LAYOUT_COLUMNA = `flex flex-col`;
const LAYOUT_FILA = `flex flex-row`;
// Constantes de botones sin comillas
const BUTTON_PRIMARIO = `rounded-full px-7 py-2 shadow-lg bg-white active:bg-blue-600 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg active:scale-95`;
const BUTTON_SECUNDARIO = `rounded-full px-7 py-1 shadow-md bg-slate-300 hover:bg-slate-200 active:bg-slate-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg active:scale-95`;
const BUTTON_TEXTO = `rounded-lg px-12 py-2 bg-slate-200 active:bg-slate-100`;
const BUTTON_TEXTO_BOTON = `text-lg font-bold text-dark uppercase tracking-wide`;

// Constantes de colores sin comillas
const COLOR_FONDO_PRIMARIO = `bg-blue-500`;
const COLOR_FONDO_SECUNDARIO = `bg-gray-100`;
const COLOR_TEXTO_PRIMARIO = `text-gray-900`;
const COLOR_TEXTO_SECUNDARIO = `text-gray-600`;


// Implementación de los estilos para NuevaOrden
const stylesPropios: StylesPropios = {
    layout: {
        container: LAYOUT_CONTAINER,
        centrado: LAYOUT_CENTRADO,
        columna: LAYOUT_COLUMNA,
        fila: LAYOUT_FILA,
    },
    buttons: {
        primario: BUTTON_PRIMARIO,
        secundario: BUTTON_SECUNDARIO,
        texto: BUTTON_TEXTO,
        textoBoton: BUTTON_TEXTO_BOTON,
    },
    colors: {
        fondoPrimario: COLOR_FONDO_PRIMARIO,
        fondoSecundario: COLOR_FONDO_SECUNDARIO,
        textoPrimario: COLOR_TEXTO_PRIMARIO,
        textoSecundario: COLOR_TEXTO_SECUNDARIO,
    }
};

export default stylesPropios;