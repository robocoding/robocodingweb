var line = 
	"<xml>" +
		"<block type='controls_if' x='25' y='25'>" +
			"<value name='IF0'>" +
		      "<block type='sumorobot_line'>" +
		        "<field name='LINE'>MIDDLE</field>" +
		      "</block>" +
		    "</value>" +
			"<statement name='DO0'>" +
				"<block type='sumorobot_move'>" +
					"<field name='MOVE'>STOP</field>" +
				"</block>" +
			"</statement>" +
		"</block>" +
	"</xml>";

var enemy = 
	"<xml>" +
		"<block type='controls_if' x='25' y='25'>" +
			"<value name='IF0'>" +
		      "<block type='sumorobot_enemy'>" +
		        "<field name='ENEMY'>FRONT</field>" +
		      "</block>" +
		    "</value>" +
			"<statement name='DO0'>" +
				"<block type='sumorobot_move'>" +
					"<field name='MOVE'>FORWARD</field>" +
				"</block>" +
			"</statement>" +
		"</block>" +
	"</xml>";

/* When code has changed */
var onCodeChanged = function onCodeChanged() {
	$('#arduino-code').val(Blockly.Arduino.workspaceToCode());
};

/* Example code snippets */
var showExample = function showExample(exampleXML) {
	Blockly.mainWorkspace.clear();
	var xml = Blockly.Xml.textToDom(exampleXML);
	Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xml);
};

/* Send the code */
var sendCode = function sendCode() {
	socket.emit('send-sumorobot-code', Blockly.Arduino.workspaceToCode());
};

/* Get a users code */
var getCode = function getCode(userEmail) {
	socket.emit('get-code', 'sumorobot', userEmail);
};

/* Show the code */
var showCode = function showCode() {
	alert(Blockly.Arduino.workspaceToCode());
};

/* When DOM has been loaded */
window.onload = function() {
	// initialize blockly
	Blockly.inject(document.getElementById('blockly-div'), {
		trashcan: true,
		path: '/js/blockly/',
		toolbox: document.getElementById('toolbox')
	});
	Blockly.addChangeListener(onCodeChanged);
}