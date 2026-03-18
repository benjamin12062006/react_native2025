# Instrucciones de Contexto para UpTask GraphQL

## Información del Proyecto

### Descripción
UpTask es una aplicación de gestión de tareas desarrollada con GraphQL, Apollo Server y MongoDB. El proyecto implementa un backend completo para manejo de usuarios, proyectos y tareas con autenticación JWT.

### Stack Tecnológico
- **Backend**: Node.js con Apollo Server
- **Base de Datos**: MongoDB con Mongoose
- **Autenticación**: JWT (JSON Web Tokens)
- **Encriptación**: bcryptjs
- **GraphQL**: Schema y resolvers personalizados

## Estructura del Proyecto

```
/
├── index.js              # Punto de entrada del servidor
├── package.json          # Dependencias y scripts
├── variables.env         # Variables de entorno
├── config/
│   └── db.js             # Configuración de base de datos
├── db/
│   ├── schema.js         # Schema de GraphQL
│   └── resolvers.js      # Resolvers de GraphQL
└── models/
    ├── Usuario.js        # Modelo de usuario
    ├── Proyecto.js       # Modelo de proyecto
    └── Tarea.js          # Modelo de tarea
```

## Conceptos Clave a Aprender

### 1. GraphQL Fundamentals
- **Schema**: Definición de tipos, queries y mutations
- **Resolvers**: Funciones que resuelven las operaciones GraphQL
- **Tipos**: Object types, Input types, Enums
- **Queries vs Mutations**: Operaciones de lectura vs escritura

### 2. Apollo Server
- Configuración del servidor GraphQL
- Middleware y context
- Manejo de errores
- Introspection y playground

### 3. MongoDB & Mongoose
- Modelos y esquemas
- Relaciones entre documentos
- Operaciones CRUD
- Validaciones y middleware

### 4. Autenticación & Autorización
- JWT tokens
- Hashing de passwords con bcryptjs
- Context de usuario autenticado
- Protección de resolvers

## Patrones de Aprendizaje

### Para Queries
- Siempre validar entrada
- Manejar errores apropiadamente
- Optimizar queries de base de datos
- Implementar paginación cuando sea necesario

### Para Mutations
- Validar datos de entrada
- Manejar transacciones cuando sea necesario
- Retornar datos útiles al frontend
- Implementar autorización adecuada

### Para Modelos
- Definir validaciones claras
- Usar middleware para lógica de negocio
- Implementar índices para performance
- Mantener relaciones consistentes

## Objetivos de Aprendizaje

### Nivel Básico
- [ ] Entender la estructura del proyecto
- [ ] Comprender GraphQL schema y types
- [ ] Implementar queries básicas
- [ ] Crear mutations simples

### Nivel Intermedio
- [ ] Implementar autenticación completa
- [ ] Manejar relaciones entre entidades
- [ ] Optimizar resolvers
- [ ] Validar datos de entrada

### Nivel Avanzado
- [ ] Implementar subscriptions
- [ ] Optimizar performance con DataLoader
- [ ] Implementar testing
- [ ] Deployar en producción

## Convenciones del Proyecto

### Nomenclatura
- Usar camelCase para campos GraphQL
- Usar PascalCase para tipos GraphQL
- Usar snake_case para variables de entorno

### Estructura de Archivos
- Un modelo por archivo en `/models`
- Separar resolvers por entidad
- Mantener schema organizado por funcionalidad

### Manejo de Errores
- Usar errores específicos de Apollo Server
- Validar entrada en resolvers
- Retornar mensajes de error claros

## Notas de Desarrollo

### Estado Actual
El proyecto está en desarrollo inicial con la estructura básica configurada.


## Recursos de Referencia

- [GraphQL Official Docs](https://graphql.org/)
- [Apollo Server Docs](https://www.apollographql.com/docs/apollo-server/)
- [Mongoose Docs](https://mongoosejs.com/)
- [JWT Best Practices](https://auth0.com/blog/a-look-at-the-latest-draft-for-jwt-bcp/)

---

**Nota**: Este archivo sirve como contexto para el AI assistant. Actualizar según el progreso del proyecto y nuevos conceptos aprendidos.