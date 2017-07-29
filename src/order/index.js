$(function () {
    const formSelector = '.check-out';
    const summaryPageUrl = 'summary.html';

    let item = getSelectedItem();
    drawSelectedItem(item);

    $(formSelector).submit(function (e) {
        e.preventDefault();
        let data = collectUserData();
        saveUserData(data);
        navigate(summaryPageUrl);
    });

    function drawSelectedItem(item) {
        // TODO: ui bindings should be here instead :'(
        $('.product-photo').css({ 'background-image': `url(../../content/products/${item.photo}.jpg` });
        $('.product-name').html(`Selected product: <em>${item.name} ${item.description}</em>, price is: ${item.discountPrice}`);
    }

    function getSelectedItem() {
        return JSON.parse(sessionStorage.getItem('selectedItem'));
    }

    function saveUserData(data) {
        // TODO copypaste, make session storage wrapper
        // TODO use encrypting for personal data
        sessionStorage.setItem('userData', JSON.stringify(data));
    }

    function collectUserData() {
        let $inputs = $(formSelector + ' :input');

        let values = {};
        $inputs.each(function () {
            values[this.name] = $(this).val();
        });
        return values;
    }

    function navigate(url) {
        // Todo copypaste, make Navigator class
        window.location.href = url;
    }
});