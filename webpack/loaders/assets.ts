const fileRegex = /\.(svg|jpe?g|png|gif|eot|woff2?|ttf|mp3|fbx)$/;

export default {
  client: {
    test: fileRegex,
    type: 'asset/resource',
    generator: {
      filename: 'static/[contenthash][ext]'
    }
  },
  server: {
    test: fileRegex,
    type: 'asset/resource',
    generator: {
      filename: 'static/[contenthash][ext]'
    }
  }
};
