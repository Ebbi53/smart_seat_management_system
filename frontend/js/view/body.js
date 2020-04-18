define(['jquery', 'underscore', 'backbone', 'text!template/body.html', 'model/data', 'router'], function ($, _, Backbone, template, Data, Router) {
    return Backbone.View.extend({
        tagname: 'div',
        className: 'collapse navbar-collapse',
        id: 'navbarSupportedContent',
        template: template,

        initialize: function () {
            var that = this;
            this.model = Data;
            this.model.fetch({
                success: function () {
                    that.render(100);

                    var menu = that.model.get('data'),
                        mappings = {}, main_cnt = 0;
                    for (var main_menu in menu) {
                        main_cnt++;
                        var sub_cnt = 0;
                        for (var sub_menu in menu[main_menu]) {
                            sub_cnt++;
                            mappings[`${main_cnt}_${sub_cnt}`] = `${main_menu}/${menu[main_menu][sub_menu]}/${main_cnt}_${sub_cnt}.htm`;
                        }
                    }
                    that.model.set('mappings', mappings);
                    var router = new Router().navigate(`${window.location.hash ? '' : '1_1'}`, {
                        trigger: true
                    })
                }
            })
            this.render(50);
        },

        events: {
        },


        render: function (progress) {
            var that = this;
            this.$el.html(_.template(this.template)(_.extend(this.model.toJSON(), {
                progress: progress
            })));

            var pageAlignment = function () {
                if (window.innerWidth <= 992) {


                    if ((60 + $('#navbar_button').outerHeight() + $('#navdiv').outerHeight() + $('#table div.row').outerHeight() + $('div#heading').outerHeight() + $('footer').outerHeight()) > window.innerHeight) {
                        $('body').css('position', 'relative')
                        $('footer').css('bottom', -$('footer').outerHeight() - 60 + 'px')
                    } else {
                        $('body').css('position', 'static')
                        $('footer').css('bottom', 0)
                    }

                } else {


                    if ((60 + maxHeight($('#navdiv nav').outerHeight() + 23, $('#table div.row').outerHeight()) + $('div#heading').outerHeight() + $('footer').outerHeight()) > window.innerHeight) {
                        $('body').css('position', 'relative')
                        $('footer').css('bottom', -$('footer').outerHeight() - 60 + 'px')
                    } else {
                        $('body').css('position', 'static')
                        $('footer').css('bottom', 0)
                    }
                }
            }

            var maxHeight = function (a, b) {
                return a > b ? a : b;
            }

            $(document).ready(function () {

                $(`a[href="${window.location.hash}"]`).addClass('active-section').parent('li.dropdown-li').addClass('active-section').parents('li.nav-item').children('a.nav-link').dropdown('show').addClass('nav-link-hover').find('i.fas').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');

                $('li.dropdown-li').click(function (e) {
                    $(e.currentTarget).hasClass('active-section') ? null : $(e.currentTarget).parent().find('li.active-section, a.active-section').removeClass('active-section')
                })

                $('.dropdown').on('show.bs.dropdown', function (e) {
                    $(e.currentTarget).children('a.nav-link').addClass('nav-link-hover').find('i.fas').addClass('fa-chevron-circle-up').removeClass('fa-chevron-circle-down')
                });

                $('.dropdown').on('shown.bs.dropdown', pageAlignment);

                $('.dropdown').on('hidden.bs.dropdown', pageAlignment);


                $('.dropdown').on('hide.bs.dropdown', function (e) {
                    // console.log(e.currentTarget)

                    if (e.clickEvent == undefined) { // event on the top layer nav links
                        if ($(e.currentTarget).find('li.active-section, a.active-section').length) {
                            e.preventDefault();
                        }
                        else {
                            $(e.currentTarget).children('a.nav-link-hover').removeClass('nav-link-hover').find('i.fas').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                        }
                    } else { // event on the inner layer nav links
                        if ($(e.clickEvent.target).parents('nav').length && $(e.clickEvent.target).parents('li.nav-item.dropdown')[0] != e.currentTarget) {
                            $(e.currentTarget).find('li.active-section, a.active-section').removeClass('active-section');
                            $(e.currentTarget).find('a.nav-link-hover').removeClass('nav-link-hover').find('i.fas').removeClass('fa-chevron-circle-up').addClass('fa-chevron-circle-down');
                        } else {
                            e.preventDefault();
                        }
                    }
                })

                $('#navbarSupportedContent').on('shown.bs.collapse', pageAlignment)

                $('#navbarSupportedContent').on('hide.bs.collapse', () => {
                    
                    if ((60 + $('#navdiv').outerHeight() + $('#table div.row').outerHeight() + $('div#heading').outerHeight() - $('div.navbar-collapse.collapse').outerHeight() + $('footer').outerHeight()) > window.outerHeight) {
                        $('body').css('position', 'relative')
                        $('footer').css('bottom', -$('footer').outerHeight() - 60 + 'px')
                    } else {
                        $('body').css('position', 'static')
                        $('footer').css('bottom', 0)
                    }
                })
            })
        },

    })
})