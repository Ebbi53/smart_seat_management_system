define(['jquery', 'underscore', 'backbone', 'text!template/home.html', 'model/seats', 'pageAlignment'], function ($, _, Backbone, template, Model, pageAlignment) {
    return Backbone.View.extend({
        tagname: 'div',
        className: 'row mg-bt',
        template: template,
        id: 'home',

        initialize: function () {
            this.model = Model;
            this.render();
        },

        events: {
        },


        render: function () {
            this.$el.html(_.template(this.template));
            // this.$el.html(_.template(this.template)(_.extend(this.model.toJSON())));


            $(document).ready(function () {
                pageAlignment();
            })
        },

    })
})