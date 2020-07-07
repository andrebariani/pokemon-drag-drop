import {writeFileSync, readFileSync} from 'fs';

const targetPath = './src/environments/environment.prod.ts';

const envConfigFile = readFileSync(targetPath);

writeFileSync(targetPath, envConfigFile, 'utf8');
