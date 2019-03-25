// ***** Storage Controller *****
// ******************************
const StorageCtrl = (function() {
    // public methods
    return {
        storeItem: function(item) {
            let items;

            // Check if any items in LS
            if (localStorage.getItem('items') === null) {
                items = [];
                // Push new item
                items.push(item);
                // Set LS
                localStorage.setItem('items', JSON.stringify(items));
            } else {
                // Get localStorage data
                items = JSON.parse(localStorage.getItem('items'));
                // Push new item
                items.push(item);
                // Reset LS
                localStorage.setItem('items', JSON.stringify(items));
            }
        },
        getItemsFromStorage: function() {
            let items;

            if (localStorage.getItem('items') === null) {
                items = [];
            } else {
                items = JSON.parse(localStorage.getItem('items'));
            }
            return items;
        },
        updateItemStorage: function(updatedItem) {
            let items = JSON.parse(localStorage.getItem('items'));
            
            items.forEach((item, index) => {
                if(updatedItem.id === item.id) {
                    items.splice(index,1, updatedItem); // removes item and replaces it with new updated item
                }
            });
            // Reset local storage
            localStorage.setItem('items', JSON.stringify(items));
        },
        deleteItemFromStorage: function(id) {
            let items = JSON.parse(localStorage.getItem('items'));
            
            items.forEach((item, index) => {
                if(id === item.id) {
                    items.splice(index,1); 
                }
            });
            // Reset local storage
            localStorage.setItem('items', JSON.stringify(items));
        },
        clearItemsFromStorage: function() {
            localStorage.removeItem('items');
        }
    }
})();