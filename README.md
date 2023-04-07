# FRONTEND-APIREST

Frontend del API-Rest de Leonardo

La cuenta admin es:
- Email: onthetop@gmail.com
- Contraseña: 9999

## FUNCIONALIDADES

Es una web donde el administrador puede crear, editar y eliminar servicios, y la comunidad puede acceder a ellos sin tener que hacer login.

En la barra de navegación, se encuentran los siguientes enlaces:

- **MIS SERVICIOS**:
Página que pinta los datos desde mi cuenta de MongoDB.

- **SERVICIOS ESTÁTICOS**:
Los mismos servicios pero pintados de manera estática, desde el EJS.

- **SERVICIOS DINÁMICOS**:
Página que se hace un scrapping a sí misma, para recoger los servicios (desde /servicios, o sea, desde la base de datos de MongoDB).

## NOTAS

He actualizado el login con cookies, en vez del `req.header` (No habíamos dado cookies en clase todavía, por eso estaba así).

