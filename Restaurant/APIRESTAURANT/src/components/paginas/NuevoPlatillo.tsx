import React from 'react';
import { Formik, useFormik } from 'formik';
import InputField from '../helpers/InputField';
import { labelStyles, selectStyles } from '../helpers/styles';
import * as Yup from 'yup';
import { FirebaseContext } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore'; // Importa las funciones necesarias de Firestore
import { useNavigate } from 'react-router-dom';
import ImageUploader from '../helpers/ImageUploader';

interface Platillo {
    nombre: string;
    precio: number;
    categoria: string;
    imagen: string;
    descripcion: string;
    existencia: boolean; // Agrega el campo existencia
}

const NuevoPlatillo: React.FC = () => {
    const { firebaseApp } = React.useContext(FirebaseContext);
    const navigate = useNavigate();

    const [uploading, setUploading] = React.useState(false);
    const [progress, setProgress] = React.useState(0);
    const [imageUrl, setImageUrl] = React.useState('');

    const handleUploadStart = () => {
        setUploading(true);
        setProgress(0);
    };

    const handleUploadError = (error: any) => {
        console.error("Error al subir la imagen:", error);
        setUploading(false);
    };

    const handleUploadSuccess = (url: string) => {
        setImageUrl(url);
        setUploading(false);
    };

    const handleProgress = (progress: number) => {
        setProgress(progress);
    };

    const formil = useFormik({
        initialValues: {
            nombre: '',
            precio: 0,
            categoria: '',
            imagen: '',
            descripcion: ''
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .required('El nombre del platillo es obligatorio')
                .min(3, 'El nombre del platillo debe tener al menos 3 caracteres')
                .trim(),
            precio: Yup.number()
                .required('El precio del platillo es obligatorio')
                .positive('El precio debe ser un número positivo')
                .min(1, 'El precio debe ser mayor a 0'),
            categoria: Yup.string()
                .required('La categoría del platillo es obligatoria')
                .oneOf(['desayuno', 'almuerzo', 'cena', 'bebidas', 'postres', 'ensaladas'], 'Categoría no válida'),
            imagen: Yup.mixed()
                .test('fileSize', 'El archivo es muy grande', function (value) {
                    if (value instanceof File && value.size > 2000000) { // 2MB
                        return false;
                    }
                    return true;
                })
                .test('fileType', 'El archivo debe ser una imagen', function (value) {
                    if (value instanceof File && !['image/jpeg', 'image/png', 'image/gif'].includes(value.type)) {
                        return false;
                    }
                    return true;
                }),
            descripcion: Yup.string()
                .required('La descripción del platillo es obligatoria')
                .min(10, 'La descripción del platillo debe tener al menos 10 caracteres')
                .max(500, 'La descripción del platillo no puede exceder los 500 caracteres')
                .trim()
        }),
        onSubmit: async (values : Platillo) => {
            try {
                values.existencia = true; // Agrega el campo existencia con valor true
                values.imagen = imageUrl; // Asigna la URL de la imagen subida
                // Usa las funciones de Firestore para agregar un documento
                const docRef = await addDoc(collection(firebaseApp?.db, 'platillos'), values);
                console.log(`Documento agregado con ID: ${docRef.id}`);
                // Redirige a la página de menú después de agregar el platillo
                navigate('/menu');
            } catch (error) {
                console.error("Error al agregar el documento:", error);
            }
        }
    });

    return (
        <>
            <h1 className="text-3xl font-light mb-4">Nuevo Platillo</h1>

            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl">
                    <form onSubmit={formil.handleSubmit}>
                        {/* Campo Nombre */}
                        {formil.touched.nombre && formil.errors.nombre ? (
                            <div className="text-red-500 text-sm mb-1">{formil.errors.nombre}</div>
                        ) : null}
                        <InputField
                            id="nombre"
                            name="nombre"
                            type="text"
                            placeholder="Nombre del platillo"
                            value={formil.values.nombre}
                            onChange={formil.handleChange}
                            label="Nombre"
                            onblur={formil.handleBlur}
                        />

                        {/* Campo Precio */}
                        {formil.touched.precio && formil.errors.precio ? (
                            <div className="text-red-500 text-sm mb-1">{formil.errors.precio}</div>
                        ) : null}

                        <InputField
                            id="precio"
                            name="precio"
                            type="number"
                            placeholder="Precio del platillo"
                            value={formil.values.precio}
                            onChange={formil.handleChange}
                            label="Precio"
                            onblur={formil.handleBlur}
                        />

                        {/* Campo Categoría */}
                        {formil.touched.categoria && formil.errors.categoria ? (
                            <div className="text-red-500 text-sm mb-1">{formil.errors.categoria}</div>
                        ) : null}
                        <div className="mb-4">
                            <label htmlFor="categoria" className={labelStyles}>Categoría</label>
                            <select
                                id="categoria"
                                name="categoria"
                                value={formil.values.categoria}
                                onChange={formil.handleChange}
                                className={selectStyles}
                            >
                                <option value="">-- Seleccione --</option>
                                <option value="desayuno">Desayuno</option>
                                <option value="almuerzo">Almuerzo</option>
                                <option value="cena">Cena</option>
                                <option value="bebidas">Bebidas</option>
                                <option value="postres">Postres</option>
                                <option value="ensaladas">Ensaladas</option>
                            </select>
                        </div>

                        {/* Campo Imagen */}
                        <ImageUploader
                            onUploadStart={handleUploadStart}
                            onUploadError={handleUploadError}
                            onUploadSuccess={handleUploadSuccess}
                            onProgress={handleProgress}
                        />
                        {uploading && <p>Subiendo imagen: {progress}%</p>}
                        {imageUrl && <p>Imagen subida correctamente</p>}

                        {/* Campo Descripción */}
                        {formil.touched.descripcion && formil.errors.descripcion ? (
                            <div className="text-red-500 text-sm mb-1">{formil.errors.descripcion}</div>
                        ) : null}
                        <div className="mb-4">
                            <label htmlFor="descripcion" className={labelStyles}>Descripción</label>
                            <textarea
                                id="descripcion"
                                name="descripcion"
                                placeholder="Descripción del platillo"
                                value={formil.values.descripcion}
                                onChange={formil.handleChange}
                                className={selectStyles + " h-40"} // Reutiliza estilos y agrega altura
                            ></textarea>
                        </div>

                        {/* Botón Agregar Platillo */}
                        <div className="mb-4">
                            <button
                                type="submit"
                                className="bg-blue-800 w-full p-3 text-white uppercase font-bold rounded hover:bg-blue-900"
                            >
                                Agregar Platillo
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    );
};

export default NuevoPlatillo;
