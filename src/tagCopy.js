var tags;

function copyTags() {
    for (var i = 0; i < tags.length; i++) {
        $('.editor.editor-plaintext').focus().prepend('<span>' + tags[i] + '</span>').blur();
    }
}

function copyTagsIfAutoCopyIsEnabled()  {
    chrome.storage.sync.get({
        tumblrAutoCopy: false
    }, function(items) {
        if (items.tumblrAutoCopy) {
            copyTags();
        }
    });
}

function initCopyTagButton() {
    var buttonContainer = $('.post-form--controls .control.right:first');
    var copyButton = $('<div class="control right">' +
    '<div style="cursor: pointer;" class="post_control tag-copy-button" title="Copy tags">' +
    '<div style="height: 20px; margin-right: 10px">' +
    '<img src="' + chrome.extension.getURL('/images/tumblrtagcopy_20.png') + '">' +
    '</div>' +
    '</div>')
        .click(copyTags);
    buttonContainer.after(copyButton);
}

function initCopyTag() {
        var buttonContainer = $('.post-form--controls .control.right:first');
        if (buttonContainer.length) {
            initCopyTagButton();
            copyTagsIfAutoCopyIsEnabled();
        } else {
            _.delay(initCopyTag, 500);
        }
}

function bindReblogButtons () {
    $('.post_control.reblog:not(.tag-copy-active)').click(function () {
        tags = _.map($(this).closest('.post').find('.post_tags_inner a'), function (element) {
            return $(element).text();
        });
        initCopyTag();
    }).addClass('tag-copy-active');
}

bindReblogButtons();

$(window).scroll(_.throttle(bindReblogButtons, 2000));