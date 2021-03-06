const fs = require('fs');
const htmlModule = require('html');
const jsdom = require("jsdom");
const path = require('path');
const zipper = require('zip-local');

const PokemonModel = require('./pokemon');
const DomUtils = require('./utils/dom');
const functions = require('./utils/functions');

const tmpPath = '/tmp/resources/'

class CodeService {
    constructor() {
        this.dom = new jsdom.JSDOM();
        this.$root = this.dom.window.document.documentElement;
        this.$body = this.dom.window.document.body;
        this.domUtils = new DomUtils(this.dom);
        this.generatedFile;
    }

    generateToDownload(bodyFromReq, _callback) {
        let pokemonsFromReq = new PokemonModel(bodyFromReq.pokemons);
        let pokemons = pokemonsFromReq.pokemons;

        return this.generateFiles(pokemons)
            .then(_ => {
                this.zipComponent();
                this.generatedFile = Buffer.from(fs.readFileSync(tmpPath + 'captured-pokemons.zip')).toString('base64');
                fs.readdirSync(tmpPath).forEach(file => fs.unlinkSync(path.join(tmpPath, file)) );
                _callback();
            })
            .catch(err => {
                throw err;
            });
    }

    generateFiles(pokemons) {
        fs.mkdirSync(tmpPath, { recursive: true });
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
                    this.domUtils.updateElement(this.$body, node);
                });

                let linkCssNode = {
                    tag: 'link',
                    props: {
                        href: "stylesheet.css",
                        type: "text/css",
                        rel: "stylesheet"
                    },
                    children: []
                }
                let script = {
                    tag: 'script',
                    props: {
                        src: "function.js",
                        type: "text/javascript"
                    },
                    children: []
                }
                this.domUtils.updateElement(this.$body, script);
                this.domUtils.updateElement(this.$body, linkCssNode);

                let formsHtmlCode = htmlModule.prettyPrint(this.$body.innerHTML);
                fs.appendFileSync(tmpPath + 'template.html', formsHtmlCode);
            } catch (err) {
                console.log(err);
                reject(err);
            }
            resolve();
        });
    }

    generateCss() {
        return new Promise((resolve, reject) => {
            fs.copyFile('./templates/stylesheet.css', tmpPath + 'stylesheet.css', function (err) {
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
            try {
                for (let [key, value] of Object.entries(functions)) {
                    fs.appendFileSync(tmpPath + 'function.js', value);
                }
            } catch (err) {
                reject(err);
            }
            resolve();
        });
    }

    zipComponent() {
        this.generatedFile = zipper.sync.zip(tmpPath).compress().save(tmpPath + "captured-pokemons.zip");
    }
}

module.exports = CodeService;