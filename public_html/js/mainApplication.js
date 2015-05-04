function MainApplicationHandler () {
    this.dataParserController = new DataParserController();
};

var mainApplicationHandler = new MainApplicationHandler();

var itemName = new ItemName();
var itemObject = new ItemObject();
var item = new Item();
var helperLibrary = new HelperLibrary();

$(document).ready(function(){
    $('#parseData').click(function(){
	mainApplicationHandler.dataParserController.generateDataObjects();
    });
});