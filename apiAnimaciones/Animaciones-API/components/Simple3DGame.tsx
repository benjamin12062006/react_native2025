import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { GLView } from 'expo-gl';

const Simple3DGame = () => {
  const frameId = useRef<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);

  const onContextCreate = (gl: any) => {
    try {
      setLoaded(true);
      const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;
      
      // Configuramos el viewport y habilitamos prueba de profundidad
      gl.viewport(0, 0, width, height);
      gl.clearColor(0.1, 0.1, 0.2, 1.0);
      gl.enable(gl.DEPTH_TEST);
      
      // Shaders avanzados con soporte para iluminación
      const vertShader = `
        attribute vec3 position;
        attribute vec3 normal;
        uniform mat4 modelViewMatrix;
        uniform mat4 projectionMatrix;
        uniform mat3 normalMatrix;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vPosition = mvPosition.xyz;
          gl_Position = projectionMatrix * mvPosition;
        }
      `;
      
      const fragShader = `
        precision mediump float;
        uniform vec3 lightDirection;
        uniform vec3 lightColor;
        uniform vec3 ambientColor;
        uniform vec3 diffuseColor;
        varying vec3 vNormal;
        varying vec3 vPosition;
        
        void main() {
          // Cálculo de iluminación ambiental
          vec3 ambient = ambientColor;
          
          // Cálculo de iluminación difusa
          float diffuseFactor = max(dot(vNormal, normalize(lightDirection)), 0.0);
          vec3 diffuse = diffuseColor * lightColor * diffuseFactor;
          
          // Cálculo de iluminación especular (efecto brillante)
          vec3 viewDir = normalize(-vPosition);
          vec3 reflectDir = reflect(-normalize(lightDirection), vNormal);
          float specularFactor = pow(max(dot(viewDir, reflectDir), 0.0), 32.0);
          vec3 specular = lightColor * specularFactor * 0.5;
          
          // Color final combinado
          gl_FragColor = vec4(ambient + diffuse + specular, 1.0);
        }
      `;
      
      // Crear y compilar shaders
      const vs = gl.createShader(gl.VERTEX_SHADER);
      gl.shaderSource(vs, vertShader);
      gl.compileShader(vs);
      
      const fs = gl.createShader(gl.FRAGMENT_SHADER);
      gl.shaderSource(fs, fragShader);
      gl.compileShader(fs);
      
      // Verificar errores de compilación
      if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
        setError("Error en vertex shader: " + gl.getShaderInfoLog(vs));
        return;
      }
      if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
        setError("Error en fragment shader: " + gl.getShaderInfoLog(fs));
        return;
      }
      
      // Crear programa
      const program = gl.createProgram();
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        setError("Error en program: " + gl.getProgramInfoLog(program));
        return;
      }
      
      gl.useProgram(program);
      
      // Definir un cubo con normales para reflejar la luz
      const positions = [
        // Frente
        -1.0, -1.0,  1.0,
         1.0, -1.0,  1.0,
         1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,
        
        // Atrás
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0, -1.0, -1.0,
        
        // Arriba
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
         1.0,  1.0,  1.0,
         1.0,  1.0, -1.0,
        
        // Abajo
        -1.0, -1.0, -1.0,
         1.0, -1.0, -1.0,
         1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,
        
        // Derecha
         1.0, -1.0, -1.0,
         1.0,  1.0, -1.0,
         1.0,  1.0,  1.0,
         1.0, -1.0,  1.0,
        
        // Izquierda
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
      ];
      
      // Normales para cada vértice (perpendiculares a las caras)
      const normals = [
        // Frente - todos mirando hacia +Z
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        
        // Atrás - todos mirando hacia -Z
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        
        // Arriba - todos mirando hacia +Y
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        
        // Abajo - todos mirando hacia -Y
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        
        // Derecha - todos mirando hacia +X
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        
        // Izquierda - todos mirando hacia -X
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
      ];
      
      // Índices para dibujar caras con triángulos
      const indices = [
        0,  1,  2,    0,  2,  3,   // frente
        4,  5,  6,    4,  6,  7,   // atrás
        8,  9,  10,   8,  10, 11,  // arriba
        12, 13, 14,   12, 14, 15,  // abajo
        16, 17, 18,   16, 18, 19,  // derecha
        20, 21, 22,   20, 22, 23,  // izquierda
      ];
      
      // Cargar vértices
      const positionBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
      
      const positionLocation = gl.getAttribLocation(program, "position");
      gl.enableVertexAttribArray(positionLocation);
      gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0);
      
      // Cargar normales
      const normalBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(normals), gl.STATIC_DRAW);
      
      const normalLocation = gl.getAttribLocation(program, "normal");
      gl.enableVertexAttribArray(normalLocation);
      gl.vertexAttribPointer(normalLocation, 3, gl.FLOAT, false, 0, 0);
      
      // Cargar índices
      const indexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
      
      // Configurar matrices para 3D
      const aspect = width / height;
      const fov = 45 * Math.PI / 180;  // 45 grados en radianes
      const near = 0.1;
      const far = 100.0;
      
      // Matriz de proyección para crear efecto de perspectiva
      const projectionMatrix = mat4Perspective(fov, aspect, near, far);
      
      // Matriz modelo-vista para posicionar objetos
      const modelViewMatrix = mat4Identity();
      mat4Translate(modelViewMatrix, [0.0, 0.0, -5.0]);  // Mover hacia atrás para verlo
      
      // Matriz para las normales
      const normalMatrix = mat3FromMat4(modelViewMatrix);
      
      // Obtener ubicaciones de uniforms
      const projectionMatrixLocation = gl.getUniformLocation(program, "projectionMatrix");
      const modelViewMatrixLocation = gl.getUniformLocation(program, "modelViewMatrix");
      const normalMatrixLocation = gl.getUniformLocation(program, "normalMatrix");
      const lightDirectionLocation = gl.getUniformLocation(program, "lightDirection");
      const lightColorLocation = gl.getUniformLocation(program, "lightColor");
      const ambientColorLocation = gl.getUniformLocation(program, "ambientColor");
      const diffuseColorLocation = gl.getUniformLocation(program, "diffuseColor");
      
      // Configurar parámetros de iluminación
      gl.uniform3fv(lightDirectionLocation, [1.0, 1.0, 1.0]);  // Dirección de la luz
      gl.uniform3fv(lightColorLocation, [1.0, 1.0, 0.8]);      // Color amarillento de la luz
      gl.uniform3fv(ambientColorLocation, [0.2, 0.2, 0.3]);    // Luz ambiental azulada
      gl.uniform3fv(diffuseColorLocation, [0.5, 0.8, 0.5]);    // Color verde del objeto
      
      // Establecer matriz de proyección (no cambia por frame)
      gl.uniformMatrix4fv(projectionMatrixLocation, false, projectionMatrix);
      
      // Estado para animación
      let rotationX = 0;
      let rotationY = 0;
      
      // Función de animación
      const animate = () => {
        frameId.current = requestAnimationFrame(animate);
        
        // Actualizar rotación
        rotationX += 0.01;
        rotationY += 0.007;
        
        // Actualizar matriz modelo-vista con rotación
        const modelViewMatrix = mat4Identity();
        mat4Translate(modelViewMatrix, [0.0, 0.0, -5.0]);
        mat4RotateX(modelViewMatrix, rotationX);
        mat4RotateY(modelViewMatrix, rotationY);
        
        // Calcular matriz de normales
        const normalMatrix = mat3FromMat4(modelViewMatrix);
        
        // Actualizar uniforms
        gl.uniformMatrix4fv(modelViewMatrixLocation, false, modelViewMatrix);
        gl.uniformMatrix3fv(normalMatrixLocation, false, normalMatrix);
        
        // Renderizar
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
        
        gl.endFrameEXP();
      };
      
      animate();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Funciones de matriz 4x4 para transformaciones
  const mat4Identity = () => {
    return [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1
    ];
  };

  const mat4Translate = (m: number[], v: number[]) => {
    m[12] += v[0];
    m[13] += v[1];
    m[14] += v[2];
  };

  const mat4RotateX = (m: number[], angleInRadians: number) => {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    
    const a10 = m[4], a11 = m[5], a12 = m[6], a13 = m[7];
    const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    
    // Rotar X
    m[4] = a10 * c + a20 * s;
    m[5] = a11 * c + a21 * s;
    m[6] = a12 * c + a22 * s;
    m[7] = a13 * c + a23 * s;
    m[8] = a20 * c - a10 * s;
    m[9] = a21 * c - a11 * s;
    m[10] = a22 * c - a12 * s;
    m[11] = a23 * c - a13 * s;
  };

  const mat4RotateY = (m: number[], angleInRadians: number) => {
    const c = Math.cos(angleInRadians);
    const s = Math.sin(angleInRadians);
    
    const a00 = m[0], a01 = m[1], a02 = m[2], a03 = m[3];
    const a20 = m[8], a21 = m[9], a22 = m[10], a23 = m[11];
    
    // Rotar Y
    m[0] = a00 * c - a20 * s;
    m[1] = a01 * c - a21 * s;
    m[2] = a02 * c - a22 * s;
    m[3] = a03 * c - a23 * s;
    m[8] = a00 * s + a20 * c;
    m[9] = a01 * s + a21 * c;
    m[10] = a02 * s + a22 * c;
    m[11] = a03 * s + a23 * c;
  };

  const mat4Perspective = (fovInRadians: number, aspect: number, near: number, far: number) => {
    const f = 1.0 / Math.tan(fovInRadians / 2);
    const rangeInv = 1.0 / (near - far);
    
    return [
      f / aspect, 0, 0, 0,
      0, f, 0, 0,
      0, 0, (near + far) * rangeInv, -1,
      0, 0, near * far * rangeInv * 2, 0
    ];
  };

  const mat3FromMat4 = (m: number[]) => {
    return [
      m[0], m[1], m[2],
      m[4], m[5], m[6],
      m[8], m[9], m[10]
    ];
  };

  useEffect(() => {
    return () => {
      if (frameId.current) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, []);

  return (
    <View style={styles.container}>
      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      ) : (
        <>
          <GLView style={styles.glView} onContextCreate={onContextCreate} />
          {!loaded && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Cargando mundo 3D...</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333', // Fondo gris para ver el contenedor
  },
  glView: {
    flex: 1,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#990000',
  },
  errorText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    color: 'white',
    fontSize: 18,
  }
});

export default Simple3DGame;
