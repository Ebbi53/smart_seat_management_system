define(['jquery', 'underscore', 'backbone', 'bootstrap', 'router'], function ($, _, Backbone, Bootstrap, Router) {

    var version = 1.2

    var init = function () {
        console.log('Version: ' + version);
        Backbone.history.start(); // Backbone.history.start();
        require(['view/header', 'view/footer', 'model/content', 'view/body'], function (headerView, footerView, Content, bodyView) {
            Content.fetch({
                success: function () {
                    // console.log(Content.attributes)
                    $('#header').html(new headerView().el);
                    $('footer').html(new footerView().el);
                }
            })
            $('#navdiv nav').html(new bodyView().el);
        })
    }
    return {
        init: init,
    }
});