Este plugin para RemNote te permite crear rápidamente tarjetas de tipo cloze (ocultar partes) a partir de texto resaltado con colores específicos dentro de un Rem. Genera dos Rems hijos, cada uno con una variante de los clozes basada en los colores amarillo y azul.

## Características

*   Transforma texto resaltado en **amarillo** (Yellow) en clozes de tipo `{{c1::...}}`.
*   Transforma texto resaltado en **azul** (Blue) en clozes de tipo `{{c2::...}}`.
*   Crea dos Rems hijos nuevos debajo del Rem original, cada uno conteniendo una de las variantes de clozes.
*   Mantiene el resto del formato del Rem original (negritas, cursivas, etc.) en los Rems hijos.
*   Elimina el resaltado de color original una vez que ha sido convertido a un cloze.

## Modo de Uso

1.  **Resalta tu Texto**:
    *   En el Rem que deseas procesar, resalta las partes del texto que quieres convertir en el primer grupo de clozes usando el color **amarillo** (el color por defecto que RemNote suele llamar "Yellow").
    *   Resalta las partes del texto para el segundo grupo de clozes usando el color **azul** (el color por defecto "Blue").
2.  **Enfoca el Rem**: Asegúrate de que el Rem que contiene los resaltados esté actualmente enfocado (el cursor debe estar en él o debe ser el Rem activo).
3.  **Ejecuta el Comando**:
    *   Abre la omnibarra de RemNote (normalmente con `Ctrl+K` en Windows/Linux o `Cmd+K` en macOS).
    *   Escribe el nombre del comando: `Editor Command` (este es el nombre por defecto, puedes cambiarlo en el código si lo deseas).
    *   Selecciona el comando de la lista y ejecútalo.
4.  **Resultado**:
    *   El plugin creará dos Rems hijos directamente debajo del Rem que procesaste.
    *   El primer Rem hijo contendrá el texto original, pero con todos los resaltados amarillos convertidos a `{{c1::texto resaltado}}`.
    *   El segundo Rem hijo contendrá el texto original, pero con todos los resaltados azules convertidos a `{{c2::texto resaltado}}`.

**Ejemplo:**

Si tu Rem original es:

> El **<span style="background-color:yellow;">sol</span>** es una estrella y la **<span style="background-color:blue;">luna</span>** es un satélite.

Después de ejecutar el comando, obtendrás dos Rems hijos:

1.  > El `{{c1::sol}}` es una estrella y la luna es un satélite.
2.  > El sol es una estrella y la `{{c2::luna}}` es un satélite.

## Instalación

1.  **Descarga el Plugin**:
    *   Ve a la sección de [Releases](https://github.com/yo-cuti/remnote-split-clozes-plugin/releases) (si has creado una) y descarga el archivo `.zip` de la última versión.
    *   O, si estás clonando el repositorio, puedes construir el plugin tú mismo (ver sección de Desarrollo).
2.  **Instala en RemNote**:
    *   Abre RemNote.
    *   Ve a `Configuración` (Settings) -> `Plugins`.
    *   En la pestaña `Todos los Plugins` (All Plugins), busca la sección `Desarrollar` (Develop) en la parte inferior.
    *   Haz clic en `Instalar desde archivo zip` (Install from zip) y selecciona el archivo `.zip` que descargaste.
    *   (Alternativa para desarrollo): Puedes usar `Cargar plugin no empaquetado` (Load unpacked plugin) y seleccionar la carpeta raíz del proyecto (o la carpeta `dist/` después de construirlo).

## Desarrollo

Si deseas modificar o contribuir al plugin:

1.  **Clona el Repositorio**:
    ```bash
    git clone https://github.com/yo-cuti/remnote-split-clozes-plugin.git
    cd remnote-split-clozes-plugin # o el nombre de tu carpeta
    ```
2.  **Instala Dependencias**:
    ```bash
    npm install
    # o
    yarn install
    ```
3.  **Desarrollo (con recarga en caliente)**:
    ```bash
    npm run dev
    # o
    yarn dev
    ```
    Luego, en RemNote, usa la opción `Cargar plugin no empaquetado` y selecciona la carpeta raíz de tu proyecto. Los cambios que hagas en el código se reflejarán automáticamente en RemNote (puede que necesites recargar el plugin o RemNote en algunos casos).
4.  **Construir para Producción**:
    ```bash
    npm run build
    # o
    yarn build
    ```
    Esto generará los archivos listos para producción en la carpeta `dist/`. Puedes comprimir esta carpeta en un archivo `.zip` para distribuirlo.

## Notas Adicionales

*   El plugin actualmente busca los colores literales "yellow" y "blue". Si tus temas de RemNote usan nombres diferentes para estos colores exactos, podría no funcionar como se espera.
*   El plugin solo procesa el contenido del Rem actualmente enfocado. No busca recursivamente en los hijos del Rem enfocado.

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles (puedes añadir un archivo `LICENSE` con el texto de la licencia MIT).