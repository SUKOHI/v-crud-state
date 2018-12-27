# v-crud-state
A Vue mixin that allows you simply to manage CRUD state.

# Installation

    npm i v-crud-state --save

# About state

This package recognizes 4 states from hash value of URL.

* index
* create
* edit
* show

It means that your URL should be `https://example.com/test#index` if you'd like to set state as `index`.

And in case of `edit` and `show`, join a state and an ID with `:`.

`https://example.com/test#edit:15`

# Usage

This package automatically calls `onChangeState()` when changing URL.  
So add method as follows.

    new Vue({
        el: '#app',
        methods: {
            onChangeState: function() {

                if(this.isIndex) {

                    // Index

                } else if(this.isCreate) {

                    // Create

                } else if(this.isEdit) {

                    // Edit

                } else if(this.isShow) {

                    // Show

                }

            }
        }
    });

# Retrieve current state

You can retrieve current state through `this.state`.

    if(this.state == 'create') {
    
        // create
    
    }

Or you also have specific ways.

    if(this.isIndex) {
    
        // Index

    } else if(this.isCreate) {

        // Create

    } else if(this.isEdit) {

        // Edit

    } else if(this.isShow) {

        // Show

    }

# Retrieve state ID

You can retrieve a current state through `this.stateId`.

    const stateId = this.stateId;

Note: `stateId` is available only when a current state is `edit` and `show`.

# Retrieve value corresponding a state

For example, you have `titles` object in `data` as follows.

    data: {
        titles: {
            index: 'Title of INDEX',
            create: 'Title of CREATE',
            edit: 'Title of EDIT',
            show: 'Title of SHOW'
        }
    }
    
In this case, you can automatically retrieve a title corresponding a current state through `stateValue()`.

    const title = this.stateValue('titles');    // depending on the states
    
# License

This package is licensed under the MIT License.

Copyright 2018 Sukohi Kuhoh