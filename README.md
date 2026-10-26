# Speedcubing Colombia - Sitio Web

Bienvenido al repositorio del sitio web oficial de Speedcubing Colombia. Aquí encontrarás toda la información relevante sobre competencias, noticias, artículos y recursos para la comunidad de cubo Rubik en Colombia y Latinoamérica.

Este proyecto está pensado para ser colaborativo. Para aportar artículos, noticias o recursos, ¡sigue leyendo para aprender cómo hacerlo fácilmente, incluso si no eres programador!

## 🖥️ ¿Cómo abrir el proyecto en VSCode online?

1. Ingresa al repositorio en GitHub.
2. Presiona la tecla `.` (punto) en tu teclado, o haz clic en el botón "Code" y selecciona "Open with Codespaces" o "Open in GitHub.dev".
3. El editor de VSCode online se abrirá en tu navegador, permitiéndote navegar y editar los archivos Markdown fácilmente.

No necesitas instalar nada en tu computador. Todo se hace desde el navegador.

## 🗂️ Estructura del Proyecto

El contenido principal del sitio, incluyendo los artículos del blog, está organizado en carpetas dentro de `src/content/blog/`.

Por ejemplo:

```
src/
   content/
      blog/
         sample.md
         en/
            sac-2026/
               index.md
               ...
         pt/
            sac-2026/
               index.md
               ...
         sac-2026/
            index.md
            ...
```

Cada archivo `.md` (Markdown) representa un artículo o sección del blog. Hay subcarpetas para diferentes idiomas (`en`, `pt`, español por defecto) y eventos.

Puedes agregar nuevos artículos simplemente creando un archivo Markdown en la carpeta correspondiente.

## ✍️ ¿Cómo colaborar en el blog?

¡Colaborar es muy fácil y no necesitas ser programador! Solo necesitas una cuenta de GitHub y usar el editor online de VSCode (llamado "Codespaces" o "VSCode online").

### Pasos para agregar o editar un artículo

1. **Abre el repositorio en GitHub:**
   - Ve a [https://github.com/speedcubingcolombia/website/tree/dev](https://github.com/speedcubingcolombia/website/tree/dev).

2. **Abre el proyecto en VSCode online:**
   - Presiona la tecla `.` (punto) en la página del repositorio para abrir el editor online.

3. **Navega a la carpeta del blog:**
   - En el panel izquierdo, abre `src/content/blog/`.
   - Elige el idioma y evento, o crea un nuevo archivo `.md` si quieres agregar un artículo nuevo.

4. **Edita o crea tu artículo:**
   - Haz clic en el archivo Markdown que quieres editar, o crea uno nuevo (por ejemplo, `mi-articulo.md`).
   - Escribe tu contenido usando formato Markdown. Puedes copiar la estructura de otros archivos como ejemplo.

5. **Guarda los cambios y crea un Pull Request:**
   - En la barra izquierda, haz clic en `Control de Código Fuente`.
   - Escribe un mensaje describiendo los cambios que realizaste.
   - Finalmente, haz clic en "Commit changes" o "Guardar cambios".

### Consejos para escribir en Markdown

- Usa `#` para títulos, `##` para subtítulos.
- Usa `*texto*` o `_texto_` para cursiva, `**texto**` para negrita.
- Para listas, usa `-` o `*` al inicio de cada línea.
- Puedes insertar imágenes y enlaces fácilmente.
- Si tienes dudas, revisa otros archivos `.md` como ejemplo o consulta la [Guía de Markdown de GitHub](https://guides.github.com/features/mastering-markdown/).
- Antes de subir imágenes, redúcelas (por ejemplo con [Squoosh](https://squoosh.app)): máximo unos 1920 px de ancho y, si se puede, menos de 300 KB.
