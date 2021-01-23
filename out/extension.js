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
const Lifx = require("node-lifx-lan");
let _Configs;
let _Colors = [];
let _TargetDevice = null;
function activate(context) {
    _Configs = vscode.workspace.getConfiguration("lifxvscode");
    _Colors = _Configs.get("Colors");
    Lifx.discover()
        .then((device_list) => {
        if (device_list.length > 0) {
            device_list.forEach((device) => {
                if (device.deviceInfo.label == _Configs.get("TargetDevice")) {
                    initalizeExtension(context, device);
                    return;
                }
            });
            initalizeExtension(context, device_list[0]);
        }
        else {
            vscode.window.showErrorMessage("No Lifx device found!");
        }
    })
        .catch((error) => {
        console.error(error);
    });
}
exports.activate = activate;
function initalizeExtension(context, device) {
    _TargetDevice = device;
    _TargetDevice.setColor({ color: _Colors[0] });
    context.subscriptions.push(vscode.workspace.onDidChangeTextDocument((s) => __awaiter(this, void 0, void 0, function* () {
        textEditorTextChanged(s);
    })));
    context.subscriptions.push(vscode.debug.onDidStartDebugSession((s) => __awaiter(this, void 0, void 0, function* () {
        debugStarted(s);
    })));
    context.subscriptions.push(vscode.debug.onDidChangeActiveDebugSession((s) => __awaiter(this, void 0, void 0, function* () {
        debugActiveSessionChange(s);
    })));
    context.subscriptions.push(vscode.debug.onDidTerminateDebugSession((s) => __awaiter(this, void 0, void 0, function* () {
        debugEnded();
    })));
    context.subscriptions.push(vscode.debug.onDidChangeBreakpoints((s) => __awaiter(this, void 0, void 0, function* () {
        changeBreakpoints(s);
    })));
    vscode.commands.registerCommand("lifxvscode.party", () => {
        party();
    });
    vscode.window.showInformationMessage(`Connected to Lifx device with name: ${_TargetDevice.deviceInfo.label}`);
}
function textEditorTextChanged(s) { }
function debugStarted(s) {
    return __awaiter(this, void 0, void 0, function* () {
        _TargetDevice.setColor({ color: _Colors[1] });
        _TargetDevice.multiZoneSetColorZones({
            start: 0,
            end: 5,
            color: {
                hue: _Colors[1].hue,
                saturation: _Colors[1].saturation,
                brightness: 0.8,
                kelvin: 3500,
            },
            duration: 0,
            apply: 1,
        });
        _TargetDevice.multiZoneSetEffect({
            type: 1,
            speed: 1000,
            duration: 0,
            direction: 1,
        });
    });
}
function debugActiveSessionChange(s) { }
function debugEnded() {
    return __awaiter(this, void 0, void 0, function* () {
        _TargetDevice.setColor({ color: _Colors[0] });
    });
}
function changeBreakpoints(s) {
    if (s.added.length == 1) {
        _TargetDevice.lightSetWaveform({
            transient: 1,
            color: _Colors[1],
            period: 600,
            cycles: 1,
            waveform: 4,
            skew_ratio: 0.5,
        });
    }
}
function party() {
    _TargetDevice.lightSetWaveform({
        transient: 1,
        color: _Colors[1],
        period: 3000,
        cycles: 1,
        waveform: 1,
    });
}
function deactivate() {
    debugEnded();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map