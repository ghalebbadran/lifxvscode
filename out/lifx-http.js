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
exports.LifxHttp = void 0;
const axios_1 = require("axios");
class LifxHttp {
    constructor(token, target) {
        this._BaseUrl = "";
        this._BaseUrl = `https://api.lifx.com/v1/lights/label:${target}`;
        this._AxiosInstance = axios_1.default.create({
            baseURL: this._BaseUrl,
            headers: { "Authorization": `Bearer ${token}` }
        });
    }
    setColor(color, brightness, zones) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {
                "power": "on",
                "color": color,
                "brightness": brightness,
                "duration": 0.2
            };
            try {
                yield this._AxiosInstance.put(`${this._BaseUrl}${zones}/state`, body);
            }
            catch (exception) {
                console.log(exception);
            }
        });
    }
    moveEffect() {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {};
            try {
                yield this._AxiosInstance.post(`/effects/move`, body);
            }
            catch (exception) {
                console.log(exception);
            }
        });
    }
    pulseEffect(color, cycles) {
        return __awaiter(this, void 0, void 0, function* () {
            let body = {
                "color": color,
                "cycles": cycles,
                "duration": 0.2,
                "persist": false
            };
            try {
                yield this._AxiosInstance.post(`/effects/pulse`, body);
            }
            catch (exception) {
                console.log(exception);
            }
        });
    }
}
exports.LifxHttp = LifxHttp;
//# sourceMappingURL=lifx-http.js.map