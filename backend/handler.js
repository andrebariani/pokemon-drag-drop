'use strict';
const CodeService = require('./codeService');

module.exports.handler = async event => {
  const codeService = new CodeService();
  console.log(JSON.parse(event));
  codeService.generateToDownload(JSON.parse(event), () => {
    return {
      statusCode: 200,
      body: JSON.stringify(
        {
          message: 'Go Serverless v1.0! Your function executed successfully!',
          input: event,
          output: CodeService.generatedFile,
          type: 'application/zip'
        }
      ),
    };
  });
};
