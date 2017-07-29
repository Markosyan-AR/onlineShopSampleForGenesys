$(function () {
    const gridSelector = '#products-grid';
    const orderButtonSelector = '.make-order';
    const checkoutPageUrl = 'order/index.html';
    const imagesPath = '../content/products/';

    let dataSource = new kendo.data.DataSource({
        data: [
            { name: 'Potatoe', price: 200, discountPrice: 90, photo: '1', description: 'Tasty fruit' },
            { name: 'Tomatoe', price: 150, discountPrice: 90, photo: '2', description: 'Tasty fruit' },
            { name: 'Cucumber', price: 120, discountPrice: 90, photo: '3', description: 'Healthy food' },
            { name: 'Apple', price: 99, discountPrice: 90, photo: '4', description: 'Tasty fruit' },
            { name: 'Banana', price: 88, discountPrice: 90, photo: '5', description: 'Tasty fruit' },
            { name: 'Peach', price: 111, discountPrice: 90, photo: '6', description: 'Yum yum' },
        ]
    });
    $(gridSelector).kendoGrid({
        dataSource: dataSource,
        sortable: true,
        filterable: true,
        selectable: true,
        columns: [
            {
                field: 'name', title: 'Product', template: `<div class='product-photo' style='background-image: url(${imagesPath}#:photo#.jpg);'></div>
                                <div class='product-name'>#: name #</div>`},
            { field: 'price', title: 'Price' },
            { field: 'discountPrice', title: 'Discount Price' },
            { field: 'description', title: 'Description' },
            { title: 'Discount %', template: '#= kendo.format("{0:p}", (price - discountPrice)/price )#' }
        ],
        change: function () {
            let selectedItem = getSelectedItem(this);
            changeButtonEnableability(orderButtonSelector, selectedItem != null);
        }
    });

    $(orderButtonSelector).click(() => {
        let grid = $(gridSelector).data('kendoGrid');
        let selectedItem = getSelectedItem(grid);
        if (selectedItem != null) {
            saveItem(selectedItem);
            navigate(checkoutPageUrl);
        }
    });

    function changeButtonEnableability(buttonSelector, enabled) {
        $(buttonSelector).prop('disabled', !enabled);
    }

    function getSelectedItem(grid) {
        return grid.dataItem(grid.select())
    }

    function saveItem(item) {
        sessionStorage.setItem('selectedItem', JSON.stringify(item));
    }

    function navigate(url) {
        window.location.href = url;
    }
});
