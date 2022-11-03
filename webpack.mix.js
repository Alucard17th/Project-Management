const mix = require('laravel-mix');
const path = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue()
    .sass('resources/sass/app.scss', 'public/css')
    // .vuetify('vuetify-loader', 'resources/sass/_variables.scss')
    .disableNotifications()
    .webpackConfig({
        resolve: {
            alias: {
                //'@Services': path.resolve(__dirname, 'resources/js/services'),
                //'@Components': path.resolve(__dirname, 'resources/js/components')
                '@Service': path.resolve(__dirname, 'resources/js/services'),
                '@Component': path.resolve(__dirname, 'resources/js/components'),
                '@Pages': path.resolve(__dirname, 'resources/js/Pages'),
                '@Plugins': path.resolve(__dirname, 'resources/js/plugins')
            }
        }
    }
);
