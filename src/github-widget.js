(function (factory) {

    factory(jQuery, radic);

}(function ($, R) {

    R.template.registerHelper('branchName', function (event) {
        return event.payload.ref.replace('refs/heads/', '');
    });
    R.template.registerHelper('pushName', function (event) {
        return event.payload.size > 1 ? 's' : ''
    });

    R.template.registerHelper('pushName', function (event) {
        return event.payload.size > 1 ? 's' : ''
    });

    R.template.registerHelper('repoName', function (repoName) {
        return repoName.replace(/RobinRadic\/(\w*)/, '$1');
    });


    $.widget('github.widget', $.radic.base, {
        version: '0.0.1',

        options: {
            spinner: true,
            spinnerOptions: {
                top: '30px'
            }
        },

        _spin: function (disable) {
            if (this.options.spinner === true) {
                if (typeof disable === 'boolean' && disable === false) {
                    return this.element.spin(false);
                }
                this.element.spin(this.options.spinnerOptions);
            }

        },


        _trigger: function (name, event, param) {
            this._super(name, event, typeof param === 'undefined' ? [this.options, this.data] : param);
        }
    });
}));
