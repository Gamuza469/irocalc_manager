function HelperLibrary () {}
/**
 * Converts a given number to an array index by reducing it by one unit
 * @param {type} arrayIndex
 * @returns {Number}
 */
HelperLibrary.prototype.toArrayIndex = function (arrayIndex) {
    return parseInt(arrayIndex, 10) - 1;
};

HelperLibrary.prototype.toNormalIndex = function (arrayIndex) {
    return parseInt(arrayIndex, 10) + 1;
};

/**
 * Class which contains the item name and its bonus effect description.
 * @class
 * @param {number} id
 * @param {string} name
 * @param {string} description
 */
function ItemName (id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
    
    /**
     * Converts the current object into a item name format string.
     * @returns {String}
     */
    this.toItemNameString = function () {
	//If item description is present, meaning it's not number zero and it's exclusively a string, the length of the array increases by one unit.
	if (isNaN(this.description)) {
	    return "[" + this.id + ",0,0,\"" + this.name + "\",\"" + this.description + "\",0]"; 
	} else {
	    return "[" + this.id + ",0,0,\"" + this.name + "\",0]"; 
	}
    };
}

//______________________________________________________________________________

/**
 * Generates the final item name string.
 * @param {Array} itemDataArray
 * @returns {String}
 */
ItemName.prototype.toItemNameFinalString = function (itemDataArray) {
    var itemDataString = new String("[\n\t");
    
    for (var arrayItem = 0; arrayItem < itemDataArray.length; arrayItem++) {
	itemDataString += itemDataArray[arrayItem] + ",\n\t";
    }
    
    itemDataString = itemDataString.substring(0, (itemDataString.length - 3));
    itemDataString += "\n]";
    
    return itemDataString;
};

//______________________________________________________________________________

ItemName.prototype.arrayPositionId = 0;
ItemName.prototype.arrayPositionName = 1;
ItemName.prototype.arrayPositionDescription = 2;

//______________________________________________________________________________

function ItemObject (id, gearType, applicableJobs, itemPower, weaponLevel, gearSlots, gearWeight, minimumBaseLevel, bonusArray) {
    this.id = id;
    this.gearType = gearType;
    this.applicableJobs = applicableJobs;
    this.itemPower = itemPower;
    this.weaponLevel = weaponLevel;
    this.gearSlots = gearSlots;
    this.gearWeight = gearWeight;
    this.minimumBaseLevel = minimumBaseLevel;
    this.bonusArray = bonusArray;
}

//______________________________________________________________________________

function ItemObjectBonus (bonusType, bonusAmount) {
    this.bonusType = bonusType;
    this.bonusAmount = bonusAmount;
}

//______________________________________________________________________________

ItemObject.prototype.parseGearType = function (gearType) {
    var gearTypeValue = 0;
    
    if (isNaN(parseInt(gearType, 10))) {
	switch (gearType) {
	    case "weapTyp_NONE": 
		    gearTypeValue = 0;
		    break;
	    case "weapTyp_BARE": 
		    gearTypeValue = 0;
		    break;
	    case "weapTyp_DAGGER": 
		    gearTypeValue = 1;
		    break;
	    case "weapTyp_SWORD": 
		    gearTypeValue = 2;
		    break;
	    case "weapTyp_SW": 
		    gearTypeValue = 2;
		    break;
	    case "weapTyp_2HSWORD": 
		    gearTypeValue = 3;
		    break;
	    case "weapTyp_2HS": 
		    gearTypeValue = 3;
		    break;
	    case "weapTyp_SWORDII": 
		    gearTypeValue = 3;
		    break;
	    case "weapTyp_SPEAR": 
		    gearTypeValue = 4;
		    break;
	    case "weapTyp_2HSPEAR": 
		    gearTypeValue = 5;
		    break;
	    case "weapTyp_SPEARII": 
		    gearTypeValue = 5;
		    break;
	    case "weapTyp_AXE": 
		    gearTypeValue = 6;
		    break;
	    case "weapTyp_2HAXE": 
		    gearTypeValue = 7;
		    break;
	    case "weapTyp_2HA": 
		    gearTypeValue = 7;
		    break;
	    case "weapTyp_AXEII": 
		    gearTypeValue = 7;
		    break;
	    case "weapTyp_MACE": 
		    gearTypeValue = 8;
		    break;
	    case "weapTyp_ROD": 
		    gearTypeValue = 9;
		    break;
	    case "weapTyp_STAFF": 
		    gearTypeValue = 9;
		    break;
	    case "weapTyp_BOW": 
		    gearTypeValue = 10;
		    break;
	    case "weapTyp_KATAR": 
		    gearTypeValue = 11;
		    break;
	    case "weapTyp_BOOK": 
		    gearTypeValue = 12;
		    break;
	    case "weapTyp_KNUCKLE": 
		    gearTypeValue = 13;
		    break;
	    case "weapTyp_INSTRUMENT": 
		    gearTypeValue = 14;
		    break;
	    case "weapTyp_INSTRU": 
		    gearTypeValue = 14;
		    break;
	    case "weapTyp_WHIP": 
		    gearTypeValue = 15;
		    break;
	    case "weapTyp_HUUMA_SHURIKEN": 
		    gearTypeValue = 16;
		    break;
	    case "weapTyp_HUUMA": 
		    gearTypeValue = 16;
		    break;
	    case "weapTyp_HANDGUN": 
		    gearTypeValue = 17;
		    break;
	    case "weapTyp_RIFLE": 
		    gearTypeValue = 18;
		    break;
	    case "weapTyp_SHOTGUN": 
		    gearTypeValue = 19;
		    break;
	    case "weapTyp_GATLING_GUN": 
		    gearTypeValue = 20;
		    break;
	    case "weapTyp_GATLING": 
		    gearTypeValue = 20;
		    break;
	    case "weapTyp_GRENADE_LAUNCHER": 
		    gearTypeValue = 21;
		    break;
	    case "weapTyp_GRENADE": 
		    gearTypeValue = 21;
		    break;
	    case "weapTyp_SHIELD": 
		    gearTypeValue = 22;
		    break;
	    case "itm_type_HEAD_UPPER": 
		    gearTypeValue = 50;
		    break;
	    case "itm_type_HEAD_MIDDLE": 
		    gearTypeValue = 51;
		    break;
	    case "itm_type_HEAD_LOWER": 
		    gearTypeValue = 52;
		    break;
	    case "itm_type_ARMOR": 
		    gearTypeValue = 60;
		    break;
	    case "itm_type_SHIELD": 
		    gearTypeValue = 61;
		    break;
	    case "itm_type_GARMENT": 
		    gearTypeValue = 62;
		    break;
	    case "itm_type_SHOES": 
		    gearTypeValue = 63;
		    break;
	    case "itm_type_ACCESSORY": 
		    gearTypeValue = 64;
		    break;
	    case "itm_type_SET": 
		    gearTypeValue = 100;
		    break;
	    case "itm_type_UNOBTAINABLE": 
		    gearTypeValue = 999;
		    break;
	}
    } else {
	gearTypeValue = gearType;
    }
    
    return gearTypeValue;
};

//______________________________________________________________________________

ItemObject.prototype.parseBonusArray = function (itemObjectArray) {
    var itemObjectBonusArray = new Array();
    var itemObjectBonus = null;
    if (itemObjectArray.length > 9 && itemObjectArray[8] !== 'bon_NONE') {
	for (var arrayItem = 8; arrayItem < itemObjectArray.length - 1; arrayItem += 2) {
	    itemObjectBonus = new ItemObjectBonus(itemObjectArray[arrayItem], itemObjectArray[arrayItem + 1]);
	    itemObjectBonusArray.push(itemObjectBonus);
	}
    }
    
    return itemObjectBonusArray;
};

//______________________________________________________________________________

ItemObject.prototype.weapTyp_NONE = 0;
ItemObject.prototype.weapTyp_DAGGER = 1;
ItemObject.prototype.weapTyp_SWORD = 2;
ItemObject.prototype.weapTyp_2HSWORD = 3;
ItemObject.prototype.weapTyp_SPEAR = 4;
ItemObject.prototype.weapTyp_2HSPEAR = 5;
ItemObject.prototype.weapTyp_AXE = 6;
ItemObject.prototype.weapTyp_2HAXE = 7;
ItemObject.prototype.weapTyp_MACE = 8;
ItemObject.prototype.weapTyp_ROD = 9;
ItemObject.prototype.weapTyp_BOW = 10;
ItemObject.prototype.weapTyp_KATAR = 11;
ItemObject.prototype.weapTyp_BOOK = 12;
ItemObject.prototype.weapTyp_KNUCKLE = 13;
ItemObject.prototype.weapTyp_INSTRUMENT = 14;
ItemObject.prototype.weapTyp_WHIP = 15;
ItemObject.prototype.weapTyp_HUUMA_SHURIKEN = 16;
ItemObject.prototype.weapTyp_HANDGUN = 17;
ItemObject.prototype.weapTyp_RIFLE = 18;
ItemObject.prototype.weapTyp_SHOTGUN = 19;
ItemObject.prototype.weapTyp_GATLING_GUN = 20;
ItemObject.prototype.weapTyp_GRENADE_LAUNCHER = 21;
ItemObject.prototype.weapTyp_SHIELD = 22;
ItemObject.prototype.itm_type_HEAD_UPPER = 50;
ItemObject.prototype.itm_type_HEAD_MIDDLE = 51;
ItemObject.prototype.itm_type_HEAD_LOWER = 52;
ItemObject.prototype.itm_type_ARMOR = 60;
ItemObject.prototype.itm_type_SHIELD = 61;
ItemObject.prototype.itm_type_GARMENT = 62;
ItemObject.prototype.itm_type_SHOES = 63;
ItemObject.prototype.itm_type_ACCESSORY = 64;
ItemObject.prototype.itm_type_SET = 100;
ItemObject.prototype.itm_type_UNOBTAINABLE = 999;

//______________________________________________________________________________

function Item (id, name, description, gearType, applicableJobs, itemPower, weaponLevel, gearSlots, gearWeight, minimumBaseLevel, bonusArray) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.gearType = gearType;
    this.applicableJobs = applicableJobs;
    this.itemPower = itemPower;
    this.weaponLevel = weaponLevel;
    this.gearSlots = gearSlots;
    this.gearWeight = gearWeight;
    this.minimumBaseLevel = minimumBaseLevel;
    this.bonusArray = bonusArray;
}

//______________________________________________________________________________

Item.prototype.buildGearType = function (gearType) {
    var gearTypeString = 0;
    
    switch (gearType) {
	case 0: 
		gearTypeString = "weapTyp_NONE";
		break;
	case 1: 
		gearTypeString = "weapTyp_DAGGER";
		break;
	case 2: 
		gearTypeString = "weapTyp_SWORD";
		break;
	case 3: 
		gearTypeString = "weapTyp_2HSWORD";
		break;
	case 4: 
		gearTypeString = "weapTyp_SPEAR";
		break;
	case 5: 
		gearTypeString = "weapTyp_2HSPEAR";
		break;
	case 6: 
		gearTypeString = "weapTyp_AXE";
		break;
	case 7: 
		gearTypeString = "weapTyp_2HAXE";
		break;
	case 8: 
		gearTypeString = "weapTyp_MACE";
		break;
	case 9: 
		gearTypeString = "weapTyp_ROD";
		break;
	case 10: 
		gearTypeString = "weapTyp_BOW";
		break;
	case 11: 
		gearTypeString = "weapTyp_KATAR";
		break;
	case 12: 
		gearTypeString = "weapTyp_BOOK";
		break;
	case 13: 
		gearTypeString = "weapTyp_KNUCKLE";
		break;
	case 14: 
		gearTypeString = "weapTyp_INSTRUMENT";
		break;
	case 15: 
		gearTypeString = "weapTyp_WHIP";
		break;
	case 16: 
		gearTypeString = "weapTyp_HUUMA_SHURIKEN";
		break;
	case 17: 
		gearTypeString = "weapTyp_HANDGUN";
		break;
	case 18: 
		gearTypeString = "weapTyp_RIFLE";
		break;
	case 19: 
		gearTypeString = "weapTyp_SHOTGUN";
		break;
	case 20: 
		gearTypeString = "weapTyp_GATLING_GUN";
		break;
	case 21: 
		gearTypeString = "weapTyp_GRENADE_LAUNCHER";
		break;
	case 22: 
		gearTypeString = "weapTyp_SHIELD";
		break;
	case 50: 
		gearTypeString = "itm_type_HEAD_UPPER";
		break;
	case 51: 
		gearTypeString = "itm_type_HEAD_MIDDLE";
		break;
	case 52: 
		gearTypeString = "itm_type_HEAD_LOWER";
		break;
	case 60: 
		gearTypeString = "itm_type_ARMOR";
		break;
	case 61: 
		gearTypeString = "itm_type_SHIELD";
		break;
	case 62: 
		gearTypeString = "itm_type_GARMENT";
		break;
	case 63: 
		gearTypeString = "itm_type_SHOES";
		break;
	case 64: 
		gearTypeString = "itm_type_ACCESSORY";
		break;
	case 100: 
		gearTypeString = "itm_type_SET";
		break;
	case 999: 
		gearTypeString = "itm_type_UNOBTAINABLE";
		break;
    }
    
    return gearTypeString;
};
