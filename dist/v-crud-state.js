'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.mixin({
    data: function data() {
        return {
            state: '',
            stateId: -1
        };
    },

    methods: {
        // should be overwritten.
        onChangeState: function onChangeState() {},
        stateInit: function stateInit() {

            var availableStates = ['index', 'create', 'edit', 'show'];
            var hash = location.hash.substr(1);
            var hashValues = hash.split(':');
            var state = '';
            var stateId = -1;

            if (availableStates.indexOf(hashValues[0]) !== -1) {

                state = hashValues[0];

                if (hashValues[1] !== undefined) {

                    stateId = hashValues[1];
                }
            }

            this.state = state;
            this.stateId = stateId;
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