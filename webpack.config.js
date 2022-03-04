const path = require('path') 

module.exports = {
  entry: {
      publisher:"./src/publisher/index.js",
      subscriber:"./src/subscriber/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
  },
  target:"node"
}