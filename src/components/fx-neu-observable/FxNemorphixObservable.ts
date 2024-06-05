
import { Effects } from '../../utils/effects';
import styles from '../../styles/neumorphix.scss' assert { type: "scss" };

const { _compose } = Effects;


class FxNeumorphixObservable extends _compose(HTMLElement, FxNeumorphix, FxObservable) {
    shadowRoot: any;
    constructor() {
        super();
        const self = this;
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `
            <style>
                ${styles}
            </style>
            <slot></slot>
        `;
    }
}
    
class FxObservable extends HTMLElement {
    observers: Map<Node, MutationObserver> = new Map();

    connectedCallback() {
        if (super.connectedCallback) super.connectedCallback();
        this.observeAttributes();
    }

    observe(target: Node, options: MutationObserverInit, callback: MutationCallback) {
        const observer = new MutationObserver(callback);
        observer.observe(target, options);
        this.observers.set(target, observer);
    }

    unobserve(target: Node) {
        const observer = this.observers.get(target);
        if (observer) {
            observer.disconnect();
            this.observers.delete(target);
        }
    }

    disconnect() {
        this.observers.forEach((observer) => observer.disconnect());
    }

    observeAttributes() {
        const observer = new MutationObserver((mutationsList) => {
            mutationsList.forEach((mutation) => {
                if (mutation.type === 'attributes') {
                    this.attributeChangedCallback(mutation.attributeName!, mutation.oldValue, mutation.target.nodeValue);
                }
            });
        });
        observer.observe(this, { attributes: true }); // observe the current element
    }

    attributeChangedCallback(name: string, oldValue: any, newValue: any) {
        if (super.attributeChangedCallback) super.attributeChangedCallback(name, oldValue, newValue);
        console.log('attributeChangedCallback', name, oldValue, newValue);
    }

    disconnectedCallback() {
        if (super.disconnectedCallback) super.disconnectedCallback();
        this.disconnect();
    }
}


customElements.define('fx-neu-observable', FxNeumorphixObservable as any);
export { FxNeumorphixObservable as default };

class FxNeumorphix extends HTMLElement {
    constructor() {
        super();
        const self = this;
        this.attachShadow({ mode: 'open' });
        this.shadowRoot!.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    position: relative;
                    background: var(--fx-neu-light);
                    transition: all 0.3s;
                }
                :host([fx-enable-neu]) {
                    box-shadow: var(--fx-neu-shadow-light) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-dark), var(--fx-neu-shadow-dark) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-light);
                    border-radius: var(--fx-neu-radius);
                }
            </style>
            <slot></slot>
        `;
    }

    static get observedAttributes() {
        return ['fx-enable-neu', 'fx-neu-radius', 'fx-neu-shadow-light', 'fx-neu-shadow-dark', 'fx-neu-shadow-x', 'fx-neu-shadow-y', 'fx-neu-blur'];
    }

    connectedCallback() {
        if (super.connectedCallback) super.connectedCallback();
        this.applyNeumorphixStyles();
    }   

    attributeChangedCallback(name: string, oldValue: string, newValue: string) {
        if (super.attributeChangedCallback) super.attributeChangedCallback(name, oldValue, newValue);
        if (oldValue !== newValue && name === 'fx-enable-neu') {
            this.applyNeumorphixStyles();
        } else if (oldValue !== newValue) {
            this.style.setProperty(`--${name}`, newValue);
        }
    }
    
    applyNeumorphixStyles() {
        if (this.hasAttribute('fx-enable-neu')) {
            this.style.boxShadow = 'var(--fx-neu-shadow-light) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-dark), var(--fx-neu-shadow-dark) var(--fx-neu-shadow-x) var(--fx-neu-shadow-y) var(--fx-neu-blur) var(--fx-neu-light)';
            this.style.borderRadius = 'var(--fx-neu-radius)';
        } else {
            this.style.boxShadow = 'none';
            this.style.borderRadius = 'initial';
        }
    }
};



// Path: src/components/fx-neu-observable/FxNemorphixObservable.test.ts
