define(['jquery', 'underscore', 'backbone', 'text!template/footer.html', 'model/content'], function ($, _, Backbone, template, Content) {
    return Backbone.View.extend({
        tagname: 'div',
        className: 'row',
        template: template,

        initialize: function () {
            this.model = Content;
            this.render();
        },

        events: {
        },


        render: function () {
            this.$el.html(_.template(this.template)(_.extend(this.model.toJSON())));


            $(document).ready(function () {

            })
        },

    })
})