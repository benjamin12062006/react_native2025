import stylesPropios, { StylesPropios } from "@/constants/stylesPropios";

const useEstilosGlobales = () => {
    const { layout, buttons, colors }: StylesPropios = stylesPropios;
    
    return {
        // Estilos de layout
        containerPrincipal: layout.container,
        centrado: layout.centrado,
        columna: layout.columna,
        fila: layout.fila,
        // Estilos de botones
        botonPrimario: buttons.primario,
        botonSecundario: buttons.secundario,
        textoBoton: buttons.textoBoton,
        // Estilos de colores
        fondoPrimario: colors.fondoPrimario,        
        fondoSecundario: colors.fondoSecundario,
        textoPrimario: colors.textoPrimario,
        textoSecundario: colors.textoSecundario,    
    };
};

export default useEstilosGlobales;
