import { FxObservableMixin } from './FxObservableMixin';
import { FxNeumorphixMixin } from './FxNeumorphixMixin';
import { Effects } from '../../utils/effects';
import styles from '../styles/neumorphix.scss' assert { type: "scss" };

const { _compose } = Effects;

class FxNeumorphixObservable extends _compose(HTMLElement, FxObservableMixin, FxNeumorphixMixin) {
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
    

customElements.define('fx-neu-observable', FxNeumorphixObservable as any);
export { FxNeumorphixObservable as default };
