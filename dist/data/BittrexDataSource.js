"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BaseConversionDataSource_1 = require("./BaseConversionDataSource");
var CurrencyConversion_1 = require("./CurrencyConversion");
var BittrexDataSource = (function (_super) {
    __extends(BittrexDataSource, _super);
    function BittrexDataSource() {
        var _this = _super.apply(this, arguments) || this;
        _this.formatCurrencyConversionData = function (rawCurrencyResponseData) {
            //console.log("Handling response in bittrex handler.");
            _this.formattedCurrencyConversionData = new CurrencyConversion_1.default(_this.baseCurrencySymbol, _this.baseCurrencyLabel, 1, "BTC", "Bitcoin", rawCurrencyResponseData.result.Bid);
        };
        return _this;
    }
    return BittrexDataSource;
}(BaseConversionDataSource_1.default));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BittrexDataSource;
;
//# sourceMappingURL=BittrexDataSource.js.map