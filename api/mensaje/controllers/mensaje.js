"use strict";
const { parseMultipartData, sanitizeEntity } = require("strapi-utils");

module.exports = {
  async customMail(ctx) {
    //check if ctx has mutiple files and data.
    let entity;
    if (ctx.is("multipart")) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.mensaje.create(data, { files });
    } else {
      entity = await strapi.services.mensaje.create(ctx.request.body);
    }

    // send mail through sendgrid SMTP service.
    const { nombre, apellido, correo, telefono, empresa, cargo, descripcion } =
      ctx.request.body;

    const output = `
    <h1>Tienes un nuevo mensaje desde el sitio web <bold>Aun te Espero.</bold></h1>
    <h3>Detalles del contacto</h3>
    <ul style="list-style-type:none">
      <li><bold>Nombre:</bold> ${nombre} ${apellido}</li>
      <li><bold>Correo:</bold> ${correo}</li>
      <li><bold>Telefono:</bold> ${telefono}</li>
      <li><bold>Empresa:</bold> ${empresa}</li>
      <li><bold>Cargo:</bold> ${cargo}</li>
      <li><bold>Mensaje:</bold> ${descripcion}</li>
    </ul>
    `;
    try {
      await strapi.plugins["email"].services.email.send({
        to: "alejandro.barraza1997@gmail.com",
        from: "mutualantofagasta@gmail.com",
        subject: "Aun te espero",
        html: output,
      });
    } catch (error) {
      console.log(error);
    }

    return sanitizeEntity(entity, { model: strapi.models.mensaje });
  },
};
