const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tarea');
require('dotenv').config({ path: 'variables.env' });

const crearToken = (usuario, secreta, expiresIn) => {
    const { id, email, nombre } = usuario;
    return jwt.sign({ id, email, nombre }, secreta, { expiresIn });    
}

const resolvers = {
    Query: {
         obtenerProyectos: async (_, {}, ctx) =>{
            const proyectos = await Proyecto.find({ creador: ctx.usuario.id });
            return proyectos;
         },
         obtenerTareas: async (_, {input}, ctx) => {
            console.log(ctx);
            const tareas = await Tarea.find({creador: ctx.usuario.id }).where('proyecto').equals(input.proyecto); // Filtrar tareas por proyecto de su id referenciado
            if (!tareas) {
                console.log('No se encontraron tareas para este proyecto.');
                throw new Error('No se encontraron tareas para este proyecto');
            }
            return tareas;
         }

    },
    Mutation: {
        crearUsuario: async (_,{input})=>{
            const { nombre, email, password } = input;
            const existeUsuario = await Usuario.findOne({ email });

            console.log(`Verificando si el usuario con email ${email} ya existe...`);
            // Si el usuario existe
            if(existeUsuario) {
                console.log('El usuario ya está registrado.');
                throw new Error('El usuario ya está registrado');
            }
            
            try {
                // Hashear password
                const salt = await bcryptjs.genSalt(10);
                input.password = await bcryptjs.hash(password,salt);

                const nuevoUsuario = new Usuario(input);
                console.log(nuevoUsuario);
                nuevoUsuario.save();
                return "Usuario Creado Correctamente";
                
            } catch (error) {
                console.log('Error al crear el usuario:', error);
                
            }
        },

        autenticarUsuario: async (_, {input}) => {
            const { email, password } = input;

            // Si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });
            console.log(`Verificando si el usuario con email ${email} existe...`);

            if(!existeUsuario){
                console.log('El usuario no existe.');
                throw new Error('El Usuario no existe');
            }

            const passwordCorrecto = await bcryptjs.compare(password, existeUsuario.password);
            if(!passwordCorrecto) {
                console.log('Password incorrecto.');
                throw new Error('Password Incorrecto');
            }
            console.log('Usuario autenticado correctamente.');
            // Dar acceso a la app

            return{
                token: crearToken(existeUsuario, process.env.SECRETA, '4hr')
            }

        },

        nuevoProyecto: async (_, {input}, ctx) =>{
            // console.log('DESDE RESLOLVERS', ctx);
            try {
                const proyecto = new Proyecto(input);

                proyecto.creador = ctx.usuario.id;


                const resultado = await proyecto.save();
                // asociar el creador
                return resultado;

            } catch (error) {
                console.log('Error al crear el proyecto:', error);
                
            }
        },

        actualizarProyecto: async (_, {id, input}, ctx) => {
            let proyecto = await Proyecto.findById(id);
            // console.log(`Actualizando proyecto con ID: ${id}`);
            if (!proyecto) {
                console.log('Proyecto no encontrado.');
                throw new Error('Proyecto no encontrado');
            }
            if(proyecto.creador.toString() !== ctx.usuario.id){
                console.log('No tienes las credenciales para editar este proyecto.');
                throw new Error('No tienes las credenciales para editar');
            }
            proyecto= await Proyecto.findByIdAndUpdate({ _id: id }, input, { new: true });

            return proyecto;

        },
        eliminarProyecto: async (_, {id}, ctx) => {
            let proyecto = await Proyecto.findById(id);
            // console.log(`Eliminando proyecto con ID: ${id}`);
            if (!proyecto) {
                console.log('Proyecto no encontrado.');
                throw new Error('Proyecto no encontrado');
            }
            if(proyecto.creador.toString() !== ctx.usuario.id){
                console.log('No tienes las credenciales para eliminar este proyecto.');
                throw new Error('No tienes las credenciales para editar');
            }

            await Proyecto.findByIdAndDelete({_id:id});
            console.log('Proyecto eliminado correctamente.');
            return "Proyecto Eliminado";
        },

        nuevaTarea: async (_, {input}, ctx) => { 
            try {
                const tarea = new Tarea(input);
                tarea.creador = ctx.usuario.id;
                const resultado = await tarea.save();
                return resultado;
            } catch (error) {
                console.log('Error al crear la tarea:', error);
                
            }

        },
        actualizarTarea: async (_, {id, input, estado}, ctx) => {
              if (!ctx.usuario) {
    throw new Error('No autenticado');
  }
            let tarea = await Tarea.findById(id);

            if(!tarea) {
                console.log('Tarea no encontrada.');
                throw new Error('Tarea no encontrada');
            }

            if(tarea.creador.toString() !== ctx.usuario.id) {
                console.log('No tienes las credenciales para editar esta tarea.');
                throw new Error('No tienes las credenciales para editar');
            }

            input.estado = estado;
            tarea = await Tarea.findByIdAndUpdate({_id:id}, input, {new:true});

            return tarea;
        },

        eliminarTarea: async (_, {id}, ctx) => {
            if (!ctx.usuario) {
                throw new Error('No autenticado');
            }
            let tarea = await Tarea.findById(id);

            if(!tarea) {
                console.log('Tarea no encontrada.');
                throw new Error('Tarea no encontrada');
            }

            if(tarea.creador.toString() !== ctx.usuario.id) {
                console.log('No tienes las credenciales para eliminar esta tarea.');
                throw new Error('No tienes las credenciales para editar');
            }

            await Tarea.findByIdAndDelete({_id:id});
            return "Tarea Eliminada";

            

        }
    }

}


module.exports = resolvers;