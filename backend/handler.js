'use strict';
const fs = require('fs');
const CodeService = require('./codeService');

module.exports.handler = async event => {
  console.log('o evento é: ', event)
  const codeService = new CodeService();
  let res = {};
  try {
    await codeService.generateToDownload(JSON.parse(event.body), () => {
      res = {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/zip',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        isBase64Encoded: true,
        body: codeService.generatedFile,
      };
    });
  } catch(err) {
    console.log(err);
    res = {
      statusCode: 500,
      message: 'Internal Server Error',
      errorMessage: err,
    }
  }
  return res;
};
