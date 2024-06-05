export function FxObservableMixin(Base: any) {
    return class extends Base {
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
            observer.observe(this, { attributes: true });
        }

        attributeChangedCallback(name: string, oldValue: any, newValue: any) {
            if (super.attributeChangedCallback) super.attributeChangedCallback(name, oldValue, newValue);
            console.log('attributeChangedCallback', name, oldValue, newValue);
        }

        disconnectedCallback() {
            if (super.disconnectedCallback) super.disconnectedCallback();
            this.disconnect();
        }
    };
}
