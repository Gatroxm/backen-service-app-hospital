# Servicios AppHospital

> instalaciones Necesarias para la aplicación

```
npm install
```

> Ejecutar la aplicación

```
npm start
```
> Recuerda que para esta aplicación debes tenerner mongodb instalado

## Servicios
> Usuarios
> Login --- Post
```
{{url}}/login
```
> Obtener usuarios --- Get
```
{{url}}/usuario?desde=5 
```
> Crear usuarios --- Post
```
{{url}}/usuario?token={{token}}
```
> Eliminar usuarios --- Delete
```
{{url}}/usuario/5ed927d2b5439c194c5f42e8/?token={{token}}
```
> Editar usuarios --- Put
```
{{url}}/usuario/5ed91615803dc52b48c93586/?token={{token}}
```

> Hospitales

> Obtener Hospitales --- Get
```
{{url}}/hospital?desde=5 
```
> Crear Hospitales --- Post
```
{{url}}/hospital?token={{token}}
```
> Eliminar Hospitales --- Delete
```
{{url}}/hospital/5ed927d2b5439c194c5f42e8/?token={{token}}
```
> Editar Hospitales --- Put
```
{{url}}/hospital/5ed91615803dc52b48c93586/?token={{token}}
```

> Médicos

> Obtener Médicos --- Get
```
{{url}}/medico?desde=5 
```
> Crear Médicos --- Post
```
{{url}}/medico?token={{token}}
```
> Eliminar Médicos --- Delete
```
{{url}}/medico/5ed927d2b5439c194c5f42e8/?token={{token}}
```
> Editar Médicos --- Put
```
{{url}}/medico/5ed91615803dc52b48c93586/?token={{token}}
```

> Servicios adicionales cargar imagenes - busqueda general y espesifica por colección
> busqueda general
```
{{url}}/busqueda/todo/a
```
> busqueda espesifica por colección
```
{{url}}/busqueda/colleccion/usuarios/a
{{url}}/busqueda/colleccion/medicos/a
{{url}}/busqueda/colleccion/hospitales/a
```
> Cargar imagenes y asociarlas a un Hospital, Usuario o Medico
```
{{url}}/upload/hospitales/5ed969ca1686d125e0e6031f
{{url}}/upload/usuarios/5ed92b35a9d68703a89bd670
{{url}}/upload/medicos/5ed96a1e1686d125e0e60322
```
> Extra Imagenes: Buscar y validas si la imagen existe
```
{{url}}/img/hospitales/5ed969ca1686d125e0e6031f-79.jpg
{{url}}/img/usuarios/5ed969ca1686d125e0e6031f-79.jpg
{{url}}/img/medicos/5ed969ca1686d125e0e6031f-79.jpg
```
### Servicios desarrollados por Gustavo Adolfo Muñoz Reyes. 
### Correo tavoxpau@gmail.com
### Teléfono 3133976999