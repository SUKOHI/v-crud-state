'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Vue.mixin({
    data: function data() {
        return {
            state: '',
            stateValue: null,
            additionalStates: [],
            defaultState: ''
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
            var hashes = this.stateHashes(hash);
            var state = hashes.state;
            var stateValue = hashes.value;

            if (!this.hasState && this.defaultState !== '') {

                var defaultHashes = this.stateHashes(this.defaultState);
                state = defaultHashes.state;
                stateValue = defaultHashes.value;
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
        },
        stateHashes: function stateHashes(hash) {

            var availableStates = ['index', 'create', 'edit', 'show'];
            var hashValues = hash.split(':');
            var state = availableStates.indexOf(hashValues[0]) !== -1 || this.additionalStates.indexOf(hashValues[0]) !== -1 ? hashValues[0] : '';
            var value = hashValues[1] !== undefined ? hashValues[1] : null;
            return {
                state: state,
                value: value
            };
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