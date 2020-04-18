define(['jquery', 'underscore', 'backbone', 'text!template/header.html', 'model/content'], function ($, _, Backbone, template, Content) {
    return Backbone.View.extend({
        tagname: 'div',
        className: 'row w-100',
        id: 'heading',
        template: template,

        initialize: function () {
            this.model = Content;
            this.render();
        },

        events: {
        },


        render: function () {
            this.$el.html(_.template(this.template)(_.extend(this.model.toJSON())));

            $('title').html(this.model.get('data')['Heading'] + ' ' + this.model.get('data')['Sub-Heading'])
            // console.log(this.model.get('data'))

            $(document).ready(function () {
            })
        },

    })
})