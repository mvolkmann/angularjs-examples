'use strict';

/**
 * This creates a file by processing all the include comments in another file.
 *
 * To use this, call the one function this module exports
 * with input and output file paths.
 *
 * Include comments have this syntax:
 * <!-- include {file-path} -->
 * They are replaced by the content of the file to which they refer.
 *
 * If the output file path already exists,
 * an error message is output and that file is not modified.
 */

function processIncludes(inPath, outPath, cb) {
  console.log('processIncludes: inPath =', inPath);
  console.log('processIncludes: outPath =', outPath);

  // Verify that this script was invoked correctly.
  if (!inPath || !outPath) {
    return cb('missing inPath and/or outPath');
  }

  var fs = require('fs');

  // Verify that outPath does not already exist.
  if (fs.existsSync(outPath)) {
    return cb(outPath + ' already exists');
  }

  // Read the input file.
  var opts = {
    encoding: 'utf8'
  };
  fs.readFile(inPath, opts, function (err, html) {
    // Verify that the input file was read successfully.
    if (err) {
      if (err.code === 'ENOENT') {
        return cb(inPath + ' not found');
      } else {
        return cb(err);
      }
    }

    // Prepare to create index.html.
    var ws = fs.createWriteStream(outPath);
    var re = /<!-- include ([^ ]+) -->/g;
    var index = 0;

    while (true) {
      // Find the next include comment.
      var match = re.exec(html);
      if (!match) break; // no more found

      // Output the text from the input file that preceded this include comment.
      var before = html.substring(index, match.index);
      //console.log('processIncludes: before = "' + before + '"');
      if (before) {
        // Do not include whitespace after the last newline.
        index = before.lastIndexOf('\n');
        ws.write(before.substring(0, index + 1));
      }

      // Output the text in the file referenced by the include comment.
      var includeFilePath = match[1];
      var includeContent = fs.readFileSync(includeFilePath, opts);
      ws.write(includeContent);

      // Move index to the character after the end of this include comment.
      index = match.index + match[0].length + 1;
    }

    // Output text from the input file that follows the last include comment.
    ws.write(html.substring(index));

    cb();
  });
}

module.exports = processIncludes;
