Vue.mixin({
    data() {
        return {
            state: '',
            stateValue: null
        }
    },
    methods: {
        // should be overwritten.
        onChangeState() {},
        initState() {

            this.detectState();
            this.onChangeState(this.state, this.stateValue);

            window.addEventListener('hashchange', () => {

                this.detectState();
                this.onChangeState(this.state, this.stateValue);

            });

        },
        detectState() {

            const availableStates = ['index', 'create', 'edit', 'show'];
            const hash = this.stateHash();
            const hashValues = hash.split(':');
            let state = hashValues[0];
            let stateValue = (hashValues[1] !== undefined) ? hashValues[1] : null;

            if(availableStates.indexOf(state) === -1 &&
                this.additionalStates.indexOf(state) === -1) {

                state = '';

            }

            this.state = state;
            this.stateValue = stateValue;

        },
        stateValue(key) {

            if(typeof this.$data[key] === 'object') {

                const values = this.$data[key];

                if(values[this.state] !== undefined) {

                    return values[this.state];

                }

            }

            return '';

        },
        stateHash() {

            return location.hash.substr(1);

        }
    },
    computed: {
        isIndex() {

            return (this.state === 'index');

        },
        isCreate() {

            return (this.state === 'create');

        },
        isEdit() {

            return (this.state === 'edit');

        },
        isShow() {

            return (this.state === 'show');

        },
        isStateEmpty() {

            return (this.stateHash() === '');

        },
        hasState() {

            return (this.state !== '');

        }
    }
});