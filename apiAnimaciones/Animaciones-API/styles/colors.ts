/**
 * Interfaces para tipado de colores
 */

// Interfaz para colores básicos de la aplicación
export interface ColorPalette {
  // Colores base
  background: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  
  // Colores de texto
  textPrimary: string;
  textSecondary: string;
  textAccent: string;
  
  // Colores de botones/acciones
  primary: string;
  secondary: string;
  success: string;
  danger: string;
  
  // Bordes y divisores
  border: string;
}

// Interfaz para temas con colores adicionales requeridos por React Navigation
export interface ThemeColors extends ColorPalette {
  card?: string;
  text?: string;
  notification?: string;
  [key: string]: string | undefined;
}

// Interfaz para tema completo
export interface AppTheme {
  colors: ThemeColors;
  [key: string]: any;
}

/**
 * Colores centralizados para la aplicación
 */
export const colors: ColorPalette = {
  // Colores base
  background: '#25292e',
  backgroundSecondary: '#2c3035',
  backgroundTertiary: '#33384d',
  
  // Colores de texto
  textPrimary: '#FFFFFF',
  textSecondary: '#A0A0A0',
  textAccent: '#FFD700', // Dorado
  
  // Colores de botones/acciones
  primary: '#007AFF',
  secondary: '#ffd33d',
  success: '#4CAF50',
  danger: '#e74c3c',
  
  // Bordes y divisores
  border: '#3a3f46',
};

/**
 * Tema claro (para futuro soporte de tema claro/oscuro)
 */
export const lightTheme: AppTheme = {
  colors: {
    ...colors,
    background: '#f5f5f5',
    backgroundSecondary: '#e8e8e8',
    backgroundTertiary: '#d0d0d0',
    textPrimary: '#212121',
    textSecondary: '#757575',
    border: '#cccccc',
  }
};

/**
 * Tema por defecto (oscuro)
 */
export const defaultTheme: AppTheme = {
  colors: {
    ...colors,
    // Propiedades adicionales requeridas por React Navigation
    card: colors.backgroundSecondary,
    text: colors.textPrimary,
    notification: colors.danger,
  }
};

export default colors;
