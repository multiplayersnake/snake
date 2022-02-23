const fileRegex = /\.(ico|svg|jpe?g|png|gif|eot|woff2?|ttf|mp3|fbx)$/;

const loaders = {
  client: {
    test: fileRegex,
    type: 'asset/resource',
    generator: {
      filename: 'static/[name][contenthash][ext]'
    }
  },
  server: {
    test: fileRegex,
    type: 'asset/resource',
    generator: {
      filename: 'static/[name][contenthash][ext]'
    }
  }
};

export default loaders;
