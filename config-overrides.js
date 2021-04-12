const {override, fixBabelImports, addLessLoader} = require('customize-cra');
const rewirePostcss = require('react-app-rewire-postcss')

module.exports = override(
    fixBabelImports('import',{
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        javascriptEnabled: true,
        modifyVars: {'@primary-color': '#1DA57A'},
    }),
    (config, env) => {
        rewirePostcss(config,{
            plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('postcss-preset-env')({
                    autoprefixer: {
                        flexbox: 'no-2009',
                    },
                    stage: 3,
                }),
                require('postcss-px2rem-exclude')({
                    remUnit: 75,
                    exclude: /node_modules/i
                })
            ],
        });
        return config
    }
);
