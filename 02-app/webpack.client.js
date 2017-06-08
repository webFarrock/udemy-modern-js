var path = require('path');
const dirname = path.resolve('./');

function createConfig(isDebug) {
    const devTool = isDebug ? 'eval-source-map' : 'source-map';
    const plugins = [];
    const cssLoader = {test: /\.css$/, loader: 'style!css'};
    const sassLoader = {test: /\.scss$/, loader: 'style!css!sass'};
    const appEntry = ['./src/client/app.js'];

    return {
        devTool: devTool,
        entry: {
            application: appEntry,
        },
        output: {
            path: path.join(dirname, 'public', 'build'),
            filename: '[name].js',
            publicPath: '/build/',
        },
        resolve: {
            alias: {
                shared: path.join(dirname, 'src', 'shared'),
            },
        },
        module: {
            loaders: [
                {test: /\.js$/, loader: 'babel', exclude: '/node_modules/'},
                {test: /\.(png|jpg|jpeg|gif|woff|ttf|svg|woff2)$/, loader: 'url-loader?limit=512'},
                cssLoader,
                sassLoader,
            ]
        },
        plugins: plugins,

    };
}

module.exports = createConfig(true);
module.exports.create = createConfig;