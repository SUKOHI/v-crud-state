'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.mixin({
    data: function data() {
        return {
            state: '',
            stateValue: null,
            additionalStates: []
        };
    },

    methods: {
        // should be overwritten.
        onChangeState: function onChangeState() {},
        initState: function initState() {
            var _this = this;

            this.detectState();
            this.onChangeState(this.state, this.stateValue);

            window.addEventListener('hashchange', function () {

                _this.detectState();
                _this.onChangeState(_this.state, _this.stateValue);
            });
        },
        detectState: function detectState() {

            var availableStates = ['index', 'create', 'edit', 'show'];
            var hash = this.stateHash();
            var hashValues = hash.split(':');
            var state = hashValues[0];
            var stateValue = hashValues[1] !== undefined ? hashValues[1] : null;

            if (availableStates.indexOf(state) === -1 && this.additionalStates.indexOf(state) === -1) {

                state = '';
            }

            this.state = state;
            this.stateValue = stateValue;
        },
        stateData: function stateData(key) {

            if (_typeof(this.$data[key]) === 'object') {

                var values = this.$data[key];

                if (values[this.state] !== undefined) {

                    return values[this.state];
                }
            }

            return '';
        },
        stateHash: function stateHash() {

            return location.hash.substr(1);
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
        isStateEmpty: function isStateEmpty() {

            return this.stateHash() === '';
        },
        hasState: function hasState() {

            return this.state !== '';
        }
    }
});