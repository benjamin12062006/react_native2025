import { StyleSheet } from 'react-native';
import colors from './colors';

/**
 * Estilos para formularios reutilizables
 */
export const formStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
  },
  
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center',
  },
  
  campo: {
    marginBottom: 20,
  },
  
  label: {
    color: colors.textPrimary,
    marginBottom: 10,
    fontSize: 16,
  },
  
  input: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  
  select: {
    backgroundColor: colors.backgroundSecondary,
    color: colors.textPrimary,
    padding: 15,
    borderRadius: 5,
    fontSize: 16,
  },
  
  button: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  
  buttonSecondary: {
    backgroundColor: colors.secondary,
  },
  
  buttonSuccess: {
    backgroundColor: colors.success,
  },
  
  buttonDanger: {
    backgroundColor: colors.danger,
  },
  
  buttonText: {
    color: colors.background,
    fontSize: 16,
    fontWeight: 'bold',
  },
  
  buttonTextLight: {
    color: colors.textPrimary,
  },
  
  scrollView: {
    width: '100%',
  },
  
  errorText: {
    color: colors.danger,
    fontSize: 14,
    marginTop: 5,
  },
});

export default formStyles;
