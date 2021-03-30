// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

function doSelection(type) {
  
  var editor = vscode.window.activeTextEditor;

  if (!editor) {
    return; // No open text editor
  }
  
  var selections = editor.selections;
  
  var firstSelection = editor.document.getText(selections[0]);

  if (firstSelection.length <= 0) {
    return
  }

  editor.edit(function (edit) {
    let num = 0;
    selections.forEach(function (selection) {
      const curText = editor.document.getText(selection)
      if (type === 'random') {
        num = Math.floor(Math.random() * 100)
      } else {
        num++
      }
      edit.replace(selection, curText + num);
    })
  });
}


/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "auto-increment-selection" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('auto-increment-selection.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		// vscode.window.showInformationMessage('Hello World from auto-increment-selection!');
	// });
  let incrementSelection = vscode.commands.registerCommand('extension.incrementSelection', function () {
    doSelection('increment');
  });

  
  let randomSelection = vscode.commands.registerCommand('extension.randomSelection', function () {
    doSelection('random');
  });

	context.subscriptions.push(incrementSelection, randomSelection);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
