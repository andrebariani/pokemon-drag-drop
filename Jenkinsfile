node {
    try {
        stage 'clone'
        git 'https://github.com/andrebariani/pokemon-drag-drop'
        stage 'install'
        bat label: '', script: 'npm install --save-dev @angular/cli@latest'
        stage 'test'
        bat label: '', script: 'npm test'
        stage 'build'
        bat label: '', script: 'npm run ng -- build'
        stage 'archival'
        archiveArtifacts 'dist\\ProtoDnD\\**'
    } catch(err) {
        currentBuild.result = 'FAILURE'
    }
}
