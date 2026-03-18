import { StyleSheet } from 'react-native';
import colors from './colors';

/**
 * Estilos para componentes reutilizables
 */
export const componentStyles = StyleSheet.create({
  // Estilos de contenedores
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  
  centeredContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  
  card: {
    backgroundColor: colors.backgroundSecondary,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  
  // Estilos de botones
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  buttonWide: {
    width: '100%',
  },
  
  buttonText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  // Enlaces y texto
  link: {
    marginVertical: 8,
  },
  
  linkText: {
    color: colors.primary,
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 15,
  },
  
  text: {
    color: colors.textPrimary,
    fontSize: 16,
    marginBottom: 10,
  },
  
  // Listas
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  // Iconos
  icon: {
    marginRight: 10,
  },
  
  // Headers y footers
  header: {
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  
  footer: {
    backgroundColor: colors.backgroundSecondary,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  
  // Secciones
  section: {
    marginBottom: 25,
  },
  
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.textAccent,
    marginBottom: 15,
  },
});

export default componentStyles;
