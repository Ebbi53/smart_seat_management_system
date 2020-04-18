define(['jquery', 'underscore', 'backbone', 'model/data'], function ($, _, Backbone, Data) {
    var AppRouter = Backbone.Router.extend({
        // execute: function (callback, args, name) {
        //     console.log(args)
        //     console.log(name)

        //     if (callback) callback.apply(this, args);
        // },
        routes: {
            '*all': function (route) {
                if (route) {
                    // console.log(encodeURI(Data.get('mappings')[route]))

                    var frame = document.getElementById("tableFrame"),
                        frameDoc = frame.contentDocument || frame.contentWindow.document;
                    frameDoc.removeChild(frameDoc.documentElement);

                    route != '1_1' ? $('div.circle-loader').removeClass('hidden') : null;

                    $('#tableFrame').attr('src', `./tables/${encodeURI(Data.get('mappings')[route])}`)
                    // // require([`view/${route}`], function (view) {
                    // //     $('#table div.col-12').html(new view().el)
                    // // })

                    $(`a[href="#${route}"]`).addClass('active-section').parent('li.dropdown-li').addClass('active-section').parents('li.nav-item').children('a.nav-link').dropdown('show').addClass('nav-link-hover').find('i.fas').removeClass('fa-chevron-circle-down').addClass('fa-chevron-circle-up');


                    // $('a#non_locals').click();
                    // $('a[href="#1_01"]').click();
                } else {
                    this.navigate('1_1', {
                        trigger: true
                    })
                }
            },
        },
        initialize: function () {

        }
    });

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

    window.onresize = pageAlignment;

    var maxHeight = function (a, b) {
        return a > b ? a : b;
    }

    var scaling = function () {
        var scale = $('#table div.col-12').width() / ($('#tableFrame').contents().find('div table').width() + 2),
            left = ($('#tableFrame').contents().find('div table').width() + 2 - $('#table div.col-12').width()) / 2,
            top = $('#tableFrame').contents().find('div').height() * (1 - scale) / 2;

        $('#tableFrame').attr('width', $('#table div.col-12').width());
        $('#tableFrame').attr('height', `${$('#tableFrame').contents().find('div').height() * scale}px`)

        $('#table div.col-12').css('overflow', 'visible');

        $('#tableFrame').contents().find('html').css({
            transform: `scale(${scale})`,
            position: 'absolute',
            left: `${-left}px`,
            top: `${-top}px`,
        })
    }

    var unscaling = function () {
        $('#table div.col-12').css('overflow', 'scroll');
        $('#tableFrame').attr('height', `${$('#tableFrame').contents().find('div').height()}px`)
        $('#tableFrame').attr('width', `${$('#tableFrame').contents().find('div table').width() + 2}px`)

        $('#tableFrame').contents().find('html').css({
            transform: `scale(1)`,
            position: 'static',
        })
    }

    var tableSize = function () {
        if ($('#table div.col-12').width() > ($('#tableFrame').contents().find('div table').width() + 2)) {
            $('i.fa-compress-alt').addClass('hidden').attr('data-original-title', 'Unfit the table');
            $('i.fa-expand-alt').removeClass('hidden').attr('data-original-title', 'Fit the table');

        } else {
            $('i.fa-compress-alt').removeClass('hidden').attr('data-original-title', 'Fit the table');
            $('i.fa-expand-alt').addClass('hidden').attr('data-original-title', 'Unfit the table');
        }
    }

    $(document).ready(function () {

        $('#tableFrame').on('load', (e) => {
            // console.log($('#tableFrame').contents().find('div').height())
            $('#tableFrame').contents().find('body').css('margin', 0)
            $('#tableFrame').attr('height', `${$('#tableFrame').contents().find('div').height()}px`)
            $('#tableFrame').attr('width', `${$('#tableFrame').contents().find('div table').width() + 2}px`)
            $('#table div.col-12').css('overflow', 'scroll');

            if (window.innerWidth <= 576) {
                $('div#table div.row').css('top', -$('div#table div.row').height() * 0.15 / 2);
                $('div#table div.row').css('transform', 'scale(0.85)');
            }

            $('div.circle-loader').addClass('hidden');

            // console.log($('#tableFrame').contents().find('div table').width())

            if (window.innerWidth > 992) {
                $('#expand-icon').removeClass('hidden')
                $('#expand-icon i').tooltip('enable');
            } else {
                $('#expand-icon').addClass('hidden')
            }

            $('#scale-icon').removeClass('hidden')
            $('#scale-icon i').tooltip('enable');

            tableSize();

            pageAlignment();

        })

        window.onbeforeprint = scaling;

        window.onafterprint = unscaling;


        $('#scale-icon').click(function (e) {
            $('#scale-icon i').toggleClass('hidden')


            $('#table div.col-12').css('overflow') == 'scroll' ? scaling() : unscaling();
            
            if (window.innerWidth <= 576) {
                $('div#table div.row').css('top', -$('div#table div.row').height() * 0.15 / 2);
                $('div#table div.row').css('transform', 'scale(0.85)');
            }
            pageAlignment();

        })

        $('#expand-icon').click(function (e) {
            // $('#navdiv').hasClass('hidden') ? unscaling() : null;
            $('#expand-icon i').toggleClass('hidden')
            $('#navdiv').toggleClass('hidden');
            $('#table').toggleClass('col-lg-9 col-lg-12')
            // $('#table').removeClass('col-lg-9').addClass('col-lg-12')
            unscaling();
            tableSize();
            pageAlignment();
        })

        $('#navbar_button button').click(function (e) {
            $(e.currentTarget).children('i').toggleClass('fa-bars fa-times');
        })

    })

    return AppRouter;
})