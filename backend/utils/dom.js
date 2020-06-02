const _ = require('lodash');
const functions = require('./functions');
const ts = require('typescript');

class DomUtils {

    constructor(dom) {
        this.dom = dom;
    }

    getScript() {
        let script = {
            tag: 'script',
            props: {},
            children: []
        }
        for (let [key, value] of Object.entries(functions)) {
            let functionTS = value;
            let functionJS = ts.transpileModule(functionTS, {
                compilerOptions: { module: ts.ModuleKind.CommonJS }
            }).outputText;
            script.children.push(functionJS);
        }
        return script;
    }

    /**
     * Gera o nó correspondente a ser assimilado na estrutura de árvore (Virtual DOM)
     */
    getNode(pokemon) {
        let node;
        if (pokemon.type === 'vert') {
            node = {
                tag: 'div',
                props: { className: 'my-card card-box' },
                children: [
                    {
                        tag: 'div',
                        props: {className: 'my-card-body-vert'},
                        children: []
                    }
                ]
            };
            pokemon.children.forEach(child => {
                const childNode = this.getNode(child);
                node.children[0].children.push(childNode);
            });
        }
        else if (pokemon.type === 'hor') {
            node = {
                tag: 'div',
                props: { className: 'my-card card-box' },
                children: [
                    {
                        tag: 'div',
                        props: {className: 'my-card-body-hor'},
                        children: []
                    }
                ]
            };
            pokemon.children.forEach(child => {
                const childNode = this.getNode(child);
                node.children[0].children.push(childNode);
            });
        }
        else {
            node = {
                tag: 'div',
                props: { className: 'my-card card-poke' },
                children: [
                    {
                        tag: 'div',
                        props: {className: 'my-card-header card-poke-header'},
                        children: [
                            {
                                tag: 'p',
                                props: {className: 'name'},
                                children: [pokemon.content.name.english]
                            }
                        ]
                    }
                ]
            };
        }
        return node;
    }

    /**
     * Define o valor de uma propriedade booleana (aquelas com valores "true" ou "false")
     */
    setBooleanProp($target, name, value) {
        if (value === true) {
            $target.setAttribute(name, value);
            $target[name] = true;
        } else {
            $target[name] = false;
        }
    }

    /**
     * Remove uma propriedade booleana (aquelas com valores "true" ou "false")
     */
    removeBooleanProp($target, name) {
        $target.removeAttribute(name);
        $target[name] = false;
    }

    /**
     * Verifica se é uma propriedade customizada
     */
    isCustomProp(name) {
        // Até o momento, sempre retorna false
        return false;
    }

    /**
     * Define o valor de uma propriedade
     */
    setProp($target, name, value) {
        if (this.isCustomProp(name)) {
            return;
        } else if (name === 'className') {
            $target.setAttribute('class', value);
        } else if (typeof value === 'boolean') {
            this.setBooleanProp($target, name, value);
        } else {
            $target.setAttribute(name, value);
        }
    }

    /**
     * Remove uma propriedade
     */
    removeProp($target, name, value) {
        if (this.isCustomProp(name)) {
            return;
        } else if (name === 'className') {
            $target.removeAttribute('class');
        } else if (typeof value === 'boolean') {
            this.removeBooleanProp($target, name);
        } else {
            $target.removeAttribute(name);
        }
    }

    /**
     * Define as propriedades
     */
    setProps($target, props) {
        Object.keys(props).forEach(name => {
            this.setProp($target, name, props[name]);
        });
    }

    /**
     * Atualiza o valor de uma propriedade
     */
    updateProp($target, name, newVal, oldVal) {
        if (!newVal) {
            this.removeProp($target, name, oldVal);
        } else if (!oldVal || newVal !== oldVal) {
            this.setProp($target, name, newVal);
        }
    }

    /**
     * Atualiza as propriedades
     */
    updateProps($target, newProps, oldProps = {}) {
        const props = Object.assign({}, newProps, oldProps);
        Object.keys(props).forEach(name => {
            this.updateProp($target, name, newProps[name], oldProps[name]);
        });
    }

    /**
     * Cria um elemento no VirtualDOM
     */
    createElement(node) {
        if (typeof node === 'string') {
            return this.dom.window.document.createTextNode(node);
        }
        const $el = this.dom.window.document.createElement(node.tag);
        this.setProps($el, node.props);
        node.children
            .map(this.createElement.bind(this))
            .forEach($el.appendChild.bind($el));
        return $el;
    }

    /**
     * Verifica se há alterações entre dois nós
     */
    changed(node1, node2) {
        return typeof node1 !== typeof node2 ||
            typeof node1 === 'string' && node1 !== node2 ||
            node1.tag !== node2.tag
    }

    /**
     * Atualiza o elemento no VirtualDom
     */
    updateElement($parent, newNode, oldNode, index = 0) {
        if (!oldNode) {
            $parent.appendChild(
                this.createElement(newNode)
            );
        } else if (!newNode) {
            $parent.removeChild(
                $parent.childNodes[index]
            );
        } else if (this.changed(newNode, oldNode)) {
            $parent.replaceChild(
                this.createElement(newNode),
                $parent.childNodes[index]
            );
        } else if (newNode.tag) {
            this.updateProps(
                $parent.childNodes[index],
                newNode.props,
                oldNode.props
            );
            const newLength = newNode.children.length;
            const oldLength = oldNode.children.length;
            for (let i = 0; i < newLength || i < oldLength; i++) {
                this.updateElement(
                    $parent.childNodes[index],
                    newNode.children[i],
                    oldNode.children[i],
                    i
                );
            }
        }
    }

    isEventProp(name) {
        return /^on/.test(name);
    }
}

module.exports = DomUtils;