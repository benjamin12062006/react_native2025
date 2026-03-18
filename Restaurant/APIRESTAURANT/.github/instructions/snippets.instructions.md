---
applyTo: '**'
---
# Snippet Instructions

## 1. Inicio de secuencia
- Se inicia con la tecla **cmd** para ejecutar un snippet.
- **Ejecución directa**: Si el usuario especifica tipo y número directamente (ejemplo: `cmd a:1` o `cmd a,1`), se ejecuta inmediatamente sin mostrar previsualización para ahorrar tokens de IA.

## 2. Selección rápida de tipo de snippet
1. Cada **tipo** de snippet tiene una letra del abecedario asignada:
   - a: use
   - b: firebase
2. Se muestran los tipos disponibles con su letra asignada.
3. El usuario selecciona el tipo escribiendo la letra correspondiente.

## 3. Selección de cantidad
- Se pregunta al usuario si desea seleccionar **solo uno** o **varios** snippets.
  - Si elige uno, continúa con la selección individual.
  - Si elige varios, puede seleccionar múltiples tipos y snippets en una sola línea (ejemplo: a:1, b:1).

## 4. Selección rápida de snippet (variables)
1. Cada **snippet** dentro de un tipo tiene un número asignado.
2. Se muestran los snippets disponibles para el tipo seleccionado, numerados.
3. Debajo de cada snippet, se muestra en formato de código cómo quedaría el snippet en el código actual (previsualización real del archivo abierto en el editor).
4. El usuario selecciona el snippet escribiendo el número correspondiente.

## 5. Selección múltiple
- Si el usuario quiere seleccionar varios tipos de snippet:
  1. Se indica la letra para el tipo y el número para el snippet, por ejemplo: a:1, b:1
  2. El usuario puede seleccionar varios en una sola línea.
  3. Para cada selección, se muestra la previsualización de cómo quedaría el código en el archivo actual.

## 6. Restricciones y cambios de tipo
- Una vez asignado el tipo, solo se pueden ejecutar variables de ese tipo hasta que se cambie.
- Se pregunta si desea cambiar el tipo y se muestran los tipos disponibles.

## 7. Manejo de errores
- Si el tipo no existe, se informa: "No existe un snippet con el tipo: {tipo}" y se muestran los tipos disponibles.

## 8. Finalización
- La tecla **t** finaliza el uso de los Snippet Instructions.

---

# Abreviaciones de texto
- **import**: importa lo siguiente en mi código

---

# Tipos y variables de snippets

## a: use
1. useBasic: Importación y uso básico de useEffect y useState con un useEffect vacío.
   ```tsx
   import {useEffect, useState} from 'react';

   useEffect(() => {
     
   }, []);
   ```
2. useComplejo: Importación de useEffect, useState y useContext con un useEffect vacío.
   ```tsx
   import {useEffect, useState, useContext} from 'react';

   useEffect(() => {
     
   }, []);
   ```

## b: firebase
1. firebaseContext:
   - import: FirebaseContext
   - Crear en la función actual el contexto de firebase:
   ```tsx
   import { FirebaseContext } from '...';
    const { firebaseApp } = useContext(FirebaseContext);
   ```
