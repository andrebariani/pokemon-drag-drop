import {writeFileSync} from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = `export const environment = {
    production: true,
    APIendpoint: '${process.env.LAMBDA_API_ENDPOINT}',
 };
 `;

writeFileSync(targetPath, envConfigFile, 'utf8');
