function save_options() {
    var auto = document.getElementById('auto').checked;
    chrome.storage.sync.set({
        tumblrAutoCopy: auto
    }, function() {
        var status = document.getElementById('status');
        status.textContent = 'Options saved';
        setTimeout(function() {
            status.textContent = '';
        }, 750);
    });
}

function restore_options() {
    chrome.storage.sync.get({
        tumblrAutoCopy: false
    }, function(items) {
        document.getElementById('auto').checked = items.tumblrAutoCopy;
    });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
