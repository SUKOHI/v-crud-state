Vue.mixin({
    data() {
        return {
            state: '',
            stateId: -1,
        }
    },
    methods: {
        // should be overwritten.
        onChangeState() {},
        stateInit() {

            const hash = location.hash.substr(1);
            let state = '';
            let stateId = -1;

            if(hash === 'index' || hash === 'create') {

                state = hash;

            } else {

                const hashValues = hash.split(':');
                state = hashValues[0];
                stateId = hashValues[1];

                if(state === 'edit' || state === 'show') {

                    stateId = parseInt(stateId);

                } else {

                    return;

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