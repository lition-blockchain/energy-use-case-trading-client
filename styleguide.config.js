const path = require('path');

module.exports = {
    assetsDir: path.join(__dirname, '/public'),
    require: [path.join(__dirname, '/src/index.css')],
    title: 'Nordic Energy Web Components List',
    ignore: ['**/*.test.js', '**/*index.js'],
    sections: [{ name: 'Web Components', components: 'src/components/**/*.js' }],
    skipComponentsWithoutExample: true,
    getExampleFilename: componentpath =>
        componentpath.replace(/\.js$/, '.doc.md')
};
