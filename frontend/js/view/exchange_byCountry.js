define(['jquery', 'underscore', 'backbone', 'text!template/exchange_byCountry.html'], function ($, _, Backbone, template) {
    return Backbone.View.extend({
        tagname: 'div',
        className: 'fadeIn',
        template: template,

        initialize: function () {
            this.render()
        },

        events: {
        },

        tableResponsive: function () {
            if (window.outerWidth <= 1175) {
                $('#figures').addClass('table-responsive')
            } else {
                $('#figures').removeClass('table-responsive')
            }
        },

        render: function () {
            var that = this;
            this.$el.html(_.template(this.template));

             $(document).ready(function () {

                console.log($('body').outerHeight())

                that.tableResponsive();
                window.onresize = that.tableResponsive;

                $('.table-hover tbody tr td, .table-hover tbody tr th').hover(function(e) {
                    // console.log($(e.currentTarget).parent('tr').children())
                    $(e.currentTarget).parent('tr').children().addClass('row_hover')
                }, function(e) {
                    $(e.currentTarget).parent('tr').children().removeClass('row_hover')
                })
                
                if (($('#table').outerHeight() + $('div#heading').outerHeight() + $('footer').outerHeight() + (window.outerWidth > 992 ? 0 : $('#navdiv').outerHeight())) > window.outerHeight) {
                    $('body').css('position', 'relative')
                    $('footer').css('bottom', -$('footer').outerHeight() + 'px')
                } else {
                    $('body').css('position', 'static')                    
                    $('footer').css('bottom', 0)
                }
            })
        },

    })
})