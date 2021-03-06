/**
 * Clearform
 * Created by Truth <truth@truthanduntruth.com>
 * Report Bugs: <bugs@truthanduntruth.com>
 * Copyright 2010
 */
;(function ($) {
    $.fn.clearform = function (c) {
        var d = {
            form: 'form',
            bind: 'click',
            clear: "input[type!='submit'][type!='button'][type!='hidden'][type!='reset'][type!=checkbox], textarea, select",
            clearCheckbox: "input[type=checkbox][class!='ignoreclearform']",
            css: {},
            complete: function () {}
        };
        var f = {};
        var g = $.extend(f, d, c);
        var h = g.bind.split(" ");
        var i = '';
        $.each(h, function (a, b) {
            i += b + '.clearform '
        });
        $(this).bind(i, function (e) {
            $(g.clear, g.form).not('.ignore-clearform').val('').find('option:first-child').attr('selected', 'selected');
            $(g.clearCheckbox, g.form).not('.multiselect-checkbox').attr('checked', false);
            g.complete()
        }).css(g.css)
    }
})(jQuery);

function attachLoadingOnSubmit(formId)
{
    if($('#' + formId).find(".attachLoading:first").hasClass("loading-ajax-submit"))
    {
        return true;
    }
    if($('#' + formId).find(".attachLoading:first").hasClass("loading"))
    {
        return false;
    }
    $('#' + formId).find(".attachLoading:first").addClass("loading");
    attachLoadingSpinner(formId, true);

    return true;
}

function detachLoadingOnSubmit(formId)
{
    $('#' + formId).find(".attachLoading:first").removeClass("loading");
    $('#' + formId).find(".attachLoading:first").removeClass("loading-ajax-submit");
}

function beforeValidateAction(form)
{
    if(form.find(".attachLoadingTarget").hasClass("loading") || form.find(".attachLoading:first").hasClass("loading"))
    {
        return false;
    }
    if(form.find(".attachLoadingTarget").length)
    {
        form.find(".attachLoadingTarget").addClass("loading");
        form.find(".attachLoadingTarget").addClass("loading-ajax-submit");
    }
    else
    {
        form.find(".attachLoading:first").addClass("loading");
        form.find(".attachLoading:first").addClass("loading-ajax-submit");
    }
    attachLoadingSpinner(form.attr('id'), true);
    return true;
}

function afterValidateAction(form, data, hasError)
{
    if(hasError)
    {
        if(form.find(".attachLoadingTarget").length)
        {
            form.find(".attachLoadingTarget").removeClass("loading");
            form.find(".attachLoadingTarget").removeClass("loading-ajax-submit");
        }
        else
        {
            form.find(".attachLoading:first").removeClass("loading");
            form.find(".attachLoading:first").removeClass("loading-ajax-submit");
        }
        return false;
    }
    else
    {
        return true;
    }
}

function afterValidateAjaxAction(form, data, hasError)
{
    if(!afterValidateAction(form, data, hasError))
    {
        return false;
    }
    if(!hasError) {
        eval($(form).data('settings').afterValidateAjax);
    }
    return false;
}

function searchByQueuedSearch(inputId)
{
    if(basicSearchQueued == 0)
    {
        $('#' + inputId).closest('form').submit();
    }
}

function attachLoadingSpinner( id, state, color )
{
    var color;
    
    if ( color === 'dark' ){
        color = '#999';
    } else {
        color = '#fff';
    }
    
    if ( state === true )
    {
        $( '.z-spinner', '#' + id ).spin({
            lines : 11, // The number of lines to draw
            length : 2.3, // The length of each line
            width : 2, // The line thickness
            radius : 3, // The radius of the inner circle
            rotate : 0, // The rotation offset
            color : color, // #rgb or #rrggbb
            speed : 2, // Rounds per second
            trail : 37, // Afterglow percentage
            shadow : false, // Whether to render a shadow
            hwaccel : false, // Whether to use hardware acceleration
            className : 'spinner', // The CSS class to assign to the spinner
            zIndex : 2e9, // The z-index (defaults to 2000000000)
            top : 4, // Top position relative to parent in px
            left : 0 // Left position relative to parent in px
        });
    }
    else
    {
        $( '.z-spinner', '#' + id ).spin(false);
    }
}

