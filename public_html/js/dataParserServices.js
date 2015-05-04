/* global itemObject, helperLibrary */

/**
 * Service class for ItemName class.
 * @returns {ItemNameService}
 */
function ItemNameService () {}

//______________________________________________________________________________

/**
 * Formats the inputted string so it can be converted to an array.
 * @param {string} itemNamesString
 * @returns {Array}
 */
ItemNameService.prototype.formatStringToArray = function (itemNamesString) {
    var itemNamesArray = new Array();
    var itemNamesArrayAux = new Array();
    
    itemNamesString = itemNamesString.replace(/\]\s*\,\[/g, ']],[[').replace(/\n/g, '');
    itemNamesArray = itemNamesString.split(new RegExp(/\]\,\[/));
    
    for (var arrayItem = 0; arrayItem < itemNamesArray.length; arrayItem++) {
	itemNamesArray[arrayItem] = itemNamesArray[arrayItem].replace(/\[/g, '').replace(/\]/g, '');
    }
    
    for (var arrayItem = 0; arrayItem < itemNamesArray.length; arrayItem++) {
	    var auxArray = itemNamesArray[arrayItem].split(',');
	    
	    if (auxArray.length > 6) {
		var descriptionLength = helperLibrary.toArrayIndex(auxArray.length);
		
		for (var comma = 5; comma < descriptionLength; comma++) {
		    auxArray[4] += ',' + auxArray[comma];
		}
	    }
	    itemNamesArrayAux.push(auxArray);	
    }
    
    return itemNamesArrayAux;
};

//______________________________________________________________________________

/**
 * Converts the item names array into an item names object array.
 * @param {Array} itemNamesArray
 * @returns {Array|ItemName}
 */
ItemNameService.prototype.createItemNameObject = function (itemNamesArray) {
    var itemNameObjectArray = new Array();
    
    for (var arrayItem = 0; arrayItem < itemNamesArray.length; arrayItem++) {
	var itemNameObject = new ItemName (
	    parseInt(itemNamesArray[arrayItem][0], 10), 
	    // Remove quote marks.
	    new String(itemNamesArray[arrayItem][3].replace(/\"/g, '')),
	    // Check if it has description. If it doesn't, return 0;
	    isNaN(parseInt(itemNamesArray[arrayItem][4], 10)) ? new String(itemNamesArray[arrayItem][4].replace(/\"/g, '')) : 0
	);
	itemNameObjectArray.push(itemNameObject);
    }
    
    return itemNameObjectArray;
};

//______________________________________________________________________________

/**
 * Service class for ItemObject class.
 * @returns {ItemObjectService}
 */
function ItemObjectService () {}

//______________________________________________________________________________

/** 
 * Splits the values of a string into an array.
 * @param {String} itemObjectsString
 * @returns {Array}
 */
ItemObjectService.prototype.formatStringToArray = function (itemObjectsString) {
    var itemObjectsArray = new Array();
    var itemObjectsArrayAux = new Array();
    
    itemObjectsString = itemObjectsString.replace(/\]\D*\s*\,\[/g, ']],[[').replace(/\n/g, '').replace(new RegExp(/\s*\/{2,2}\s*\D*/), '');
    itemObjectsArray = itemObjectsString.split(new RegExp(/\]\,\[/));
    
    for (var arrayItem = 0; arrayItem < itemObjectsArray.length; arrayItem++) {
	itemObjectsArray[arrayItem] = itemObjectsArray[arrayItem].replace(/\[/g, '').replace(/\]/g, '');
    }
    
    for (var arrayItem = 0; arrayItem < itemObjectsArray.length; arrayItem++) {
	itemObjectsArrayAux.push(itemObjectsArray[arrayItem].split(','));
	
    }
    
    return itemObjectsArrayAux;
};

//______________________________________________________________________________

/**
 * Converts an array into an ItemObject array.
 * @param {Array} itemObjectsArray
 * @returns {Array|ItemObject}
 */
ItemObjectService.prototype.createItemObjectObject = function (itemObjectsArray) {
    var itemObjectsObjectArray = new Array();
    
    for (var arrayItem = 0; arrayItem < itemObjectsArray.length; arrayItem++) {
	var itemObjectObject = new ItemObject (
	    parseInt(itemObjectsArray[arrayItem][0], 10), 
	    itemObject.parseGearType(itemObjectsArray[arrayItem][1]), 
	    itemObjectsArray[arrayItem][2],
	    parseInt(itemObjectsArray[arrayItem][3], 10),
	    parseInt(itemObjectsArray[arrayItem][4], 10),
	    itemObjectsArray[arrayItem][5],
	    parseInt(itemObjectsArray[arrayItem][6], 10),
	    parseInt(itemObjectsArray[arrayItem][7], 10),
	    itemObject.parseBonusArray(itemObjectsArray[arrayItem])
	);
	itemObjectsObjectArray.push(itemObjectObject);
    }
    
    return itemObjectsObjectArray;
};

//______________________________________________________________________________
/**
 * Service class for Item class.
 * @returns {ItemService}
 */
function ItemService () {}

//______________________________________________________________________________

/** 
 * Splits the values of both string into an array.
 * The strings must have the same amount of items.
 * @param {String} itemNamesArray
 * @param {String} itemObjectsArray
 * @returns {Array}
 */
ItemService.prototype.createItemObjectArray = function (itemNamesArray, itemObjectsArray) {
    var itemObjectArray = new Array();
    var itemObjectArrayLength = itemNamesArray.length;
    
    for (var arrayItem = 0; arrayItem < itemObjectArrayLength; arrayItem++) {
	var item = new Item (
	    parseInt(itemNamesArray[arrayItem][0], 10), 
	    // Remove quote marks.
	    new String(itemNamesArray[arrayItem][3].replace(/\"/g, '')),
	    // Check if it has description. If it doesn't, return 0;
	    isNaN(parseInt(itemNamesArray[arrayItem][4], 10)) ? new String(itemNamesArray[arrayItem][4].replace(/\"/g, '')) : 0,
	    itemObject.parseGearType(itemObjectsArray[arrayItem][1]), 
	    itemObjectsArray[arrayItem][2],
	    parseInt(itemObjectsArray[arrayItem][3], 10),
	    parseInt(itemObjectsArray[arrayItem][4], 10),
	    itemObjectsArray[arrayItem][5],
	    parseInt(itemObjectsArray[arrayItem][6], 10),
	    parseInt(itemObjectsArray[arrayItem][7], 10),
	    itemObject.parseBonusArray(itemObjectsArray[arrayItem])
	);
	itemObjectArray.push(item);
    }
    
    return itemObjectArray;
};