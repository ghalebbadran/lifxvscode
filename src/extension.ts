import * as vscode from 'vscode';
import { LifxHttp } from './lifx-http';

let _Colors: Array<string> = ["#0085d2", "#d2713a", "#e91300"];

export function activate(context: vscode.ExtensionContext) {
	
	//TODO:: Party Method that makes the lights as a party
	let disposable = vscode.commands.registerCommand('lifxvscode.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from Lifx VS Code!');
	});
	
	vscode.window.showInformationMessage('Loaded Extension!');

	context.subscriptions.push(disposable);

	var configs = vscode.workspace.getConfiguration('lifxApi');

	//TODO:: Validate configs are set

	let lifxHttp = new LifxHttp(configs["ApiKey"], configs["TargetDevice"]);

	lifxHttp.setColor(_Colors[0], 0.2, "");

	context.subscriptions.push(vscode.workspace.onDidChangeTextDocument(async (s) => {
		textEditorTextChanged(s);
	}));

	context.subscriptions.push(vscode.debug.onDidStartDebugSession(async (s) => {
		debugStarted(s, lifxHttp);
	}));

	context.subscriptions.push(vscode.debug.onDidChangeActiveDebugSession(async (s) => {
		debugActiveSessionChange(s);
	}));


	context.subscriptions.push(vscode.debug.onDidTerminateDebugSession(async (s) => {
		debugEnded(s, lifxHttp);
	}));

	context.subscriptions.push(vscode.debug.onDidChangeBreakpoints(async (s) => {
		changeBreakpoints(s, lifxHttp);
	}));
}

function textEditorTextChanged(s: vscode.TextDocumentChangeEvent,) {
	vscode.window.showInformationMessage("wala3at line");
}

async function debugStarted(s: vscode.DebugSession, lifxHttp: LifxHttp) {
	// TODO : Set colors from settings
	await lifxHttp.setColor(_Colors[1], 0.2, "");
	await lifxHttp.setColor(_Colors[1], 0.5, "|1-5");
	await lifxHttp.moveEffect();
}

function debugActiveSessionChange(s: vscode.DebugSession | undefined) {
	vscode.window.showInformationMessage("lets find this");
}

async function debugEnded(s: vscode.DebugSession, lifxHttp: LifxHttp) {
	await lifxHttp.setColor(_Colors[0], 0.2, "");
}

function changeBreakpoints(s: vscode.BreakpointsChangeEvent, lifxHttp: LifxHttp) {
	lifxHttp.pulseEffect(_Colors[1], s.added.length);
}

export function deactivate() { }