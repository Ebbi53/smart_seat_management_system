define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Admin = Backbone.Model.extend({

        url: `${window.location.origin}${window.location.pathname}get_info.php?type=content`,
        // defaults: {
        //     applicationtoken: '',
        //     expire: '',
        //     result_code: '',
        //     uuid: '',
        //     // complete: false
        // },
        initialize: function() {
            // this.fetch();
        }
    });

    return new Admin();
})