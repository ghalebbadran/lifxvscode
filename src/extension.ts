import * as vscode from "vscode";
const Lifx = require("node-lifx-lan");

let _Configs: vscode.WorkspaceConfiguration;
let _Colors: any = [];
let _TargetDevice: any = null;

export function activate(context: vscode.ExtensionContext) {
  _Configs = vscode.workspace.getConfiguration("lifxvscode");
  _Colors = _Configs.get("Colors");

  Lifx.discover()
    .then((device_list) => {
      device_list.forEach((device) => {
        if (device.deviceInfo.label == _Configs.get("TargetDevice")) {
					initalizeExtension(context, device);
          return;
        }
      });
    })
    .catch((error) => {
      console.error(error);
    });
}

function initalizeExtension(context: vscode.ExtensionContext, device: any) {
  _TargetDevice = device;

  _TargetDevice.setColor({ color: _Colors[0] });

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument(async (s) => {
      textEditorTextChanged(s);
    })
  );

  context.subscriptions.push(
    vscode.debug.onDidStartDebugSession(async (s) => {
      debugStarted(s);
    })
  );

  context.subscriptions.push(
    vscode.debug.onDidChangeActiveDebugSession(async (s) => {
      debugActiveSessionChange(s);
    })
  );

  context.subscriptions.push(
    vscode.debug.onDidTerminateDebugSession(async (s) => {
      debugEnded();
    })
  );

  context.subscriptions.push(
    vscode.debug.onDidChangeBreakpoints(async (s) => {
      changeBreakpoints(s);
    })
  );

	vscode.commands.registerCommand('lifxvscode.party', () => {
		party();
	});

  vscode.window.showInformationMessage("Connected to Lifx!");
}

function textEditorTextChanged(s: vscode.TextDocumentChangeEvent) {
}

async function debugStarted(s: vscode.DebugSession) {
  _TargetDevice.setColor({ color: _Colors[1] });

  _TargetDevice.multiZoneSetColorZones({
    start: 0,
    end: 5,
    color: {
      hue: _Colors[1].hue,
      saturation: _Colors[1].saturation,
      brightness: .8,
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
}

function debugActiveSessionChange(s: vscode.DebugSession | undefined) {}

async function debugEnded() {
  _TargetDevice.setColor({ color: _Colors[0] });
}

function changeBreakpoints(s: vscode.BreakpointsChangeEvent) {
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
		waveform: 1
	});
}

export function deactivate() {
  debugEnded();
}
