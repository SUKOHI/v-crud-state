Vue.mixin({
    data() {
        return {
            state: '',
            stateId: -1
        }
    },
    methods: {
        // should be overwritten.
        onChangeState() {},
        stateInit() {

            const availableStates = ['index', 'create', 'edit', 'show'];
            const hash = location.hash.substr(1);
            const hashValues = hash.split(':');
            let state = '';
            let stateId = -1;

            if(availableStates.indexOf(hashValues[0]) !== -1) {

                state = hashValues[0];

                if(hashValues[1] !== undefined) {

                    stateId = hashValues[1];

                }

            }

            this.state = state;
            this.stateId = stateId;

        },
        stateValue(key) {

            if(typeof this.$data[key] === 'object') {

                const values = this.$data[key];

                if(values[this.state] !== undefined) {

                    return values[this.state];

                }

            }

            return '';

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
        hasState() {

            return (this.state !== '');

        }
    },
    mounted() {

        this.stateInit();
        this.onChangeState();

        window.addEventListener('hashchange', () => {

            this.stateInit();
            this.onChangeState();

        });

    }
});