import pkg from '../package.json';
import minify from 'rollup-plugin-babel-minify';
import babel from 'rollup-plugin-babel';
import html from 'rollup-plugin-html';

const year = new Date().getFullYear();
let filename = 'ireceipt.js',
    plugins = [
        html(),
        babel({
            exclude: 'node_modules/**'
        })
    ];
if (process.env.NODE_ENV === 'production') {
    filename = 'ireceipt.min.js';
    plugins = [html(), minify()];
}

export default {
    input: 'src/js/receipt.js',
    output: {
        file: 'dist/js/' + filename,
        format: 'umd'
    },
    plugins: plugins,
    name: 'IReceipt',
    external: Object.keys(pkg.dependencies),
    globals: {
        xml2js: 'xml2js',
        'date-fns/esm': 'esm',
        'aes-js': 'aesjs',
        jsbarcode: 'JsBarcode',
        qrcode: 'QRCode'
    },
    banner: `/*!
    * iReceipt v${pkg.version} (${pkg.homepage})
    * Copyright ${year} ${pkg.author}
    * Licensed under MIT (https://github.com/kf99916/iReceipt/blob/master/LICENSE)
    */`
};
