# Aula Digital CCH - UNAM | Documentación Técnica y Control de Versiones

> **Repositorio:** `CCH-Docs`  
> **Institución:** Escuela Nacional Colegio de Ciencias y Humanidades — UNAM  
> **Versión General:** `v1.0.0` (Auditoría Técnica y Línea Base Integral)  
> **Fecha de Auditoría:** 17 de Noviembre de 2026  
> **Estado Global:** Producción / En Mantenimiento Evolutivo  

---

## 1. Resumen Ejecutivo y Alcance del Proyecto

El proyecto **CCH-Docs (Aula Digital)** es un entorno web interactivo de recursos educativos abiertos diseñado para apoyar el aprendizaje y la evaluación en las asignaturas de **Matemáticas**, **Cibernética y Computación**, **Estadística y Probabilidad**, los nuevos **Programas de Estudio 2024** y proyectos de investigación docente (**SILADIN**, talleres de IA y recursos formativos) en el Colegio de Ciencias y Humanidades de la UNAM.

Este archivo `README.md` constituye la **fuente oficial de especificaciones técnicas, auditoría de componentes y control de versiones archivo por archivo**. Su propósito es servir como bitácora permanente para dar seguimiento, auditar dependencias, coordinar mejoras y documentar cambios futuros con precisión.

### Métricas Generales del Repositorio
- **Páginas HTML Totales:** 43 páginas autónomas
- **Scripts Nucleares Compartidos:** 3 archivos (`auth-config.js`, `aula-header.js`, `aula-datos.js`)
- **Documentos de Soporte PDF:** 5 archivos en `Cuadernillos/PDF/`
- **Integración con Google Apps Script:** 6 aplicaciones externas integradas al menú global
- **Peso total en código HTML/JS:** ~9.8 MB

---

## 2. Arquitectura de Software y Estándares Técnicos

El repositorio está construido bajo un enfoque **JAMstack / Single Page Application descentralizada**: no requiere un backend dinámico en Node/PHP para su funcionamiento didáctico básico, lo que le permite servirse de manera ultra-rápida desde cualquier servidor estático (como GitHub Pages o Apache XAMPP local).

### 2.1 Módulos Nucleares de JavaScript

1. **`auth-config.js` (Configuración de Entorno en Cliente):**
   - Define el objeto global `window.AULA_CONFIG`.
   - Gestiona la clave maestra del portal (clave actual: `307153443`).
   - *Nota de seguridad:* Al ejecutarse en cliente, actúa como barrera de acceso visual/pedagógica para el alumno, no como cifrado de nivel bancario.

2. **`aula-header.js` (Cabecera Global y Menú Centralizado):**
   - **Fuente Única de Verdad (`MENU`):** Contiene la taxonomía completa de páginas, agrupadas por disciplina con sus etiquetas, rutas relativas, iconos de Bootstrap Icons y credenciales específicas si aplican.
   - **Gestión de Estado:** Maneja el estado `aula-unlocked` en `sessionStorage` para desbloquear el menú en todas las pestañas de la sesión.
   - **Renderizado Dinámico:** Dibuja el navbar superior en `#app-header` (con soporte para sticky nav y compatibilidad con barras secundarias `.sec-nav`).
   - **Popovers de Contraseñas:** Permite a los docentes o alumnos autorizados ver y copiar contraseñas de páginas protegidas (con retroalimentación táctil '¡Copiada!').

3. **`aula-datos.js` (Motor de Persistencia Reactiva en LocalStorage):**
   - Proporciona un canal reactivo de guardado automático para entradas de usuario (tablas numéricas, inputs, selects, radios, checkboxes).
   - Almacena datos bajo el namespace `aula-datos:<nombre-de-pagina>` en `localStorage`.
   - Incorpora sincronización automática con *debounce* (350 ms), salvado seguro en eventos `pagehide` y `visibilitychange`, y botón flotante UI (*chip*) para restablecer datos a sus valores iniciales.

### 2.2 Dependencias y Librerías Externas (CDN)
- **Bootstrap 5.3.x:** Estructura de maquetación, rejilla responsive, modales, popovers y scrollspy.
- **Bootstrap Icons 1.11.x:** Iconografía vectorial en cabeceras y tarjetas.
- **KaTeX 0.16.9:** Renderizado tipográfico ultra-rápido de fórmulas matemáticas y ecuaciones en sintaxis LaTeX.
- **Chart.js:** Graficación en lienzo HTML5 canvas (histogramas, curvas de densidad, regresión lineal, dispersión).
- **Google Fonts:** Tipografías especializadas (`Space Grotesk`, `Inter`, `Fraunces`, `Source Sans 3`, `JetBrains Mono`, `Bricolage Grotesque`).

---

## 3. Matriz General de Control de Versiones e Integración

| ID | Archivo / Ruta | Módulo / Categoría | Tamaño | Versión | Header Global | Motor Datos | KaTeX / Chart | Estado |
|---|---|---|---|---|:---:|:---:|:---:|---|
| 01 | `Programas_2024/programa_taller_computo.html` | Programas de Estudio 2024 | 388.3 KB | v1.0.0 | No (Autónomo) | - | KaTeX, Chart.js | Estable |
| 02 | `Programas_2024/programa_cibernetica1.html` | Programas de Estudio 2024 | 360.8 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 03 | `Programas_2024/programa_cibernetica2.html` | Programas de Estudio 2024 | 314.7 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 04 | `Programas_2024/programa_estadistica1.html` | Programas de Estudio 2024 | 223.6 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 05 | `Programas_2024/programa_estadistica2.html` | Programas de Estudio 2024 | 214.7 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 06 | `Programas_2024/programa_matematicas1-4.html` | Programas de Estudio 2024 | 750.9 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 07 | `Programas_2024/programa_calculo1-2.html` | Programas de Estudio 2024 | 437.5 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 08 | `Programas_2024/programa_tlriid1-4.html` | Programas de Estudio 2024 | 577.6 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 09 | `Cuadernillos/cuadernillo_estadistica1.html` | Cuadernillos | 359.4 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 10 | `Cuadernillos/cuadernillo_estadistica2.html` | Cuadernillos | 463.6 KB | v1.0.0 | No (Autónomo) | - | KaTeX | Estable |
| 11 | `los_numeros.html` | Matemáticas | 151.2 KB | v1.0.0 | Sí | - | - | Estable |
| 12 | `fracciones.html` | Matemáticas | 148.9 KB | v1.0.0 | Sí | - | - | Estable |
| 13 | `variacion_proporcional.html` | Matemáticas | 135.4 KB | v1.0.0 | Sí | - | - | Estable |
| 14 | `exponentes_radicales.html` | Matemáticas | 110.0 KB | v1.0.0 | Sí | - | - | Estable |
| 15 | `angulos.html` | Matemáticas | 148.5 KB | v1.0.0 | Sí | - | - | Estable |
| 16 | `pitagoras.html` | Matemáticas | 163.4 KB | v1.0.0 | Sí | - | KaTeX | Estable |
| 17 | `taller_computo.html` | Cibernética | 299.9 KB | v1.0.0 | Sí | - | - | Estable |
| 18 | `precursores.html` | Cibernética | 116.5 KB | v1.0.0 | Sí | - | - | Estable |
| 19 | `circuitos.html` | Cibernética | 103.2 KB | v1.0.0 | Sí | - | Chart.js | Estable |
| 20 | `protoboard.html` | Cibernética | 60.9 KB | v1.0.0 | Sí | - | KaTeX | Estable |
| 21 | `conversiones.html` | Cibernética | 77.2 KB | v1.0.0 | Sí | - | - | Estable |
| 22 | `operaciones_basicas_binarios.html` | Cibernética | 176.0 KB | v1.0.0 | Sí | - | - | Estable |
| 23 | `compuertas_logicas.html` | Cibernética | 121.9 KB | v1.0.0 | Sí | - | KaTeX | Estable |
| 24 | `Paquete/cibernetica-computacion2.html` | Cibernética | 353.0 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 25 | `examenes_cibernetica.html` | Cibernética | 288.0 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 26 | `distribucion_muestral.html` | Estadística | 125.2 KB | v1.0.0 | Sí | Sí | Chart.js | Estable |
| 27 | `medidas_dispersion.html` | Estadística | 120.7 KB | v1.0.0 | Sí | Sí | Chart.js | Estable |
| 28 | `amplitudes.html` | Estadística | 161.2 KB | v1.0.0 | Sí | Sí | - | Estable |
| 29 | `cuartiles_percentiles.html` | Estadística | 179.4 KB | v1.0.0 | Sí | Sí | - | Estable |
| 30 | `correlacion_lineal.html` | Estadística | 133.2 KB | v1.0.0 | Sí | Sí | - | Estable |
| 31 | `probabilidad.html` | Estadística | 248.8 KB | v1.0.0 | Sí | Sí | Chart.js | Estable |
| 32 | `funcion_distribucion_probabilidad.html` | Estadística | 249.4 KB | v1.0.0 | Sí | Sí | Chart.js | Estable |
| 33 | `distribucion_binomial.html` | Estadística | 289.8 KB | v1.0.0 | Sí | Sí | Chart.js | Estable |
| 34 | `distribucion_normal.html` | Estadística | 181.3 KB | v1.0.0 | Sí | Sí | - | Estable |
| 35 | `proyectos_finales_eyp.html` | Estadística | 78.1 KB | v1.0.0 | Sí | - | - | Estable |
| 36 | `examenes_estadistica.html` | Estadística | 199.9 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 37 | `Extras/guia_conamat.html` | Extras | 736.9 KB | v1.0.0 | No (Autónomo) | - | Chart.js | Estable |
| 38 | `Extras/libre_office.html` | Extras | 113.1 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 39 | `Extras/tacur_ia-pia.html` | Extras | 31.9 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 40 | `Extras/estilos_pagina_web.html` | Extras | 123.9 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 41 | `Extras/prompts_lab.html` | Extras | 73.8 KB | v1.0.0 | No (Autónomo) | - | - | Estable |
| 42 | `Extras/proyecto_siladin_estres.html` | Extras | 179.5 KB | v1.0.0 | Sí | - | - | Estable |
| 43 | `index.html` | Principal | 16.9 KB | v1.0.0 | Sí | - | - | Estable |

---

## 4. Especificaciones Técnicas Detalladas por Archivo

### Módulo: PRINCIPAL (1 Página)

#### `index.html`
- **Título en Navegador:** Aula Digital - Inicio
- **Encabezado Principal (`<h1>`):** Aula Digital By Nequiz
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-09 14:58` | **Peso:** `16.9 KB`
- **Objetivo Pedagógico:** Página de aterrizaje (Landing & Hub) que centraliza el acceso a todos los recursos didácticos del Aula Digital mediante tarjetas interactivas clasificadas por disciplina, buscador en tiempo real y métricas de contenido.
- **Funcionalidades e Interactividad:** Buscador reactivo con resaltado de términos coincidentes, filtrado dinámico mediante chips de categorías, integración con la barra de navegación compartida (aula-header.js), visualización condicional de tarjetas con control de desbloqueo, popovers para contraseñas de páginas protegidas.
- **Persistencia de Estado:** Lee el estado de desbloqueo desde sessionStorage (aula-unlocked) administrado por aula-header.js.
- **Seguridad / Control de Acceso:** Protegido por contraseña global configurable en auth-config.js. Las tarjetas se muestran en modo restringido hasta ingresar la credencial correcta.
- **Funciones Clave en Código:** `renderHome()`, `renderTools()`
- **Estructura de Secciones (`<h2>`):** Contenido bloqueado, Contenido del Aula, ${esc(x.g.label)}, Sin resultados
- **Diagnóstico de Auditoría / Notas de Control:** Núcleo distribuidor del portal. Todo nuevo recurso debe registrarse en la constante MENU de aula-header.js para reflejarse automáticamente aquí.

### Módulo: PROGRAMAS DE ESTUDIO 2024 (8 Páginas)

#### `Programas_2024/programa_taller_computo.html`
- **Título en Navegador:** Cuadernillo de Taller de Cómputo
- **Encabezado Principal (`<h1>`):** Taller de CómputoCuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `388.3 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo de repaso alineado al programa 2024 de Taller de Cómputo (primer semestre) del CCH-UNAM.
- **Funcionalidades e Interactividad:** Módulos de aprendizajes por unidad, generador de ejercicios de hojas de cálculo, diagramación de hardware/software, simulador interactivo de gráficos con Chart.js, visualizador de fórmulas KaTeX, generador dinámico de código QR para compartir secciones.
- **Persistencia de Estado:** Almacena progreso y respuestas de laboratorio en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre dentro del sitio.
- **Funciones Clave en Código:** `drawChart()`, `initUI()`, `INIT()`, `render()`, `labGen()`, `renderLearn()`, `evaluate()`, `renderVD()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, Búsqueda y uso de información en internet, Hardware y software, Solución de problemas con la hoja electrónica de cálculo, Multimedia
- **Diagnóstico de Auditoría / Notas de Control:** Utiliza barra de navegación contextual .pbar con enlaces a los demás programas 2024.

#### `Programas_2024/programa_cibernetica1.html`
- **Título en Navegador:** Cuadernillo de Cibernética I
- **Encabezado Principal (`<h1>`):** Cibernética y Computación ICuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `360.8 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo para Cibernética y Computación I (quinto semestre), abarcando teoría general de sistemas, retroalimentación, binario, álgebra booleana, compuertas y primeros pasos en Java.
- **Funcionalidades e Interactividad:** Simuladores de lazo cerrado/abierto (feedback loop) en SVG animado, conversor paso a paso de binario/decimal, generador aleatorio de tablas de verdad y expresiones booleanas, visualizador de diagramas de flujo y plantillas de código Java con resaltado de sintaxis, generador QR modal.
- **Persistencia de Estado:** Progreso de ejercicios y tema claro/oscuro en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `initUI()`, `step()`, `renderLearn()`, `drawFlow()`, `reset()`, `draw()`, `renderQR()`, `drawQR()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, La cibernética, Representación de información en sistema binario y álgebra de Boole, Metodología de solución de problemas e introducción a la programación en Java, Fuentes consultadas
- **Diagnóstico de Auditoría / Notas de Control:** Incluye selector de tema claro/oscuro (data-bs-theme) y navegación .pbar.

#### `Programas_2024/programa_cibernetica2.html`
- **Título en Navegador:** Cuadernillo de Cibernética II
- **Encabezado Principal (`<h1>`):** Cibernética y Computación IICuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `314.7 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo para Cibernética y Computación II (sexto semestre), enfocado en Programación Orientada a Objetos (POO) en Java, estructuras de control, herencia, encapsulamiento y polimorfismo.
- **Funcionalidades e Interactividad:** Laboratorios interactivos de clases y objetos, simulador de traza de ejecución de ciclos y condicionales, diagramas de jerarquía de clases interactivos, generador de ejercicios de código Java con validación inmediata, modal de guía rápida y QR.
- **Persistencia de Estado:** Avance de lecciones guardado en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `initUI()`, `renderLearn()`, `draw()`, `renderQR()`, `drawQR()`, `gen()`, `initQR()`, `initPbar()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, Fundamentos de programación orientada a objetos con Java, Estructuras de control de secuencia en Java, Herencia y polimorfismo, Interfaz gráfica de usuario
- **Diagnóstico de Auditoría / Notas de Control:** Excelente nivel de diseño editorial; cuenta con scroll spy integrado de Bootstrap 5.

#### `Programas_2024/programa_estadistica1.html`
- **Título en Navegador:** Cuadernillo de Estadística I
- **Encabezado Principal (`<h1>`):** Estadística y Probabilidad ICuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `223.6 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo para Estadística y Probabilidad I, abordando estadística descriptiva unidimensional, tablas de frecuencias, medidas de tendencia central y dispersión, datos bivariados y nociones de probabilidad.
- **Funcionalidades e Interactividad:** Generador de diagramas de caja y bigotes (boxplot) interactivos en canvas, tablas dinámicas de cálculo de medias ponderadas y varianzas, calculador de probabilidad frecuencial, generador aleatorio de ejercicios con botón 'Nuevo ejercicio'.
- **Persistencia de Estado:** Guarda respuestas en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `draw()`, `renderQR()`, `drawQR()`, `initUI()`, `boxplot()`, `renderLearn()`, `initPbar()`, `scatterPlot()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, Análisis de información estadística para una variable, Datos bivariados, Azar y probabilidad, Fuentes consultadas
- **Diagnóstico de Auditoría / Notas de Control:** Utiliza KaTeX para la renderización de fórmulas de sumatorias, desviaciones y combinatorias.

#### `Programas_2024/programa_estadistica2.html`
- **Título en Navegador:** Cuadernillo de Estadística II
- **Encabezado Principal (`<h1>`):** Estadística y Probabilidad IICuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `214.7 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo para Estadística y Probabilidad II, enfocado en modelos de probabilidad (binomial, normal), distribuciones muestrales y pruebas de hipótesis / inferencia estadística.
- **Funcionalidades e Interactividad:** Calculadora de áreas bajo la curva normal estándar (Z) con visualización interactiva, resolución guiada paso a paso de contrastes de hipótesis (Z y t), simulador de muestreo, generador de ejercicios aleatorios.
- **Persistencia de Estado:** Respuestas y avances guardados en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `draw()`, `renderQR()`, `normalSteps()`, `initUI()`, `testSteps()`, `drawQR()`, `renderLearn()`, `initPbar()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, Modelos de probabilidad y sus aplicaciones, Distribuciones muestrales, Inferencia estadística, Fuentes consultadas
- **Diagnóstico de Auditoría / Notas de Control:** Implementa resolución algorítmica de problemas inferenciales con verificación de pasos.

#### `Programas_2024/programa_matematicas1-4.html`
- **Título en Navegador:** Cuadernillos de Matemáticas I a IV
- **Encabezado Principal (`<h1>`):** Matemáticas I a IVCuadernillos interactivos de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `750.9 KB`
- **Objetivo Pedagógico:** Compendio y cuadernillo integral de Matemáticas I a IV (álgebra elemental, variación proporcional, funciones lineales, ecuaciones cuadráticas, geometría euclidiana y trigonometría).
- **Funcionalidades e Interactividad:** Generador de ejercicios algebraicos y geométricos con render KaTeX en tiempo real, trazador de funciones en canvas, resolución de sistemas de ecuaciones lineales 2x2 y 3x3, ejercicios paso a paso de factorización y leyes de exponentes.
- **Persistencia de Estado:** Estado de avances y ejercicios resueltos en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `initUI()`, `genTex()`, `drawPrims()`, `generalForm()`, `renderLearn()`, `solve2Steps()`, `niceStep()`, `draw()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, El significado de los números y sus operaciones básicas, Variación directamente proporcional y funciones lineales, Ecuaciones de primer grado con una incógnita, Sistemas de ecuaciones lineales
- **Diagnóstico de Auditoría / Notas de Control:** Documento extenso (750.9 KB); reúne 4 semestres curriculares en una sola aplicación.

#### `Programas_2024/programa_calculo1-2.html`
- **Título en Navegador:** Cuadernillo de Cálculo Diferencial e Integral I y II
- **Encabezado Principal (`<h1>`):** Cálculo Diferencial e Integral I y IICuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `437.5 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo para Cálculo Diferencial e Integral I y II (quinto y sexto semestre), que trata procesos infinitos, noción de límite, derivada, razones de cambio, optimización e integral definida.
- **Funcionalidades e Interactividad:** Aproximación gráfica interactiva al límite (epsilon-delta), trazador de rectas tangentes y derivadas en canvas, cálculo simbólico de derivadas algebraicas paso a paso, aproximación por sumas de Riemann con ajuste dinámico de particiones.
- **Persistencia de Estado:** Avance de unidades y configuración en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `initUI()`, `renderLearn()`, `niceStep()`, `heroCalc2()`, `draw()`, `renderQR()`, `drawQR()`, `sqrtSimp()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, Procesos infinitos y la noción de límite, El concepto de derivada: variación y razón de cambio, Derivada de funciones algebraicas, Comportamiento gráfico y problemas de optimización
- **Diagnóstico de Auditoría / Notas de Control:** Diseño editorial de alta fidelidad con tipografía matemática cuidada y KaTeX.

#### `Programas_2024/programa_tlriid1-4.html`
- **Título en Navegador:** Cuadernillo del TLRIID I a IV
- **Encabezado Principal (`<h1>`):** Taller de Lectura, Redacción e Iniciación a la Investigación Documental I a IVCuadernillo interactivo de repaso
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-03 15:35` | **Peso:** `577.6 KB`
- **Objetivo Pedagógico:** Cuadernillo interactivo para el Taller de Lectura, Redacción e Iniciación a la Investigación Documental (TLRIID) I a IV.
- **Funcionalidades e Interactividad:** Módulos de análisis de textos argumentativos, narrativos e informativos, evaluador de citas en formato APA/UNAM, organizadores gráficos interactivos, fichas de trabajo dinámicas con generador de referencias bibliográficas.
- **Persistencia de Estado:** Guarda apuntes y ejercicios de redacción en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `initUI()`, `stepsLab()`, `render()`, `labGeneros()`, `renderLearn()`, `niceStep()`, `draw()`, `renderQR()`
- **Estructura de Secciones (`<h2>`):** Aprendizajes y temática, Literaturas del yo. Relato personal, Lectura extensiva de géneros literarios narrativos. Reseña descriptiva, Nota informativa y géneros periodísticos de opinión. Comentario libre, Artículo de divulgación científica. Monografía
- **Diagnóstico de Auditoría / Notas de Control:** Archivo de 577.6 KB con gran acervo de lecturas modelo y rúbricas de evaluación integradas.

### Módulo: CUADERNILLOS (2 Páginas)

#### `Cuadernillos/cuadernillo_estadistica1.html`
- **Título en Navegador:** Cuaderno de Estadística 1 · Aula Digital
- **Encabezado Principal (`<h1>`):** ${p.title || p.t}
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-17 15:09` | **Peso:** `359.4 KB`
- **Objetivo Pedagógico:** Cuaderno de trabajo digital e interactivo de Estadística 1 diseñado con arquitectura de aplicación web completa tipo SPA (Single Page Application).
- **Funcionalidades e Interactividad:** Navegación lateral tipo 'Rail' con control de avance por lecciones, barra de búsqueda transversal de contenidos, indicadores de progreso con checkpoints dinámicos, formulario de consulta rápida en modal, visualizador integrado y descargador de PDFs de ejercicios complementarios.
- **Persistencia de Estado:** Guarda avance por tema, ejercicios completados y notas en localStorage con botón para reiniciar avance.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `step()`, `render()`, `groupedSteps()`, `niceStep()`, `draw()`, `drawerMode()`, `contingency()`, `nextStep()`
- **Estructura de Secciones (`<h2>`):** Ruta de aprendizaje
- **Diagnóstico de Auditoría / Notas de Control:** Estructura moderna en cuadrícula CSS (Space Grotesk + Inter). Incluye enlaces directos a los PDFs locales de la carpeta PDF/.

#### `Cuadernillos/cuadernillo_estadistica2.html`
- **Título en Navegador:** Cuaderno de Estadística 2 · Aula Digital
- **Encabezado Principal (`<h1>`):** ${p.title || p.t}
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-17 15:04` | **Peso:** `463.6 KB`
- **Objetivo Pedagógico:** Cuaderno digital e interactivo de Estadística 2 complementario con arquitectura SPA para probabilidad avanzada e inferencia estadística.
- **Funcionalidades e Interactividad:** Navegación por unidades en barra lateral retráctil, simuladores de distribuciones continuas y discretas, calculadora de intervalos de confianza, banco de ejercicios interactivos con validación inmediata, visor de apéndices y formularios.
- **Persistencia de Estado:** Avance de lecciones y estado de ejercicios en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `svgStep()`, `drawsNoRepl()`, `render()`, `niceStep()`, `draw()`, `drawerMode()`, `apxDrawBin()`, `quizWidget()`
- **Estructura de Secciones (`<h2>`):** Estructura modular directa
- **Diagnóstico de Auditoría / Notas de Control:** El archivo HTML más grande de cuadernillos (463.6 KB). Vincula a PDF/est2_ejercicios.pdf y PDF/est2_formulario.pdf.

### Módulo: MATEMÁTICAS (6 Páginas)

#### `los_numeros.html`
- **Título en Navegador:** Matemáticas - Los números
- **Encabezado Principal (`<h1>`):** Los números
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `151.2 KB`
- **Objetivo Pedagógico:** Unidad interactiva sobre conjuntos numéricos: números naturales, enteros, racionales, irracionales y reales, jerarquía de operaciones y recta numérica.
- **Funcionalidades e Interactividad:** Visualizador interactivo de conjuntos numéricos en diagrama de Venn/cajas jerárquicas, recta numérica interactiva con desplazamiento y zoom, generador de retos de jerarquía de operaciones con árbol sintáctico de evaluación paso a paso.
- **Persistencia de Estado:** No requiere guardado persistente de datos.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderQ()`, `renderGrid()`, `renderCat()`, `renderS11()`, `renderSets()`, `initPops()`, `renderNI()`, `renderClos()`
- **Estructura de Secciones (`<h2>`):** ${title}
- **Diagnóstico de Auditoría / Notas de Control:** Totalmente responsive con estilos unificados del portal.

#### `fracciones.html`
- **Título en Navegador:** Matemáticas - Fracciones
- **Encabezado Principal (`<h1>`):** Fracciones
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `148.9 KB`
- **Objetivo Pedagógico:** Laboratorio interactivo de operaciones con fracciones (suma, resta, multiplicación, división, equivalencias y simplificación con MCD/mcm).
- **Funcionalidades e Interactividad:** Representación visual gráfica dinámica de fracciones (pasteles/sectores circulares y barras rectangulares en canvas/SVG), calculadora interactiva con explicación paso a paso del mínimo común múltiplo, ejercicios autoevaluables con retroalimentación instantánea.
- **Persistencia de Estado:** Puntuación de ejercicios en sesión.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `showSteps()`, `solverInit()`, `simpLines()`, `navInit()`, `stepper()`, `draw()`, `s3simp()`, `checkAns()`
- **Estructura de Secciones (`<h2>`):** ¿Qué es una fracción?, Tipos de fracciones, Fracciones equivalentes y simplificación, Comparar y ordenar fracciones, Suma y resta de fracciones
- **Diagnóstico de Auditoría / Notas de Control:** Excelente recurso visual para afianzar conceptos abstractos de fracciones.

#### `variacion_proporcional.html`
- **Título en Navegador:** Matemáticas - Variación proporcional
- **Encabezado Principal (`<h1>`):** Variación proporcional
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `135.4 KB`
- **Objetivo Pedagógico:** Estudio interactivo de la variación directamente proporcional, proporcionalidad inversa, constante de proporcionalidad k y su representación tabular y gráfica.
- **Funcionalidades e Interactividad:** Generador de tablas de datos proporcionales con slider para modificar k, trazador dinámico de la recta y = kx y la hipérbola y = k/x, simulador de situaciones cotidianas (velocidad, costo, rendimiento).
- **Persistencia de Estado:** Estado de simulación en memoria.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderDet()`, `renderProb()`, `renderForm()`, `renderS7()`, `renderG2E()`, `renderS5()`, `renderD3c()`, `renderMach()`
- **Estructura de Secciones (`<h2>`):** ${title}
- **Diagnóstico de Auditoría / Notas de Control:** Gráficos fluidos que sincronizan la tabla numérica con la pendiente geométrica en tiempo real.

#### `exponentes_radicales.html`
- **Título en Navegador:** Matemáticas - Leyes de Exponentes y Radicales
- **Encabezado Principal (`<h1>`):** Exponentes y Radicales
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `110.0 KB`
- **Objetivo Pedagógico:** Dominio de las leyes de los exponentes enteros y fraccionarios, y propiedades fundamentales de los radicales.
- **Funcionalidades e Interactividad:** Selector interactivo de leyes (producto de potencias, cociente, potencia de potencia, exponente negativo y fraccionario) con demostración aritmética visual, generador de ejercicios algebraicos con dificultad graduable y solución paso a paso.
- **Persistencia de Estado:** Puntaje de autoevaluación temporal.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `mmRender()`, `renderLaw()`, `advCheck()`, `renderEx()`, `simpRoot()`, `solverRun()`, `lawSteps()`, `renderSheets()`
- **Estructura de Secciones (`<h2>`):** ${n}${l.title}$${l.f}$
- **Diagnóstico de Auditoría / Notas de Control:** Formulación matemática precisa; diseño ligero (110 KB).

#### `angulos.html`
- **Título en Navegador:** Matemáticas - Ángulos y geometría
- **Encabezado Principal (`<h1>`):** Ángulos, triángulos y circunferencia
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `148.5 KB`
- **Objetivo Pedagógico:** Guía y simulador geométrico interactivo de clasificación de ángulos, rectas paralelas cortadas por una secante y ángulos en polígonos.
- **Funcionalidades e Interactividad:** Transportador interactivo virtual para medir y construir ángulos arrastrando vértices, simulador interactivo de ángulos correspondientes, alternos internos/externos con codificación de color, generador de problemas para hallar ángulos incógnitos.
- **Persistencia de Estado:** Estado de interacción temporal.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderCE()`, `renderGL()`, `renderT3()`, `renderForm()`, `renderS7()`, `drawPair()`, `renderS5()`, `renderC2()`
- **Estructura de Secciones (`<h2>`):** ${title}
- **Diagnóstico de Auditoría / Notas de Control:** Interacción táctil y de ratón muy fluida con elementos SVG/canvas.

#### `pitagoras.html`
- **Título en Navegador:** Matemáticas - Pitágoras y Trigonometría del Triángulo
- **Encabezado Principal (`<h1>`):** Pitágoras y Trigonometría
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `163.4 KB`
- **Objetivo Pedagógico:** Laboratorio didáctico del Teorema de Pitágoras y trigonometría elemental en el triángulo rectángulo (sen, cos, tan).
- **Funcionalidades e Interactividad:** Demostración geométrica interactiva dinámica de a² + b² = c² mediante áreas de cuadrados adyacentes, manipulador de catetos interactivo con cálculo automático de hipotenusa y razones trigonométricas, banco de problemas contextualizados (escaleras, sombras, distancias).
- **Persistencia de Estado:** Sin persistencia local.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `updLegend()`, `mmRender()`, `update()`, `viewRedraw()`, `mmCheck()`, `step()`, `renderTab()`, `drawPlot()`
- **Estructura de Secciones (`<h2>`):** ${t}
- **Diagnóstico de Auditoría / Notas de Control:** Renderiza fórmulas con KaTeX; incluye demostraciones visuales de Euclides y Bhaskara.

### Módulo: CIBERNÉTICA (9 Páginas)

#### `taller_computo.html`
- **Título en Navegador:** Taller de Cómputo · Guía interactiva
- **Encabezado Principal (`<h1>`):** Taller de Cómputo
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `299.9 KB`
- **Objetivo Pedagógico:** Guía interactiva exhaustiva para la asignatura de Taller de Cómputo del CCH.
- **Funcionalidades e Interactividad:** Simuladores de arquitectura de Von Neumann, identificación de componentes de hardware (CPU, RAM, buses, periféricos), simulador de hojas de cálculo con evaluación de fórmulas básicas (SUMA, PROMEDIO, SI), módulos de ética digital y seguridad en línea.
- **Persistencia de Estado:** Progreso en sesión.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `draw()`, `renderQ()`, `renderGl()`, `mountQuiz()`, `step()`, `redraw()`, `render()`, `renderIdx()`
- **Estructura de Secciones (`<h2>`):** ${s.title}, Glosario, Examen final de práctica, ${u.t}
- **Diagnóstico de Auditoría / Notas de Control:** Página extensa (299.9 KB) con múltiples recursos interactivos y gráficos SVG.

#### `precursores.html`
- **Título en Navegador:** Precursores de la Computación y la Cibernética
- **Encabezado Principal (`<h1>`):** Precursores de la computación y la cibernética
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `116.5 KB`
- **Objetivo Pedagógico:** Línea del tiempo y museo interactivo de los personajes históricos precursores de la computación y la cibernética.
- **Funcionalidades e Interactividad:** Línea de tiempo horizontal y vertical interactiva con filtros por época (antigüedad, mecánica, electrónica, moderna), tarjetas biográficas emergentes con aportaciones clave (Pascal, Leibniz, Babbage, Lovelace, Turing, Wiener, Von Neumann), cuestionario interactivo de trivia histórica.
- **Persistencia de Estado:** Resultados de trivia en sesión.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderTL()`, `presetZoom()`, `drawRel()`, `drawG()`, `step()`, `renderLit()`, `init()`, `renderPeople()`
- **Estructura de Secciones (`<h2>`):** Línea del tiempo, Perfiles y aporte principal, Red de conexiones, Mapa de lugares, Convivencia con poetas, escritores e historiadores
- **Diagnóstico de Auditoría / Notas de Control:** Diseño muy visual y dinámico; navegación cronológica fluida.

#### `circuitos.html`
- **Título en Navegador:** Cibernética - Circuitos Eléctricos
- **Encabezado Principal (`<h1>`):** Circuitos Eléctricos
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `103.2 KB`
- **Objetivo Pedagógico:** Simulador y laboratorio didáctico de circuitos eléctricos fundamentales (ley de Ohm, circuitos en serie, paralelo y mixtos).
- **Funcionalidades e Interactividad:** Simulador interactivo de circuito con ajuste de voltaje (V) y resistencia (R), cálculo en vivo de corriente (I) y potencia (P), visualización dinámica del flujo de electrones e intensidad de iluminación de bombillas mediante Chart.js y canvas, calculador de resistencia equivalente.
- **Persistencia de Estado:** Configuración en sesión.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `drawChart()`, `ledCalc()`, `drawWave()`, `updateUnits()`, `updateACcalc()`, `drawLoop()`, `updateWater()`, `drawWater()`
- **Estructura de Secciones (`<h2>`):** La analogía del agua, Voltaje, corriente y resistencia, Corriente directa (CD) y alterna (CA), Ley de Ohm, Resistencias y código de colores
- **Diagnóstico de Auditoría / Notas de Control:** Excelente implementación gráfica del flujo de corriente con animación en tiempo real.

#### `protoboard.html`
- **Título en Navegador:** Cibernética - La Protoboard e Interconexiones
- **Encabezado Principal (`<h1>`):** La Protoboard e Interconexiones
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `60.9 KB`
- **Objetivo Pedagógico:** Guía práctica y visual sobre el funcionamiento interno de la tablilla de pruebas (protoboard), buses de alimentación y pistas de nodos.
- **Funcionalidades e Interactividad:** Simulador interactivo donde el alumno puede hacer clic en orificios para visualizar la continuidad interna de las pistas (buses horizontales vs pistas verticales), herramienta de cableado virtual de componentes simples (LEDs, resistencias, fuentes).
- **Persistencia de Estado:** Sin persistencia.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `simMetrics()`, `drawCircuit()`, `drawBoard()`, `toggleSim()`, `simData()`, `calc()`, `renderQuiz()`, `tutRender()`
- **Estructura de Secciones (`<h2>`):** Anatomía y Probador de Continuidad, Los Componentes del Ensamblaje, Simulador de Conexión Real, Laboratorio Virtual de Conexiones, Guía de Ensamblaje Paso a Paso
- **Diagnóstico de Auditoría / Notas de Control:** Ayuda a evitar errores típicos de cortocircuito en las prácticas presenciales de laboratorio.

#### `conversiones.html`
- **Título en Navegador:** Cibernética - Conversiones Numéricas
- **Encabezado Principal (`<h1>`):** Conversiones Numéricas
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `77.2 KB`
- **Objetivo Pedagógico:** Entorno de aprendizaje interactivo para conversiones numéricas entre bases: binaria, decimal, octal y hexadecimal.
- **Funcionalidades e Interactividad:** Conversor universal multidireccional en tiempo real, desglose paso a paso del método de divisiones sucesivas y del método de potencias posicionales, generador de ejercicios de conversión aleatorios con validación y pista.
- **Persistencia de Estado:** Puntaje de práctica en sesión.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `checkAnswer()`, `renderBaseCards()`, `renderAllActSolutions()`, `stepsToDecimal()`, `actCalc()`, `resetAll()`, `stepsGroup()`, `resetSets()`
- **Estructura de Secciones (`<h2>`):** 1. Conoce cada sistema, 2. Tabla de equivalencias interactiva, 3. Conversor en vivo, 3.5. Simulador de Interruptores y Focos (Bitwise Switch Panel), 4. Mapa de métodos
- **Diagnóstico de Auditoría / Notas de Control:** Código optimizado y muy didáctico (77.2 KB).

#### `operaciones_basicas_binarios.html`
- **Título en Navegador:** Operaciones básicas binarios
- **Encabezado Principal (`<h1>`):** Operaciones básicas binarios
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `176.0 KB`
- **Objetivo Pedagógico:** Laboratorio de aritmética binaria: suma binaria con acarreo (carry), resta con préstamo (borrow), multiplicación y complemento a 2.
- **Funcionalidades e Interactividad:** Calculadora aritmética binaria interactiva con vista de acarreos columna por columna, simulador de suma en complemento a dos para representar negativos, práctica guiada donde el alumno debe ingresar cada dígito del resultado y verificar.
- **Persistencia de Estado:** Sin almacenamiento local.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `genEx()`, `stepsD2B()`, `renderTheorem()`, `stepsMul()`, `renderOp()`, `stepsDiv()`, `stepsB2X()`, `stepsSubC2()`
- **Estructura de Secciones (`<h2>`):** Teorema fundamental de la numeración, Reglas de las operaciones básicas, Suma binaria, Resta binaria, Multiplicación binaria
- **Diagnóstico de Auditoría / Notas de Control:** Desglose gráfico columna por columna idéntico al procedimiento manual en papel.

#### `compuertas_logicas.html`
- **Título en Navegador:** Cibernética - Compuertas Lógicas y Álgebra de Boole
- **Encabezado Principal (`<h1>`):** Compuertas Lógicas y Álgebra de Boole
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-03 15:35` | **Peso:** `121.9 KB`
- **Objetivo Pedagógico:** Estudio teórico-práctico de las compuertas lógicas básicas (NOT, AND, OR, NAND, NOR, XOR, XNOR) y simplificación de funciones booleanas.
- **Funcionalidades e Interactividad:** Simulador interactivo con interruptores booleanos (0/1) y LEDs indicadores de salida en tiempo real, generador interactivo de tablas de verdad, visualización de símbolos estándar ANSI/IEEE y símbolos europeos, evaluador de expresiones booleanas con KaTeX.
- **Persistencia de Estado:** Estado de compuertas en memoria.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `kxRender()`, `kgInit()`, `kpRender()`, `kmSolve()`, `drawNode()`, `evalLaw()`, `drawDiagramSVG()`, `wzInit()`
- **Estructura de Secciones (`<h2>`):** 1. Catálogo de Compuertas Lógicas, 2. Álgebra de Boole, Operadores y Leyes, 3. Generador de Diagramas y Simulador, 4. Tabla de Verdad y Simplificación Paso a Paso, 5. Mapas de Karnaugh (K-Maps)
- **Diagnóstico de Auditoría / Notas de Control:** Altamente didáctico para la Unidad 2 de Cibernética I.

#### `Paquete/cibernetica-computacion2.html`
- **Título en Navegador:** Cibernética y Computación II
- **Encabezado Principal (`<h1>`):** Cibernética y Computación II
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-05 14:55` | **Peso:** `353.0 KB`
- **Objetivo Pedagógico:** Guía y paquete didáctico integral interactivo para el examen extraordinario de Cibernética y Computación II (UNAM-CCH Oriente).
- **Funcionalidades e Interactividad:** Macro-guía con 4183 líneas de código estructurada en módulos temáticos con más de 20 laboratorios interactivos (simulación de autómatas, compilador visual Java simulado, trazas de arrays, simulador de grafos de flujo, cuestionarios interactivos de autoevaluación), barra de progreso de lectura y modo examen.
- **Persistencia de Estado:** Guarda respuestas en memoria de sesión/localStorage.
- **Seguridad / Control de Acceso:** Protegido con contraseña registrada en aula-header.js (CCH-Ciber2-2026).
- **Funciones Clave en Código:** `step()`, `render()`, `toggle()`, `reset()`, `draw()`, `check()`, `initPops()`, `segInit()`
- **Estructura de Secciones (`<h2>`):** Ruta de estudio#ruta, Lenguaje de programación orientada a objetos con Java#u1, Estructuras de control de secuencia en Java#u2, Polimorfismo, constructores, colaboración y herencia de clases#u3, Interfaz gráfica de usuario#u4
- **Diagnóstico de Auditoría / Notas de Control:** Es una de las guías más completas del proyecto. No tiene #app-header, sino su propia cabecera institucional UNAM con azul (#003B7A) y oro.

#### `examenes_cibernetica.html`
- **Título en Navegador:** Examen Cibernética 1
- **Encabezado Principal (`<h1>`):** Usa una computadora
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-05 16:17` | **Peso:** `288.0 KB`
- **Objetivo Pedagógico:** Sistema integral de evaluación y exámenes en línea para la asignatura de Cibernética 1.
- **Funcionalidades e Interactividad:** Puerta de acceso de seguridad (gate screen), temporizador regresivo estricto con alertas visuales, navegación por cuadrícula de preguntas con marcado de dudas (flag), clasificación taxonómica de reactivos según Bloom (Recordar, Comprender, Aplicar, Analizar, Evaluar, Crear), calificación automática, revisión detallada de errores y estadísticas de desempeño.
- **Persistencia de Estado:** Almacena progreso de examen activo y resultados en localStorage.
- **Seguridad / Control de Acceso:** Protegido por pantalla de acceso (gate), bloquea copia y selección de texto (user-select:none) para evitar trampas, meta noindex.
- **Funciones Clave en Código:** `procCheck()`, `cbRender()`, `ttCheck()`, `renderFin()`, `renderAdmin()`, `draw()`, `init()`, `updateProgress()`
- **Estructura de Secciones (`<h2>`):** Reglas del examen, ${sec.t}, Preguntas que estuvieron mal (${bad.length} de ${ex.filter(q => !q.bonus).length}), Configuración · ${EXAMS[p].titulo}, ${EXAMS[p].titulo}
- **Diagnóstico de Auditoría / Notas de Control:** Sistema de exámenes completamente desacoplado del header público para garantizar condiciones de examen controladas.

### Módulo: ESTADÍSTICA (11 Páginas)

#### `distribucion_muestral.html`
- **Título en Navegador:** Estadística - Distribución de frecuencias con datos agrupados
- **Encabezado Principal (`<h1>`):** Distribución de frecuencias con datos agrupados
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-13 15:31` | **Peso:** `125.2 KB`
- **Objetivo Pedagógico:** Laboratorio didáctico para el tratamiento de datos agrupados en intervalos de clase, distribuciones muestrales y teorema del límite central.
- **Funcionalidades e Interactividad:** Constructor dinámico de tablas de frecuencias con cálculo automático de marcas de clase (Xi), frecuencias absolutas (fi), relativas, acumuladas y porcentuales; graficador de histograma y polígono de frecuencias con Chart.js; sincronización y enlace reactivo de datos con aula-datos.js.
- **Persistencia de Estado:** Integración completa con aula-datos.js: guarda tablas y valores ingresados en localStorage.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderReal()`, `drawChart()`, `update()`, `renderViz()`, `initPops()`, `drawViz()`, `renderMeasures()`, `renderTable()`
- **Estructura de Secciones (`<h2>`):** Tus datos, Tamaño del intervalo (instructivo), Tabla de distribución de frecuencias, Intervalos animados con tus datos, Media, mediana y moda
- **Diagnóstico de Auditoría / Notas de Control:** Permite reiniciar datos con un solo clic mediante el chip de AulaDatos.

#### `medidas_dispersion.html`
- **Título en Navegador:** Estadística - Medidas de Dispersión
- **Encabezado Principal (`<h1>`):** Medidas de Dispersión
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-04 14:55` | **Peso:** `120.7 KB`
- **Objetivo Pedagógico:** Cálculo y comprensión conceptual de las medidas de dispersión: rango, desviación media, varianza poblacional/muestral, desviación estándar y coeficiente de variación.
- **Funcionalidades e Interactividad:** Ingreso interactivo de conjuntos de datos con cálculo dinámico e instantáneo de todos los estadísticos de dispersión, desglose visual de desviaciones individuales respecto a la media, gráfica comparativa de dispersión con Chart.js, persistencia reactiva.
- **Persistencia de Estado:** Integración completa con aula-datos.js (guarda tablas y listas en localStorage).
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderReal()`, `drawChart()`, `renderForm()`, `update()`, `initPops()`, `genFi()`, `renderTiles()`, `renderDetail()`
- **Estructura de Secciones (`<h2>`):** Límites y número de clases, Tamaño del intervalo (instructivo), Tabla de cálculo y resultados, Gráfica
- **Diagnóstico de Auditoría / Notas de Control:** Explica la diferencia matemática entre el divisor N y n-1 (corrección de Bessel).

#### `amplitudes.html`
- **Título en Navegador:** Estadística - Amplitudes de Clase
- **Encabezado Principal (`<h1>`):** Amplitudes de clase
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:05` | **Peso:** `161.2 KB`
- **Objetivo Pedagógico:** Determinación y cálculo de amplitudes de clase, número de intervalos (regla de Sturges k = 1 + 3.322 log n) y límites reales para tablas de frecuencias.
- **Funcionalidades e Interactividad:** Calculadora automatizada de rango (R), intervalos (k) y amplitud (c), generador interactivo de intervalos abiertos/cerrados, tabla dinámica con verificación de cobertura de datos mínimos y máximos, integración con persistencia local.
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderReal()`, `update()`, `initPops()`, `genW()`, `renderManIndex()`, `renderWStatus()`, `renderAmpTbl()`, `drawViz()`
- **Estructura de Secciones (`<h2>`):** Límites y número de clases, Tabla de frecuencias, Amplitud: fórmula y cómo calcularla, Media, mediana y moda con la amplitud, Manual
- **Diagnóstico de Auditoría / Notas de Control:** Guarda automáticamente cualquier modificación que el estudiante haga en los datos de prueba.

#### `cuartiles_percentiles.html`
- **Título en Navegador:** Matemáticas - Cuartiles y percentiles
- **Encabezado Principal (`<h1>`):** Cuartiles, percentiles y regla empírica
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:05` | **Peso:** `179.4 KB`
- **Objetivo Pedagógico:** Cálculo, interpretación y representación de medidas de posición no central: cuartiles (Q1, Q2, Q3), deciles y percentiles para datos agrupados y no agrupados.
- **Funcionalidades e Interactividad:** Algoritmo de cálculo por interpolación lineal para datos en intervalos, generador interactivo de diagrama de caja (boxplot) con identificación de valores atípicos (outliers), tabla de frecuencias vinculada con persistencia de estado.
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderForm()`, `renderAllData()`, `renderST()`, `renderC8()`, `renderS6()`, `renderS4()`, `plot()`, `renderS2()`
- **Estructura de Secciones (`<h2>`):** ${title}
- **Diagnóstico de Auditoría / Notas de Control:** Muestra la fórmula aplicada paso a paso con los valores sustituidos en tiempo real.

#### `correlacion_lineal.html`
- **Título en Navegador:** Estadística - Correlación lineal
- **Encabezado Principal (`<h1>`):** Correlación lineal
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-13 15:31` | **Peso:** `133.2 KB`
- **Objetivo Pedagógico:** Análisis bivariado: diagrama de dispersión, coeficiente de correlación lineal de Pearson (r), covarianza y recta de regresión por mínimos cuadrados (y = mx + b).
- **Funcionalidades e Interactividad:** Editor dinámico de pares de datos (X, Y), cálculo simultáneo de sumatorias, visualización interactiva del diagrama de dispersión con la recta ajustada en canvas, estimador de predicción de Y dado X.
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderForm()`, `update()`, `renderDataFoot()`, `initPops()`, `renderS6()`, `initRectaInteractiva()`, `renderSums()`, `renderPred()`
- **Estructura de Secciones (`<h2>`):** Tus datos: pares (x, y), Covarianza, Coeficiente de correlación de Pearson ($r$), Pendiente ($m$), Ordenada al origen ($b$)
- **Diagnóstico de Auditoría / Notas de Control:** Permite importar y restablecer conjuntos de datos bivariados estándar.

#### `probabilidad.html`
- **Título en Navegador:** Estadística - Probabilidad
- **Encabezado Principal (`<h1>`):** Probabilidad
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:05` | **Peso:** `248.8 KB`
- **Objetivo Pedagógico:** Estudio interactivo de la probabilidad clásica, frecuencial y subjetiva, diagramas de árbol, reglas de adición y multiplicación, y probabilidad condicional.
- **Funcionalidades e Interactividad:** Simulador de lanzamientos aleatorios masivos (dados, monedas, urnas) para ilustrar la ley de los grandes números mediante Chart.js, constructor dinámico de diagramas de Venn para eventos mutuamente excluyentes y no excluyentes, calculadora de probabilidad condicional con teorema de Bayes.
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `unSim()`, `monSim()`, `switchesInit()`, `revealInit()`, `navInit()`, `renderAll()`, `reset()`, `draw()`
- **Estructura de Secciones (`<h2>`):** Experimento, espacio muestral Ω y vectores, Eventos y probabilidad clásica, Enfoques de la probabilidad, Tablas de contingencia y reglas básicas, Diagrama de árbol
- **Diagnóstico de Auditoría / Notas de Control:** Simulación Monte Carlo en vivo con miles de iteraciones sin congelar la interfaz.

#### `funcion_distribucion_probabilidad.html`
- **Título en Navegador:** Estadística - Función de distribución de probabilidad
- **Encabezado Principal (`<h1>`):** Función de distribución de probabilidad
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:05` | **Peso:** `249.4 KB`
- **Objetivo Pedagógico:** Variables aleatorias discretas, funciones de probabilidad P(X=x), función de distribución acumulada F(x), esperanza matemática E(X) y varianza.
- **Funcionalidades e Interactividad:** Constructor interactivo de distribuciones de probabilidad discretas con validación de axiomas (suma de P(x) = 1), cálculo automático de valor esperado y varianza, graficador de función escalonada y bastones con Chart.js, persistencia de variables.
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `lgReset()`, `navInit()`, `eventsInit()`, `pqCalc()`, `quizOf()`, `renderAll()`
- **Estructura de Secciones (`<h2>`):** Problema guiado: del enunciado a la FDP, Recordando: función, dominio, codominio y rango, Intervalos abiertos y cerrados: círculo vacío ○ y relleno ●, Variable aleatoria: una regla que convierte resultados en números, ¿Cuándo una tabla es una FDP? Condiciones y la constante k
- **Diagnóstico de Auditoría / Notas de Control:** Alerta visual en caso de que la suma de probabilidades no sea exactamente 1.

#### `distribucion_binomial.html`
- **Título en Navegador:** Estadística - Distribución binomial
- **Encabezado Principal (`<h1>`):** Distribución binomial
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:05` | **Peso:** `289.8 KB`
- **Objetivo Pedagógico:** Modelo binomial de probabilidad B(n, p): experimentos de Bernoulli, combinaciones, probabilidades puntuales y acumuladas.
- **Funcionalidades e Interactividad:** Calculadora binomial interactiva con control de n (ensayos) y p (éxito), visualización del histograma binomial en tiempo real con Chart.js, cálculo de mu = np y sigma = sqrt(npq), resolución paso a paso de problemas comunes ('al menos k', 'a lo sumo k').
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `navInit()`, `sd2Calc()`, `niceStep()`, `phSimR()`, `eventsInit()`, `smReset()`, `sbInit()`, `renderAll()`
- **Estructura de Secciones (`<h2>`):** Principios de conteo: multiplicar y sumar, Factorial: ordenar n elementos, Permutaciones: el orden importa, Combinaciones: el orden NO importa, ¿Permutación o combinación? Tú decides
- **Diagnóstico de Auditoría / Notas de Control:** Una de las herramientas más potentes y solicitadas por alumnos de Estadística II (289.8 KB).

#### `distribucion_normal.html`
- **Título en Navegador:** Estadística - Distribución normal
- **Encabezado Principal (`<h1>`):** Distribución normal
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:05` | **Peso:** `181.3 KB`
- **Objetivo Pedagógico:** Distribución normal estándar N(0, 1) y general N(mu, sigma): campana de Gauss, estandarización Z = (X-mu)/sigma, cálculo de áreas y aplicaciones.
- **Funcionalidades e Interactividad:** Simulador interactivo de la campana de Gauss donde el alumno sombrea regiones (cola izquierda, cola derecha, entre dos valores), cálculo de probabilidad exacta con algoritmo numérico, regla empírica 68-95-99.7 interactiva, generador de problemas inversos (dada el área encontrar Z o X).
- **Persistencia de Estado:** Integración con aula-datos.js.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `navInit()`, `eventsInit()`, `niceStep()`, `renderAll()`, `solve()`
- **Estructura de Secciones (`<h2>`):** La campana nace de la binomial, Del histograma a la curva de densidad, Anatomía de la campana: μ, σ y áreas, La regla empírica: 68 – 95 – 99.7, Normal estándar y la tabla Z
- **Diagnóstico de Auditoría / Notas de Control:** Evita el uso de tablas impresas de Z al proporcionar el valor y la gráfica en tiempo real.

#### `proyectos_finales_eyp.html`
- **Título en Navegador:** Proyectos finales EyP
- **Encabezado Principal (`<h1>`):** Proyecto final de Estadística y Probabilidad
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-10-27 15:04` | **Peso:** `78.1 KB`
- **Objetivo Pedagógico:** Plataforma de presentación, rúbricas, especificaciones y lineamientos para los proyectos finales de investigación de Estadística y Probabilidad I y II.
- **Funcionalidades e Interactividad:** Guía estructurada del protocolo de investigación escolar (planteamiento del problema, diseño de encuesta, muestreo, análisis descriptivo/inferencial, conclusiones), vistas diferenciadas por semestre (EyP I vs EyP II), formularios de consulta y descarga de formatos.
- **Persistencia de Estado:** Estado de pestañas en sesión.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** Scripts estándar
- **Estructura de Secciones (`<h2>`):** Estadística y Probabilidad I, Estadística y Probabilidad II, Acceso, ¿En qué consiste?, Datos obligatorios de la portada
- **Diagnóstico de Auditoría / Notas de Control:** Diseño claro y ordenado para consulta estudiantil durante el cierre de semestre.

#### `examenes_estadistica.html`
- **Título en Navegador:** Examen de Estadística
- **Encabezado Principal (`<h1>`):** Usa una computadora
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-05 16:17` | **Peso:** `199.9 KB`
- **Objetivo Pedagógico:** Sistema integral de evaluación y exámenes cronometrados para la asignatura de Estadística y Probabilidad.
- **Funcionalidades e Interactividad:** Puerta de acceso con validación de matrícula y grupo, temporizador configurable con opción oculta, cuadrícula de seguimiento de preguntas, preguntas de opción múltiple y respuesta numérica calculada con tolerancias de redondeo, retroalimentación detallada y reporte de calificación.
- **Persistencia de Estado:** Almacena progreso y examen activo en localStorage.
- **Seguridad / Control de Acceso:** Protegido por pantalla de acceso (gate), bloquea copia y selección de texto (user-select:none), meta noindex.
- **Funciones Clave en Código:** `procCheck()`, `renderFin()`, `renderAdmin()`, `init()`, `updateProgress()`, `renderTabs()`, `renderMalas()`
- **Estructura de Secciones (`<h2>`):** Reglas del examen, ${sec.t}, Preguntas que estuvieron mal (${bad.length} de ${ex.length}), Configuración · ${EXAMS[p].titulo}, ${EXAMS[p].titulo}
- **Diagnóstico de Auditoría / Notas de Control:** Alineado con el sistema de cibernética para estandarizar evaluaciones en laboratorio.

### Módulo: EXTRAS (6 Páginas)

#### `Extras/guia_conamat.html`
- **Título en Navegador:** Guía CONAMAT UNAM
- **Encabezado Principal (`<h1>`):** Mi avance
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-04 14:53` | **Peso:** `736.9 KB`
- **Objetivo Pedagógico:** Guía de estudio interactiva basada en el temario CONAMAT para el examen de ingreso a licenciatura de la UNAM.
- **Funcionalidades e Interactividad:** Macro-guía (736.9 KB) con temario completo organizado por materias (Aritmética, Álgebra, Geometría, Trigonometría, Geometría Analítica, Cálculo Diferencial e Integral), simulador interactivo de reactivos tipo examen con temporizador, registro de avance porcentual por materia, gráficas de rendimiento con Chart.js.
- **Persistencia de Estado:** Guarda porcentaje de avance, banco de respuestas y estadísticas en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `draw()`, `simulatorView()`, `unitQuizCard()`, `bindUnitQuiz()`, `simple()`, `bindSimulator()`, `startQuiz()`
- **Estructura de Secciones (`<h2>`):** Buscar en la guía, Materias, Mi avance, Cómo usar esta guía, ${s.n}
- **Diagnóstico de Auditoría / Notas de Control:** Contiene CSS embebido masivo (Bootstrap inlined). Se detectó etiqueta <title> colocada dentro de <body>.

#### `Extras/libre_office.html`
- **Título en Navegador:** Curso LibreOffice para docentes
- **Encabezado Principal (`<h1>`):** Uso de LibreOffice para la elaboración de materiales didácticos y recursos educativos digitales
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-03 15:35` | **Peso:** `113.1 KB`
- **Objetivo Pedagógico:** Curso-taller en línea para el profesorado del CCH sobre el uso pedagógico de la suite LibreOffice (Writer, Calc, Impress, Math) para la creación de materiales educativos digitales.
- **Funcionalidades e Interactividad:** Ruta formativa de 5 sesiones de trabajo, glosario interactivo de conceptos clave, tabla de atajos de teclado con buscador, cuestionarios de autoevaluación por sesión con retroalimentación, guías de práctica descargables.
- **Persistencia de Estado:** Avance de lecciones y respuestas guardadas en localStorage.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `draw()`, `quiz()`, `renderDoc()`, `renderConcepts()`, `renderShortcuts()`, `renderGuide()`, `renderSession()`, `renderEx()`
- **Estructura de Secciones (`<h2>`):** Datos generales, Ruta de las cinco sesiones, Conceptos clave, Atajos de teclado, Laboratorio: seguimiento académico
- **Diagnóstico de Auditoría / Notas de Control:** Paleta visual verde institucional de LibreOffice / Calc con diseño modular.

#### `Extras/tacur_ia-pia.html`
- **Título en Navegador:** IA, para el PIA · Taller de recursos interactivos
- **Encabezado Principal (`<h1>`):** Convierte una actividad tuya en un recurso interactivo
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-13 18:09` | **Peso:** `31.9 KB`
- **Objetivo Pedagógico:** Taller docente 'IA, para el PIA' enfocado en convertir actividades docentes convencionales en recursos interactivos utilizando inteligencia artificial y prompts pedagógicos.
- **Funcionalidades e Interactividad:** Ruta interactiva de 4 etapas: formatos y operaciones intelectuales, taxonomía de métodos de prompt (cadena de pensamiento, pocos ejemplos, rol, desglose de tareas), taller guiado paso a paso con área de pruebas para generar recursos.
- **Persistencia de Estado:** Estado de interacción en memoria.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `acDraw()`, `acInit()`
- **Estructura de Secciones (`<h2>`):** Ruta del curso, Formatos y operaciones intelectuales, Métodos de prompt, adaptados a la docencia, Taller paso a paso, Ejercicios
- **Diagnóstico de Auditoría / Notas de Control:** Se detectó script externo inyectado de un bloqueador de anuncios (AdGuard) en la cabecera que debe removerse en la próxima iteración.

#### `Extras/estilos_pagina_web.html`
- **Título en Navegador:** Estilos de página web — Galería visual y prompts
- **Encabezado Principal (`<h1>`):** Estilos de página web, vistos — no solo descritos.
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-13 15:31` | **Peso:** `123.9 KB`
- **Objetivo Pedagógico:** Galería visual interactiva de estilos de diseño web (Neo-brutalismo, Minimalismo editorial, Dashboard analítico, Revista científica, Terminal/Retro) con sus respectivos prompts para generación asistida por IA.
- **Funcionalidades e Interactividad:** Previsualizador interactivo de estilos con posibilidad de inyectar prompt propio, tabla comparativa de ventajas y casos de uso, generador de prompts optimizados para Google Gemini / Claude para auditoría y validación de interfaces.
- **Persistencia de Estado:** Sin persistencia local.
- **Seguridad / Control de Acceso:** Acceso libre.
- **Funciones Clave en Código:** `renderIcons()`, `renderLab()`
- **Estructura de Secciones (`<h2>`):** Previsualiza tu página con tu propio prompt, Comparativa rápida: ¿cuál elijo?, Cómo está construido cada prompt, Prompt para Gemini: revisión y validación
- **Diagnóstico de Auditoría / Notas de Control:** CSS puro sin frameworks externos; utiliza únicamente Google Fonts (Space Grotesk, Fraunces, Poppins).

#### `Extras/prompts_lab.html`
- **Título en Navegador:** Prompt Lab · Diseño web interactivo
- **Encabezado Principal (`<h1>`):** Prompt Lab
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-03 15:35` | **Peso:** `73.8 KB`
- **Objetivo Pedagógico:** Herramienta 'Prompt Lab' para análisis, optimización y prueba de prompts orientados a la creación de páginas web y aplicaciones didácticas interactivas.
- **Funcionalidades e Interactividad:** Analizador sintáctico y semántico de prompts que detecta componentes faltantes (rol, contexto, restricciones, diseño, interactividad), generador de recomendaciones de mejora, repositorio de manuales de buenas prácticas, historial y memoria de prompts analizados.
- **Persistencia de Estado:** Historial y progreso guardados en localStorage.
- **Seguridad / Control de Acceso:** Carga scripts de autenticación.
- **Funciones Clave en Código:** `renderManuals()`, `renderResult()`, `renderProgress()`, `renderMemory()`, `init()`, `renderModal()`, `renderAll()`
- **Estructura de Secciones (`<h2>`):** Analiza tu prompt, Tu progreso, Manuales, Memoria
- **Diagnóstico de Auditoría / Notas de Control:** Paleta UNAM (azul #00205B y oro #E8A900). No contiene <div id='app-header'></div> en el DOM.

#### `Extras/proyecto_siladin_estres.html`
- **Título en Navegador:** Proyectos SILADIN · CCH Oriente
- **Encabezado Principal (`<h1>`):** 
- **Versión:** `v1.0.0` | **Última Modificación:** `2026-11-04 19:40` | **Peso:** `179.5 KB`
- **Objetivo Pedagógico:** Portal de investigación científica y laboratorio estadístico del proyecto SILADIN CCH Oriente: 'Relación entre estrés académico, funciones cognitivas y desempeño académico'.
- **Funcionalidades e Interactividad:** Presentación del protocolo institucional, integrantes del equipo de trabajo, marco teórico de neurocognición y estrés, laboratorio de datos interactivo con cálculo de correlaciones de Pearson/Spearman, análisis de variables agrupadas y bitácora de seguimiento.
- **Persistencia de Estado:** Bitácoras y estado guardados en localStorage.
- **Seguridad / Control de Acceso:** Integrado con aula-header.js.
- **Funciones Clave en Código:** `renderCorr()`, `renderPend()`, `renderLogs()`, `drawSteps()`, `renderGrouped()`, `renderCons()`, `initReveal()`, `renderTeam()`
- **Estructura de Secciones (`<h2>`):** El proyecto, Equipo de trabajo, Fundamento teórico, Laboratorio de datos, Cronograma y avance
- **Diagnóstico de Auditoría / Notas de Control:** Articula la docencia con la investigación experimental SILADIN.

---

## 5. Cuadernillos de Ejercicios y Formularios en PDF

Ubicados en la carpeta `Cuadernillos/PDF/`, estos documentos impresos/digitales sirven como material de apoyo oficial vinculado a los cuadernillos interactivos:

| Archivo PDF | Tamaño | Páginas Asociadas | Descripción del Contenido |
|---|---|---|---|
| `est1_datos_ordenados.pdf` | 131.9 KB | `cuadernillo_estadistica1.html` | Tablas de datos numéricos ordenados para prácticas de aula y cálculo manual. |
| `est1_ejercicios.pdf` | 1.18 MB | `cuadernillo_estadistica1.html` | Problemario exhaustivo de ejercicios prácticos de Estadística y Probabilidad I. |
| `est1_formulario.pdf` | 599.9 KB | `cuadernillo_estadistica1.html` | Formulario oficial condensado de Estadística y Probabilidad I. |
| `est2_ejercicios.pdf` | 1.25 MB | `cuadernillo_estadistica2.html` | Problemario oficial de ejercicios prácticos de Estadística y Probabilidad II. |
| `est2_formulario.pdf` | 539.5 KB | `cuadernillo_estadistica2.html` | Formulario y tablas de distribuciones (Z, t, binomial) de Estadística II. |

---

## 6. Integración con Google Apps Script

El menú global en `aula-header.js` enlaza 6 soluciones web desarrolladas en **Google Apps Script** para procesos de gestión escolar y seguimiento académico:

1. **Catalogador de trayectoria CCH:** Herramienta de visualización del mapa curricular del alumno.
2. **PAE · Asistencia (formulario CCH):** Sistema de control de asistencias para el Programa de Apoyo al Egreso.
3. **Página de equipos (Forms):** Plataforma para registro de equipos de trabajo (Clave: `K88B88JP`).
4. **Página de Constancias PIA:** Generador y validador de constancias para el Programa de Iniciación a la Actividad Académica (Clave: `PIA2026`).
5. **Página de prompts:** Banco institucional de prompts para docentes y alumnos.
6. **Base de proyectos SILADIN Jóvenes:** Repositorio y seguimiento de proyectos de investigación científica escolar.

---

## 7. Hallazgos de la Auditoría Técnica y Recomendaciones

Durante la inspección de los 43 archivos se identificaron hallazgos clave que deben considerarse al dar seguimiento o realizar actualizaciones:

### 7.1 Hallazgos Identificados
1. **Disparidad en la Cabecera Global (`aula-header.js`):**
   - 25 páginas tienen integrado el header global con `#app-header`, `auth-config.js` y `aula-header.js`.
   - Las 8 páginas de `Programas_2024/` utilizan su propia barra `.pbar` y no incluyen un botón directo para regresar al `index.html` general.
   - Los 2 `Cuadernillos/` utilizan una arquitectura de aplicación independiente con riel lateral (`.rail`), idónea para lectura inmersiva.
   - Las páginas de evaluación (`examenes_cibernetica.html`, `examenes_estadistica.html`) omiten deliberadamente el header para mantener un entorno de examen seguro y cronometrado.

2. **Scripts de Terceros Inyectados por Bloqueadores:**
   - En `Extras/tacur_ia-pia.html` (líneas 5-6) se identificó un tag `<script src='//local.adguard.org?...'>` inyectado por un software de filtrado local durante una descarga. **Recomendación:** Eliminar estas dos líneas para mantener el código limpio e independiente de redes locales.

3. **Estructura HTML en `Extras/guia_conamat.html`:**
   - Se identificó que las etiquetas `<title>` y los `<link>` tipográficos se encuentran ubicados dentro del bloque `<body>`. Aunque los navegadores modernos lo renderizan correctamente, se aconseja reubicarlos dentro de `<head>` para optimizar el estándar W3C.

4. **Potencial de Expansión de `aula-datos.js`:**
   - Actualmente, `aula-datos.js` se explota al máximo en las páginas de **Estadística** (distribución muestral, medidas de dispersión, amplitudes, cuartiles, correlación, probabilidad, binomial, normal). Este mismo mecanismo puede extenderse fácilmente a las páginas de **Matemáticas** y **Cibernética** para que los alumnos no pierdan sus ejercicios al recargar la página.

---

## 8. Protocolo para Control de Versiones y Solicitud de Cambios

Para dar seguimiento ordenado a futuras modificaciones, se establece el siguiente estándar:

### 8.1 Nomenclatura de Versiones (SemVer)
- **MAJOR (`vX.0.0`):** Reestructuración integral del sitio, cambio de programas de estudio UNAM o rediseño completo de arquitectura.
- **MINOR (`v1.X.0`):** Inclusión de una nueva página didáctica, nuevo módulo temático, o integración de simuladores interactivos adicionales.
- **PATCH (`v1.0.X`):** Corrección de erratas en fórmulas, ajustes de CSS/responsive, corrección de tolerancias en calculadoras o actualización de enlaces.

### 8.2 Formato Recomendado para Solicitar Cambios
Al solicitar un cambio sobre cualquier archivo de este repositorio, especificar:
```markdown
Solicitud de Cambio:
- Archivo destino: [p. ej. correlacion_lineal.html]
- Sección / Elemento: [p. ej. Calculadora de regresión lineal]
- Descripción del cambio: [p. ej. Agregar cálculo del coeficiente de determinación R²]
- Impacto en persistencia: [¿Afecta aula-datos.js? Sí/No]
- Versión resultante: [p. ej. v1.1.0]
```

---

### 8.3 Registro Histórico de Versiones (Changelog)

- **v1.0.0 (17-Nov-2026):**
  - Auditoría técnica completa de las 43 páginas HTML del repositorio.
  - Catalogación detallada de especificaciones, funciones interactivas y librerías externas.
  - Mapeo de persistencia en cliente (`aula-datos.js`) y sistema de navegación (`aula-header.js`).
  - Creación del `README.md` técnico para control de versiones permanente.
