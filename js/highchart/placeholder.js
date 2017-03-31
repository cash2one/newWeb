/**
 * Created by GONDON on 2016/11/14.
 */
$(function(){
    jQuery('[placeholder]').focus(function() {
        var input = jQuery(this);
        if (input.val() == input.attr('placeholder')) {
            input.val('');
            input.removeClass('placeholder');
        }
    }).blur(function() {
        var input = jQuery(this);
        if (input.val() == '' || input.val() == input.attr('placeholder')) {
            input.addClass('placeholder');
            input.val(input.attr('placeholder'));
        }
    }).blur().parents('form').submit(function() {
        jQuery(this).find('[placeholder]').each(function() {
            var input = jQuery(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
            }
        })
    });
    jQuery('[placeholder]').focus(function() {
        var textarea = jQuery(this);
        if (textarea.val() == textarea.attr('placeholder')) {
            textarea.val('');
            textarea.removeClass('placeholder');
        }
    }).blur(function() {
        var textarea = jQuery(this);
        if (textarea.val() == '' || textarea.val() == textarea.attr('placeholder')) {
            textarea.addClass('placeholder');
            textarea.val(textarea.attr('placeholder'));
        }
    }).blur().parents('form').submit(function() {
        jQuery(this).find('[placeholder]').each(function() {
            var textarea = jQuery(this);
            if (textarea.val() == textarea.attr('placeholder')) {
                textarea.val('');
            }
        })
    });
});
