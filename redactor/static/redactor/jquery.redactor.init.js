if(typeof django !== "undefined") {
    jQuery = django.jQuery.noConflict(true);
}

var image_upload_error_callback = function (json) {
    // TODO: Needs better error messages
    alert(json.error);
}

redactor_default_options = {
    imageUploadErrorCallback: image_upload_error_callback
};


/**
This makes sure that we initialise the redactor on the text area once its displayed
so it can be used as part of an inline formset.

Credit to the approach taken in:
https://github.com/yourlabs/django-autocomplete-light
**/
jQuery(document).ready(function() {
	jQuery('textarea.redactor-box').on('initialize', function() {
		jQuery(this).redactor(jQuery(this).data('redactor-options'));
	});

	jQuery(document).trigger('redactorWidgetReady');

	jQuery('textarea.redactor-box:not([id*="__prefix__"])').each(function() {
		jQuery(this).trigger('initialize');
	});

	 jQuery(document).bind('DOMNodeInserted', function(e) {
		var widget = jQuery(e.target).find('.redactor-box');

		if (!widget.length) return;

		widget.trigger('initialize');
	});

});