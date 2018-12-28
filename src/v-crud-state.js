Vue.mixin({
    data() {
        return {
            state: '',
            stateValue: null,
            additionalStates: [],
            defaultState: ''
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
            const hashes = this.stateHashes(hash);
            let state = hashes.state;
            let stateValue = hashes.value;

            if(!this.hasState && this.defaultState !== '') {

                const defaultHashes = this.stateHashes(this.defaultState);
                state = defaultHashes.state;
                stateValue = defaultHashes.value;

            }

            this.state = state;
            this.stateValue = stateValue;

        },
        stateData(key) {

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

        },
        stateHashes(hash) {

            const availableStates = ['index', 'create', 'edit', 'show'];
            const hashValues = hash.split(':');
            const state = (
                availableStates.indexOf(hashValues[0]) !== -1 ||
                this.additionalStates.indexOf(hashValues[0]) !== -1
            ) ? hashValues[0] : '';
            const value = (hashValues[1] !== undefined) ? hashValues[1] : null;
            return {
                state: state,
                value: value
            };

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