/* global itemName */

function ItemNameView () {}

//______________________________________________________________________________

/**
 * Takes all item data, form and present the new item data strings.
 */
ItemNameView.prototype.obtainItemNameObjects = function () {
    var $itemNameObjects = $('.itemNameObject');
    var itemNameArray = this.buildNewItemNameObjects($itemNameObjects);
    
    $('#itemNamesOut').val(itemNameArray);
};

//______________________________________________________________________________

/**
 * Returns the final item name string.
 * @param {jQuery Element} $itemNameObjects
 * @returns {String}
 */
ItemNameView.prototype.buildNewItemNameObjects = function ($itemNameObjects) {
    var itemNameQuantity = $itemNameObjects.length;
    var itemNameObject = null;
    var itemNameArray = new Array();
    
    for (var jQueryItem = 0; jQueryItem < itemNameQuantity; jQueryItem++) {
	itemNameObject = new ItemName (
	    $($($itemNameObjects.get(jQueryItem)).children('input[type="text"]').get(itemName.arrayPositionId)).val(),
	    $($($itemNameObjects.get(jQueryItem)).children('input[type="text"]').get(itemName.arrayPositionName)).val(),
	    $($($itemNameObjects.get(jQueryItem)).children('input[type="text"]').get(itemName.arrayPositionDescription)).val()
	);
	
	itemNameArray.push(itemNameObject.toItemNameString());
    }
    
    return itemName.toItemNameFinalString(itemNameArray);
};

//______________________________________________________________________________

function ItemView () {
    this.buildGearTypeOptionList = function () {
	var gearTypeOptionList = new String (
	    '<option value="0">weapTyp_NONE</option>' +
	    '<optgroup label="Weapons">' +
	    '<option value="1">weapTyp_DAGGER</option>' +
	    '<option value="2">weapTyp_SWORD</option>' +
	    '<option value="3">weapTyp_2HSWORD</option>' +
	    '<option value="4">weapTyp_SPEAR</option>' +
	    '<option value="5">weapTyp_2HSPEAR</option>' +
	    '<option value="6">weapTyp_AXE</option>' +
	    '<option value="7">weapTyp_2HAXE</option>' +
	    '<option value="8">weapTyp_MACE</option>' +
	    '<option value="9">weapTyp_ROD</option>' +
	    '<option value="10">weapTyp_BOW</option>' +
	    '<option value="11">weapTyp_KATAR</option>' +
	    '<option value="12">weapTyp_BOOK</option>' +
	    '<option value="13">weapTyp_KNUCKLE</option>' +
	    '<option value="14">weapTyp_INSTRUMENT</option>' +
	    '<option value="15">weapTyp_WHIP</option>' +
	    '<option value="16">weapTyp_HUUMA_SHURIKEN</option>' +
	    '<option value="17">weapTyp_HANDGUN</option>' +
	    '<option value="18">weapTyp_RIFLE</option>' +
	    '<option value="19">weapTyp_SHOTGUN</option>' +
	    '<option value="20">weapTyp_GATLING_GUN</option>' +
	    '<option value="21">weapTyp_GRENADE_LAUNCHER</option>' +
	    '<option value="22">weapTyp_SHIELD</option>' +
	    '</optgroup>' +
	    '<optgroup label="Armor">' +
	    '<option value="50">itm_type_HEAD_UPPER</option>' +
	    '<option value="51">itm_type_HEAD_MIDDLE</option>' +
	    '<option value="52">itm_type_HEAD_LOWER</option>' +
	    '<option value="60">itm_type_ARMOR</option>' +
	    '<option value="61">itm_type_SHIELD</option>' +
	    '<option value="62">itm_type_GARMENT</option>' +
	    '<option value="63">itm_type_SHOES</option>' +
	    '<option value="64">itm_type_ACCESSORY</option>' +
	    '<option value="100">itm_type_SET</option>' +
	    '<option value="999">itm_type_UNOBTAINABLE</option>' +
	    '</optgroup>'
	);
    
	return gearTypeOptionList;
    };
    
    this.buildWeaponLevelOptionList = function () {
	var weaponLevelOptionList = new String(
	    '<option value="0">None (Armor)</option>' +
	    '<option value="1">Level 1</option>' +
	    '<option value="2">Level 2</option>' +
	    '<option value="3">Level 3</option>' +
	    '<option value="4">Level 4</option>'
	);
    
	return weaponLevelOptionList;
    };
    
    this.buildSlotsOptionList = function () {
	var slotOptionList = new String(
	    '<option value="0">None</option>' +
	    '<option value="1">1 Slot</option>' +
	    '<option value="2">2 Slots</option>' +
	    '<option value="3">3 Slots</option>' +
	    '<option value="4">4 Slots</option>'
	);
    
	return slotOptionList;
    };
    
    this.buildBaseLevelOptionList = function () {
	var baseLevelOptionList = new String(
	    '<option value="0">None</option>'
	);
    
	for (var level = 1; level <= 175; level++) {
	    baseLevelOptionList += '<option value="' + level + '">' + level + '</option>';
	}
    
	return baseLevelOptionList;
    };
}

//______________________________________________________________________________

/**
 * Generates the necessary form controls for each item.
 * @param {Array|Item} itemArray
 */
ItemView.prototype.createWebControl = function (itemArray) {
    $('#itemNameObjects').empty();
    
    var gearTypeOptionList = this.buildGearTypeOptionList();
    var weaponLevelOptionList = this.buildWeaponLevelOptionList();
    var slotsOptionList = this.buildSlotsOptionList();
    var baseLevelOptionList = this.buildBaseLevelOptionList();
    
    for (var arrayItem = 0; arrayItem < itemArray.length; arrayItem++) {
	var webControlItemName = new String(
	    '<span class="itemNameObject">' +
	    '<label for="itemNameId' + arrayItem + '">Item Id.:</label><input class="itemNameId" id="itemNameId' + arrayItem + '" type="text" />' +
	    '<label for="itemNameName' + arrayItem + '">Item Name:</label><input class="itemNameName" id="itemNameName' + arrayItem + '" type="text"/>' +
	    '<label for="itemNameDescription' + arrayItem + '">Item Description:</label><input class="itemNameDescription" id="itemNameDescription' + arrayItem + '" type="text"/>' +
	    //'<input id="itemNameObject' + arrayItem + '" type="button" value="Remove Item" /><br/>' +
	    '</span>'
	);
    
	var webControlItemObject = new String(
	    '<span class="itemObjectObject">' +
	    '<label for="itemObjectGearType' + arrayItem + '">Gear Type:</label><select class="itemObjectGearType" id="itemObjectGearType' + arrayItem + '"></select>' +
	    '<label for="itemObjectJobs' + arrayItem + '">Appplicable Jobs:</label><input class="itemObjectJobs" id="itemObjectJobs' + arrayItem + '" readonly type="text" />' +
		'<input id="itemObjectJobsSet' + arrayItem + '" type="button" value="Set Jobs"/>' +
	    '<label for="itemObjectItemPower' + arrayItem + '">Item Power:</label><input class="itemObjectItemPower" id="itemObjectItemPower' + arrayItem + '" type="text" />' +
	    '<label for="itemObjectWeaponLevel' + arrayItem + '">Weapon Level:</label><select class="itemObjectWeaponLevel" id="itemObjectWeaponLevel' + arrayItem + '"></select>' +
	    '<label for="itemObjectSlots' + arrayItem + '">Slots:</label><select class="itemObjectSlots" id="itemObjectSlots' + arrayItem + '"></select><br />' +
	    '<label for="itemObjectGearWeight' + arrayItem + '">Weight:</label><input class="itemObjectGearWeight" id="itemObjectGearWeight' + arrayItem + '" type="text" />' +
	    '<label for="itemObjectMinLevel' + arrayItem + '">Min. Level:</label><select class="itemObjectMinLevel" id="itemObjectMinLevel' + arrayItem + '"></select><br/ >' +
	    '<label for="itemObjectBonusArray' + arrayItem + '">Bonuses:</label><textarea class="itemObjectBonusArray" id="itemObjectBonusArray' + arrayItem + '" readonly></textarea>' +
	    '</span>'
	);
    
	var webControl = webControlItemName + webControlItemObject + '<hr />';
	
	$('#itemNameObjects').append(webControl);
	$('#itemObjectGearType' + arrayItem).append(gearTypeOptionList);
	$('#itemObjectWeaponLevel' + arrayItem).append(weaponLevelOptionList);
	$('#itemObjectSlots' + arrayItem).append(slotsOptionList);
	$('#itemObjectMinLevel' + arrayItem).append(baseLevelOptionList);
	
	$('#itemNameId' + arrayItem).val(itemArray[arrayItem].id);
	$('#itemNameName' + arrayItem).val(itemArray[arrayItem].name);
	$('#itemNameDescription' + arrayItem).val(itemArray[arrayItem].description);
    }
    
    $('#itemNameObjects').append('<input id="buildData" type="button" value="Build Data Strings" />');
    
    // Instantiate the class to access its method. Needs revision and relocation.
    $('#buildData').click(function(){
	new ItemNameView().obtainItemNameObjects();
    });
};

