'use strict';
const CodeService = require('./codeService');

module.exports.handler = async event => {
  const codeService = new CodeService();
  let res = {};
  try {
    await codeService.generateToDownload(event, () => {
      res = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/zip',
        },
        isBase64Encoded: 'true',
        body: codeService.generatedFile,
        type: 'html/css'
      };
    });
  } catch(err) {
    res = {
      statusCode: 500,
      message: 'Internal Server Error',
      errorMessage: err,
    }
  }
  return res;
};
