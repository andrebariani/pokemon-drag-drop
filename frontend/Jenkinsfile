node {
    try {
        stage 'clone'
        git 'https://github.com/andrebariani/pokemon-drag-drop'
        stage 'install'
        bat label: '', script: 'npm install --save-dev @angular/cli@latest'
        stage 'set global'
        bat label: '', script: 'git config --global user.email "andrebariani@gmail.com" && git config --global user.name "andrebariani"'
        stage 'test and buid'
        bat label: '', script: 'npm test && npm run ng -- build'
        stage 'update version'
        bat label: '', script: 'npm version %VERSION_TYPE% --force'
        stage 'push'
        bat label: '', script: "git push https://%GIT_USERNAME%:%GIT_PASSWORD%@github.com/andrebariani/pokemon-drag-drop && git push https://%GIT_USERNAME%:%GIT_PASSWORD%@github.com/andrebariani/pokemon-drag-drop --tags"
        stage 'archival'
        archiveArtifacts 'dist\\ProtoDnD\\**'
    } catch(err) {
        currentBuild.result = 'FAILURE'
    }
}