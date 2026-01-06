# Sistema de Blog Posts con Secciones

Este sistema soporta dos tipos de artículos:

## 1. Artículos simples (tradicionales)

Archivo único en la raíz de `content/blog/`:

```
content/blog/
  └── mi-articulo.md
```

**Acceso**: `/blog/mi-articulo`

## 2. Artículos con múltiples secciones

Carpeta con varios archivos markdown:

```
content/blog/
  └── guia-speedcubing/
      ├── index.md          (Pestaña por defecto - Introducción)
      ├── primeros-pasos.md
      ├── tecnicas-avanzadas.md
      └── competir.md
```

**Acceso**:

- `/blog/guia-speedcubing` → muestra `index.md`
- `/blog/guia-speedcubing/primeros-pasos` → muestra esa sección
- etc.

## Frontmatter para artículos multi-sección

Cada archivo `.md` dentro de la carpeta debe incluir:

```yaml
---
title: "Título de la sección"
excerpt: "Descripción breve"
date: 2025-12-15
author: "Nombre"
authorRole: "Rol"
authorAvatar: "https://..."
category: "Categoría"
image: "https://..."
multiSection: true           # Marca que es parte de un artículo con secciones
tabLabel: "Texto de la pestaña"  # Nombre que aparece en la navegación
---
```

## Navegación

El componente `ArticleTabs` genera automáticamente pestañas basadas en:

- Todos los archivos `.md` dentro de la carpeta
- El orden alfabético (excepto `index.md` que va primero)
- El `tabLabel` de cada archivo

## Listado de blog

En el listado principal (`/blog`), los artículos multi-sección aparecen como una sola entrada usando el `index.md` como representante.

## Ejemplo completo

Ver `content/blog/guia-speedcubing/` para un ejemplo funcional con 4 secciones:

1. Introducción (index.md)
2. Primeros Pasos
3. Técnicas Avanzadas
4. Competir
