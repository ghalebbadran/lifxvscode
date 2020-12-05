"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = require("vscode");
const lifx_http_1 = require("./lifx-http");
let _Colors = ["#0085d2", "#d2713a", "#e91300"];
function activate(context) {
    let disposable = vscode.commands.registerCommand('lifxvscode.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from Lifx VS Code!');
    });
    context.subscriptions.push(disposable);
    let lifxHttp = new lifx_http_1.LifxHttp("c4a1105e5a064942f66b7b3182e279a1275395576f213dc9a17269e8a5de5e69", "Nashme");
    lifxHttp.setColor(_Colors[0], 0.2, "");
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((s) => __awaiter(this, void 0, void 0, function* () {
        textEditorTextChanged(s);
    })));
    context.subscriptions.push(vscode.debug.onDidStartDebugSession((s) => __awaiter(this, void 0, void 0, function* () {
        debugStarted(s, lifxHttp);
    })));
    context.subscriptions.push(vscode.debug.onDidChangeActiveDebugSession((s) => __awaiter(this, void 0, void 0, function* () {
        debugActiveSessionChange(s);
    })));
    context.subscriptions.push(vscode.debug.onDidTerminateDebugSession((s) => __awaiter(this, void 0, void 0, function* () {
        debugEnded(s, lifxHttp);
    })));
    context.subscriptions.push(vscode.debug.onDidChangeBreakpoints((s) => __awaiter(this, void 0, void 0, function* () {
        changeBreakpoints(s, lifxHttp);
    })));
}
exports.activate = activate;
function textEditorTextChanged(s) {
    vscode.window.showInformationMessage("wala3at line");
}
function debugStarted(s, lifxHttp) {
    return __awaiter(this, void 0, void 0, function* () {
        // TODO : Set colors from settings
        yield lifxHttp.setColor(_Colors[1], 0.2, "");
        yield lifxHttp.setColor(_Colors[1], 0.5, "|1-5");
        yield lifxHttp.moveEffect();
    });
}
function debugActiveSessionChange(s) {
    vscode.window.showInformationMessage("lets find this");
}
function debugEnded(s, lifxHttp) {
    return __awaiter(this, void 0, void 0, function* () {
        yield lifxHttp.setColor(_Colors[0], 0.2, "");
    });
}
function changeBreakpoints(s, lifxHttp) {
    lifxHttp.pulseEffect(_Colors[1], s.added.length);
}
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map