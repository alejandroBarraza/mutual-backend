module.exports = ({ env }) => {
  if(env("NODE_ENV") === "production"){
    return{
      upload: {
        provider: "cloudinary",
        providerOptions: {
          cloud_name: env("CLOUDINARY_NAME"),
          api_key: env("CLOUDINARY_KEY"),
          api_secret: env("CLOUDINARY_SECRET"),
        },
      },
      email: {
        provider: "sendgrid",
        providerOptions: {
          apiKey: env("SENDGRID_API_KEY"),
        },
        settings: {
          defaultFrom: env("SENDGRID_DEFAULT_FROM"),
          defaultReplyTo: env("SENDGRID_DEFAULT_REPLY_TO"),
        },
      },
      graphql: {
        endpoint: "/graphql",
        shadowCRUD: true,
        playgroundAlways: true,
        depthLimit: 100,
        apolloServer: {
          tracing: false,
        },
      },

    }
  }
  return{} 
};
