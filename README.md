# lifxvscode README

Lifx VSCode extension connects your Lifx lights with VsCode. The communication between VSCode and Lifx lights are done through Lifx LAN API.

## Installation
After installing the extension make sure to fill the label of the Target Device or the extension will use the first device discovered.

## Features

#### Party Mode
When you accomplish something cool, you can make your lights do a dance for you.

#### Debugging Mode
When you are in debugging mode, the lights turn to Color[1] with a motion effect.

### Breakpoints Addition
When you add a breakpoint, the lights will flash once.

### Demo

* [Party Mode](https://twitter.com/ghalebbadran/status/1353082216927158287?s=20)
* [Debuggion Mode](https://twitter.com/ghalebbadran/status/1353082083690864640?s=20)
* [Breakpoints addition](https://twitter.com/ghalebbadran/status/1353081877113004032?s=20)

## Requirements

* Lifx Beam or Lifx Z.
* Should be in the same network that Lifx light is connected to.

## Extension Settings

* `lifxvscode.TargetDevice`: target device name
* `lifxvscode.Colors`: Colors, Color[0] is used for the default state when VS code runs, Color[1] is used for debugging and breakpoint addition 

## Release Notes

### 1.0.0

The initial release of LifxVSCode extension

## Future Work

* Support HTTP API - again -. was implemented but removed.
* Set light pulse when EXCEPTION occurs.
* Enhance the Party mode.

**Enjoy!**
