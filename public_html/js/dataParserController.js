/**
 * Controller class which handles the parsing of the data inputted by the user
 * and converts it to web controls.
 * @returns {DataParserController}
 */
function DataParserController () {
    this.itemNameService = new ItemNameService();
    this.itemObjectService = new ItemObjectService();
    this.itemService = new ItemService();
    this.itemView = new ItemView();
}

//______________________________________________________________________________

/**
 * Generates an object array off the item name string supplied.
 */
DataParserController.prototype.generateDataObjects = function () {
    /*
    var itemNamesString = new String($('#itemNamesIn').val());
    var itemObjectString = new String($('#itemObjectIn').val());
    
    var itemNamesArray = this.itemNameService.formatStringToArray(itemNamesString);
    var itemNameObjectArray = this.itemNameService.createItemNameObject(itemNamesArray);
    
    var itemObjectsArray = this.itemObjectService.formatStringToArray(itemObjectString);
    var itemObjectsObjectArray = this.itemObjectService.createItemObjectObject(itemObjectsArray);
    
    this.itemService.createItemObjectArray(itemNamesArray, itemObjectsArray);
    
    this.itemNameView.createWebControl(itemNameObjectArray);
    */
   
    var itemNamesString = new String($('#itemNamesIn').val());
    var itemObjectString = new String($('#itemObjectIn').val());
    
    var itemNamesArray = this.itemNameService.formatStringToArray(itemNamesString);
    var itemObjectsArray = this.itemObjectService.formatStringToArray(itemObjectString);
    var itemsArray = this.itemService.createItemObjectArray(itemNamesArray, itemObjectsArray);
    
    this.itemView.createWebControl(itemsArray);
};

//______________________________________________________________________________

/**
 * Controller class which builds the necessary outputs
 * and return them to web controls.
 * @returns {DataBuilderController}
 */
function DataBuilderController () {
    this.itemNameService = new ItemNameService();
    this.itemNameView = new ItemNameView();
}