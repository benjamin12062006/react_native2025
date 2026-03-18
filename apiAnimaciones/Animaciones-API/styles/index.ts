/**
 * Exportación central de todos los estilos
 * Permite importar con: import { colors, formStyles, componentStyles } from '@/styles';
 */

export { colors, defaultTheme, lightTheme } from './colors';
export { formStyles } from './forms';
export { componentStyles } from './components';

// También exporta los módulos completos como default para imports individuales
import colors from './colors';
import formStyles from './forms';
import componentStyles from './components';

export default {
  colors,
  formStyles,
  componentStyles
};
