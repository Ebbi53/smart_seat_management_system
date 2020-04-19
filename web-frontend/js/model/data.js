define(['jquery', 'underscore', 'backbone'], function($, _, Backbone) {
    var Data = Backbone.Model.extend({

        url: `${window.location.origin}${window.location.pathname}get_info.php?type=tables`,
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

    return new Data();
})