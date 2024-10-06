import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import path from 'path';

// Read package.json to get the file name
const packageJsonRoot = JSON.parse(
  readFileSync(path.join(__dirname, '../../../package.json'), 'utf8'),
);

const packageJsonRelease = JSON.parse(
  readFileSync(
    path.join(__dirname, '../../../release/app/package.json'),
    'utf8',
  ),
);

const fileName = `${packageJsonRoot.build.productName}-${packageJsonRelease.version}-universal.pkg`;

function copyPkgToDesktop() {
  //copy pkg to desktop
  execSync(
    `cp ${path.join(__dirname, `../../../release/build/${fileName}`)} ${path.join(__dirname, '../../../../../../Desktop/')}`,
  );
}

copyPkgToDesktop();
