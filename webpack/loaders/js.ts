const loaders = {
  client: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: { loader: 'ts-loader' }
  },
  server: {
    test: /\.ts(x?)$/,
    exclude: /node_modules/,
    use: { loader: 'ts-loader' }
  }
};

export default loaders;
