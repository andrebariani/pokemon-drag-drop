const fs = require('fs');
const htmlModule = require('html');
const jsdom = require("jsdom");
const path = require('path');
const zipper = require('zip-local');
const beautify = require('js-beautify').js;
const ts = require('typescript');


const InterfaceModel = require('pokemon');
const DomUtils = require('utils/dom');
const tsFunctions = require('utils/functions');

class CodeService {
    constructor() {
        this.dom = new jsdom.JSDOM();
        this.$root = this.dom.window.document.documentElement;
        this.$body = this.dom.window.document.body;
        this.domUtils = new DomUtils(this.dom);
    }

    generateComponentToDownload(bodyFromReq, _callback) {
        let pokemonsFromReq = new PokemonModel(bodyFromReq.pokemons);
        let pokemons = pokemonsFromReq.pokemons;

        return this.generateComponentFiles(pokemons)
            .then(_ => {
                this.zipComponent();
                _callback();
            })
            .then(() => {
                const directory = 'resources/captured-pokemons';
                fs.readdir(directory, (err, files) => {
                    if (err) throw err;

                    for (const file of files) {
                        fs.unlink(path.join(directory, file), err => {
                            if (err) throw err;
                        });
                    }
                });
            })
            .catch(err => {
                throw err;
            });
        ;
    }

    generateFiles(pokemons) {
        fs.mkdirSync('resources/generated-component', { recursive: true });
        return Promise.all([
            this.generateHtml(pokemons),
            this.generateCss(),
            this.generateFunctionsJs()]);
    }

    generateHtml(pokemons) {
        return new Promise((resolve, reject) => {
            try {
                pokemons.forEach((poke) => {
                    let node = this.domUtils.getNode(poke);
                    this.domUtils.updateElement(this.$body.firstChild, node);
                });

                let linkCssNode = {
                    tag: 'link',
                    props: {
                        href: "forms.component.css",
                        type: "text/css",
                        rel: "stylesheet"
                    },
                    children: []
                }
                let script = {
                    tag: 'script',
                    props: {
                        src: "formsValidation.js",
                        type: "text/javascript"
                    },
                    children: []
                }
                this.domUtils.updateElement(this.$body, script);
                this.domUtils.updateElement(this.$body, linkCssNode);

                let formsHtmlCode = htmlModule.prettyPrint(this.$body.innerHTML);
                fs.appendFileSync('resources/captured-pokemons/template.html', formsHtmlCode);
            } catch (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        });
    }

    generateCss() {
        return new Promise((resolve, reject) => {
            fs.copyFile('./src/resources/src-codes/forms/forms.component.css', './src/resources/generated-component/forms/forms.component.css', function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                }
                else {
                    resolve();
                }
            });
        });
    }

    generateFunctionsJs() {
        return new Promise((resolve, reject) => {
            for (let [key, value] of Object.entries(functions)) {
                fs.appendFileSync('resources/captured-pokemons/function.js', value);
            }
        });
    }

    zipComponent() {
        zipper.sync.zip("resources/captured-pokemons").compress().save("captured-pokemons.zip");
    }
}