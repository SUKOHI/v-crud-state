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

And state value is also available using `:`.

`https://example.com/test#edit:15`
`https://example.com/test#show:value`

# Preparation
Set initState() in `mounted()`.

    new Vue({
        el: '#app',
        mounted:function() {

            this.initState();

        }
    });

# Usage

This package automatically calls `onChangeState()` when changing URL.  
So add method as follows.

    new Vue({
        el: '#app',
        methods: {
            onChangeState: function() {

                // Your code here

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

    } else if(this.hasState) {

        // Has state

    }

# Retrieve state value

You can retrieve a current state value through `this.stateValue`.

    const stateValue = this.stateValue;

Note: Default value is `null`.

# Additional states
Your own states are available by setting `additionalStates` in data property.

    data: {
        additionalStates: ['confirmation']
    },

In this case, your URL should be `https://example.com/test#confirmation`.  

Of course, you can retrieve state value as follows.  
`https://example.com/test#confirmation:value`


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