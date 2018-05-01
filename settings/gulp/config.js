const path = require( 'path' );

/**
 * @namespace
 * @constant
 * @readonly {Object} - Container for all configuration gulp required.
 */
const config = {};

/**
 * @constant
 * @type {string} projectRoot - project root directory path.
 */
config.projectRoot = path.dirname( path.dirname( __dirname ) );

/**
 * @function       - Utilities: Recursively freeze object.
 * @param {object} - Target object to be freeze.
 */
const deepFreeze = require( `${ config.projectRoot }/lib/deep-freeze` );

/**
 * @constant
 * @type {string} staticFilesHost - URL for static files host.
 */
const staticFilesHost = require( `${ config.projectRoot }/settings/server/config` ).staticFilesHost;

/**
 * Settings: JavaScript files path.
 *
 * @constant
 * @readonly {string[]} config.js.frontend.build.src  - Array of glob of source files for building frontend JavaScript.
 * @readonly {string}   config.js.frontend.build.dest - Glob of destination directory for building frontend JavaScript.
 * @readonly {string}   config.js.frontend.lint.rule  - Glob of lint rule file for linting frontend JavaScript.
 * @readonly {string[]} config.js.frontend.lint.src   - Array of glob of source files for linting frontend JavaScript.
 * @readonly {string}   config.js.frontend.lint.dest  - Glob of destination directory for linting frontend JavaScript.
 * @readonly {string[]} config.js.backend.build.src   - Array of glob of source files for building backend JavaScript.
 * @readonly {string}   config.js.backend.build.dest  - Glob of destination directory for building backend JavaScript.
 * @readonly {string}   config.js.backend.lint.rule   - Glob of lint rule file for linting backend JavaScript.
 * @readonly {string[]} config.js.backend.lint.src    - Array of glob of source files for linting backend JavaScript.
 * @readonly {string}   config.js.backend.lint.dest   - Glob of destination directory for linting backend JavaScript.
 */
config.js = {
    frontend: {
        build: {
            src: [
                `${ config.projectRoot }/static/src/js/**/*.js`,
            ],
            dest: `${ config.projectRoot }/static/dist/js`,
        },
        lint: {
            rule: `${ config.projectRoot }/settings/lint/eslint/frontend.js`,
            src: [
                `${ config.projectRoot }/static/src/js/**/*.js`,
            ],
            dest: `${ config.projectRoot }/static/src/js`,
        },
    },
    backend: {
        build: {
            src: [
                `${ config.projectRoot }/server.js`,
                `${ config.projectRoot }/apis/**/*.js`,
                `${ config.projectRoot }/models/**/*.js`,
                `${ config.projectRoot }/routes/**/*.js`,
                `${ config.projectRoot }/settings/**/*.js`,
            ],
            dest: `${ config.projectRoot }/build`,
        },
        lint: {
            rule: `${ config.projectRoot }/settings/lint/eslint/backend.js`,
            src: [
                `${ config.projectRoot }/server.js`,
                `${ config.projectRoot }/apis/**/*.js`,
                `${ config.projectRoot }/routes/**/*.js`,
                `${ config.projectRoot }/settings/**/*.js`,
            ],
            dest: `${ config.projectRoot }`,
        },
    },
};

/**
 * Settings: Sass files path.
 *
 * @constant
 * @readonly {string[]} config.sass.build.src     - Array of glob of source files for building CSS.
 * @readonly {string} config.sass.build.dest      - Glob of destination directory for building CSS.
 * @readonly {string[]} config.sass.lint.src      - Array of glob of source files for linting CSS.
 * @readonly {string} config.sass.lint.dest       - Glob of destination directory for linting CSS.
 * @readonly {string} config.sass.static.fileName - File name of CSS static settings file.
 * @readonly {string} config.sass.static.data     - Data of CSS static settings file.
 * @readonly {string} config.sass.static.dest     - Glob of CSS static settings file.
 */
config.sass = {
    build: {
        src: [
            `${ config.projectRoot }/static/src/sass/**/*.scss`,
            `!${ config.projectRoot }/static/src/sass/components/**/*.scss`,
        ],
        dest: `${ config.projectRoot }/static/dist/css`,
    },
    lint: {
        rule: `${ config.projectRoot }/settings/lint/stylelint/stylelint.js`,
        src: [
            `${ config.projectRoot }/static/src/sass/**/*.scss`,
        ],
        dest: `${ config.projectRoot }/static/src/sass`,
    },
    static: {
        fileName: '_static.scss',
        data:
            '// this file is automatically generated\n' +
            '// don\'t change anthing because it will be overwrite next time\n' +
            `// change file content at ${ __dirname }/config.js\n` +
            `$staticRoot: '${ staticFilesHost }';\n` +
            `$projectRoot: '${ config.projectRoot }';\n` +
            '$font: \'#{ $staticRoot }/font\';\n' +
            '$image: \'#{ $staticRoot }/image\';\n' +
            '$sass: \'#{ $projectRoot }/static/src/sass\';',
        dest: `${ config.projectRoot }/static/src/sass/components/common`,
    },
};

/**
 * Settings: Pug files path.
 *
 * @constant
 * @readonly {string[]} config.pug.build.src - Array of glob of source files for building Pug.
 * @readonly {string} config.pug.build.dest  - Glob of destination directory for building Pug.
 * @readonly {string[]} config.pug.lint.src  - Array of glob of source files for linting Pug.
 * @readonly {string} config.pug.lint.dest   - Glob of destination directory for linting Pug.
 */
config.pug = {
    build: {
        src: [
            `${ config.projectRoot }/views/**/*.pug`,
        ],
        dest: `${ config.projectRoot }/static/dist/html`,
    },
    lint: {
        src: [
            `${ config.projectRoot }/views/**/*.pug`,
        ],
        dest: `${ config.projectRoot }/views/`,
    },
};

/**
 * Settings: Supported browser list.
 *
 * @constant
 * @readonly {string[]} config.browserlist - Condition for browser to be supported.
 */
config.browserlist = require( `${ config.projectRoot }/settings/browserlist/config` );

/**
 * Settings: Sourcemaps files path.
 *
 * @constant
 * @readonly {string} config.sourcemaps.dest - Glob of destination directory for building Sourcemaps.
 */
config.sourcemaps = {
    dest: '.',
};

/**
 * Settings: Nodemon files path.
 *
 * @constant
 * @readonly {string} main           - Glob of Server file restarted by nodemon.
 * @readonly {string[]} watch.src    - Array of glob of source files for nodemon to monitor.
 * @readonly {string[]} watch.ignore - Array of glob of source files for nodemon to monitor.
 */
config.nodemon = {
    main: `${ config.projectRoot }/server.js`,
    watch: {
        src: [
            ...( config.js.backend.lint.src.filter(
                glob => glob !== `${ config.projectRoot }/server.js`
            ) ),
            ...config.pug.lint.src,
        ],
        ignore: [
        ],
    },
};

module.exports =  deepFreeze( config );
