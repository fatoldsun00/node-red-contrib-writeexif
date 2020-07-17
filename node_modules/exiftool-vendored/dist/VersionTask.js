"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ExifToolTask_1 = require("./ExifToolTask");
var VersionTask = /** @class */ (function (_super) {
    __extends(VersionTask, _super);
    function VersionTask() {
        return _super.call(this, ["-ver"]) || this;
    }
    VersionTask.prototype.parse = function (input) {
        var value = input.trim();
        if (VersionTask.versionRegex.test(value)) {
            return value;
        }
        else {
            throw new Error("Unexpected version " + value);
        }
    };
    VersionTask.versionRegex = /^\d{1,3}\.\d{1,3}(\.\d{1,3}})?$/;
    return VersionTask;
}(ExifToolTask_1.ExifToolTask));
exports.VersionTask = VersionTask;
//# sourceMappingURL=VersionTask.js.map