'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.mixin({
    data: function data() {
        return {
            state: '',
            stateValue: null
        };
    },

    methods: {
        // should be overwritten.
        onChangeState: function onChangeState() {},
        stateInit: function stateInit() {

            var availableStates = ['index', 'create', 'edit', 'show'];
            var hash = location.hash.substr(1);
            var hashValues = hash.split(':');
            var state = hashValues[0];
            var stateValue = hashValues[1] !== undefined ? hashValues[1] : null;

            if (availableStates.indexOf(state) === -1 && this.additionalStates.indexOf(state) === -1) {

                state = '';
            }

            this.state = state;
            this.stateValue = stateValue;
        },
        stateValue: function stateValue(key) {

            if (_typeof(this.$data[key]) === 'object') {

                var values = this.$data[key];

                if (values[this.state] !== undefined) {

                    return values[this.state];
                }
            }

            return '';
        }
    },
    computed: {
        isIndex: function isIndex() {

            return this.state === 'index';
        },
        isCreate: function isCreate() {

            return this.state === 'create';
        },
        isEdit: function isEdit() {

            return this.state === 'edit';
        },
        isShow: function isShow() {

            return this.state === 'show';
        },
        hasState: function hasState() {

            return this.state !== '';
        }
    },
    mounted: function mounted() {
        var _this = this;

        this.stateInit();
        this.onChangeState();

        window.addEventListener('hashchange', function () {

            _this.stateInit();
            _this.onChangeState();
        });
    }
});