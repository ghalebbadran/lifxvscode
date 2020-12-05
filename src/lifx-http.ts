import Axios from 'axios';
import { Color } from 'vscode';

export class LifxHttp {
    _AxiosInstance: any;
    _BaseUrl: string = "";
    constructor(token: string, target: string) {
        this._BaseUrl = `https://api.lifx.com/v1/lights/label:${target}`;
        this._AxiosInstance = Axios.create({
            baseURL: this._BaseUrl,
            headers: { "Authorization": `Bearer ${token}` }
        });
    }

    async setColor(color: string, brightness: number, zones: string) {
        let body = {
            "power": "on",
            "color": color,
            "brightness": brightness,
            "duration": 0.2
        };

        try {
            await this._AxiosInstance.put(`${this._BaseUrl}${zones}/state`, body);
        }
        catch (exception) {
            console.log(exception);
        }
    }

    async moveEffect() {
        let body = {
        };

        try {
            await this._AxiosInstance.post(`/effects/move`, body);
        }
        catch (exception) {
            console.log(exception);
        }
    }

    async pulseEffect(color: string, cycles: number) {
        let body = {
            "color": color,
            "cycles": cycles,
            "duration": 0.2,
            "persist": false

        };

        try {
            await this._AxiosInstance.post(`/effects/pulse`, body);
        }
        catch (exception) {
            console.log(exception);
        }
    }
}
