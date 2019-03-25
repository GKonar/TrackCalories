// ***** App Controller *****
// **************************
const App = (function(ItemCtrl, UICtrl) {
    // Load event listeners
    const loadEventListeners = function () {

        // Get UI selectors from UI controller
        const UISelectors = UICtrl.getSelectors()

        // Add item event 
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

        //Disable submit on enter
        document.addEventListener('keypress', (e) => {
            if(e.keyCode === 13 || e.which === 13) {
                e.preventDefault();
                return false;
            }
        });
        
        // Edit icon click event
        document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

        // Update item event
        document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

    };

    // Add item submit (from btn event listener)
    const itemAddSubmit = function(e) {
        // get form input from UI Controller
        const input = UICtrl.getItemInput();

        // Check for name and calories input
        if (input.name !== '' && input.calories !== '') {
            // Add item 
            const newItem = ItemCtrl.addItem(input.name, input.calories);
            
            // Add item to UI list
            UICtrl.addListItem(newItem);

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();

            //Add totalCalories to UI
            UICtrl.showTotalCalories(totalCalories);

            // Clear fields
            UICtrl.clearInput();
        }

        e.preventDefault()
    };

    // Click edit item
    const itemEditClick = function (e) { // Event delegation
        if (e.target.classList.contains('edit-item')) {
            // Get list item id 
            const listId = e.target.parentNode.parentNode.id; // i want parent of a parent and then its id

            // Break into an array 
            const listIdArr = listId.split('-');
            
            // Get the actual Id
            const id = parseInt(listIdArr[1]);
            
            // Get item
            const itemToEdit = ItemCtrl.getItemById(id);

            // Set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // Add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }

    // Update item submit
    const itemUpdateSubmit = function (e) {
        // Get item input 
        const input = UICtrl.getItemInput();

        //Update item
        const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

        // Update UI
        UICtrl.updateListItem(updatedItem);

        //Get total calories
        const totalCalories = ItemCtrl.getTotalCalories();

        //Add totalCalories to UI
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();
        
        e.preventDefault();
    }

    // Public methods
    return {
        init: function() {
            // Set initial state
            UICtrl.clearEditState();

            // Fetch items from data structure
            const items = ItemCtrl.getItems();
            
            // Check if any items 
            if(items.length === 0) {
                UICtrl.hideList();
            } else {
                // Populate list with items
                UICtrl.populateItemList(items);
            }

            //Get total calories
            const totalCalories = ItemCtrl.getTotalCalories();
            //Add totalCalories to UI
            UICtrl.showTotalCalories(totalCalories);
            
            // Load event listeners
            loadEventListeners();
        }
    }
    
})(ItemCtrl, UICtrl);

// Initialize App
App.init();