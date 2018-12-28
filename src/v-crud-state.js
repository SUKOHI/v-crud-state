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
        stateInit() {

            const availableStates = ['index', 'create', 'edit', 'show'];
            const hash = location.hash.substr(1);
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
        hasState() {

            return (this.state !== '');

        }
    },
    mounted() {

        this.stateInit();
        this.onChangeState(this.state, this.stateValue);

        window.addEventListener('hashchange', () => {

            this.stateInit();
            this.onChangeState(this.state, this.stateValue);

        });

    }
});