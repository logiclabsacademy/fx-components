import styles from '../styles/neumorphix.scss' assert { type: 'scss' };

export function FxNeumorphixMixin(Base: any) {
    return class extends Base {
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
}
