// ***** Item Controller *****
// *************************** 
// Function which is creating single food / meal item
const ItemCtrl = (function() {
    //Item Constructor
    const Item = function(id, name, calories) {
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data Structure / State
    const data = {
        items: [],
        currentItem: null,
        totalCalories: 0
    }

    // Public methods
    return {
        getItems: function () { 
            return data.items;
        },
        addItem: function (name, calories) {
            let ID;
            // Create ID
            if(data.items.length > 0) {
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
            calories = parseInt(calories);

            // Create new item 
            newItem = new Item(ID, name, calories)

            // Add to items array
            data.items.push(newItem);

            return newItem;

        },
        getItemById: function(id) {
            let found = null;
            // Loop through items
            data.items.forEach((item) => {
                if(item.id === id) {
                    found = item
                }
            })
            
            return found;
        },
        updateItem: function(name, calories) {
            // Calories to number
            calories = parseInt(calories);

            let found = null;

            data.items.forEach((item) => {
                if (item.id === data.currentItem.id) {
                    item.name = name;
                    item.calories = calories;
                    found = item;
                }
            });
            return found;
        },
        deleteItem: function(id) { // from data structure
            //Get ids
            const ids = data.items.map((item) => {
                return item.id // return array of ids
            });

            // Get index
            const index = ids.indexOf(id);

            //Remove item 
            data.items.splice(index, 1);
        },
        clearAllItems: function() {
            data.items = [];
        },
        setCurrentItem: function (item) {
            data.currentItem = item;
        },
        getCurrentItem: function () { // populate currentItem around the app
            return data.currentItem;
        },
        getTotalCalories: function () {
            let total = 0;

            //Loop through items and add calories
            data.items.forEach((item) => {
                total += item.calories;
            })
            // Set total calories in data structure
            data.totalCalories  = total;
            return data.totalCalories
        },
        logData: function() {
            return data;
        }
    }
})();


// data.items
// {id: 0, name: 'Steak Dinner', calories: 1200},
// {id: 1, name: 'Cookie', calories: 400},
// {id: 2, name: 'Eggs', calories: 300},