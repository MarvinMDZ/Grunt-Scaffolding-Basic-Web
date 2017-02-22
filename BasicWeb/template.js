'use strict';

// Basic template description.
exports.description = 'Create a starter schafolding for Basic Web';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('description'),
    init.prompt('author_name'),
    init.prompt('author_email'),
  ], function(err, props) {
    props.keywords = [];
    props.devDependencies = {
      'grunt': '~0.4.5',
      'grunt-contrib-copy': '~1.0.0',
      'grunt-contrib-sass': '~0.4.0',
      'grunt-contrib-jshint': '~1.1.0',
      'grunt-contrib-uglify': '~2.1.0',
      'grunt-contrib-watch': '~1.0.0'
    };

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props);

    // Generate package.json file.
    init.writePackageJSON('package.json', props);

    // All done!
    done();
  });

};