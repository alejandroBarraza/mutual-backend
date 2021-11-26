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
    const { correo, descripcion } = ctx.request.body;
    try {
      await strapi.plugins["email"].services.email.send({
        to: "alejandro.barraza1997@gmail.com",
        from: correo,
        subject: "Aun te espero",
        text: descripcion,
      });
    } catch (error) {
      console.log(error);
    }

    return sanitizeEntity(entity, { model: strapi.models.mensaje });
  },
};
