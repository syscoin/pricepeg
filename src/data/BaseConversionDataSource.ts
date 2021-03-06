import CurrencyConversion from "./CurrencyConversion";
import {logPegMessage} from "./Utils";
import * as rp from "request-promise";
import * as Q from "q";
import {getConfig} from "../config";

export default class BaseConversionDataSource {

  public rawCurrencyConversionData: any;
  public formattedCurrencyConversionData: CurrencyConversion & any;
  public lastFetchAttemptTime: number = 0;
  public lastSuccessfulFetchTime: number = 0;

  constructor(public baseCurrencySymbol: string, public baseCurrencyLabel: string, public dataUrl: string, public responseDataPath: string = null) {
    this.dataUrl = dataUrl;
    this.baseCurrencySymbol = baseCurrencySymbol;
    this.baseCurrencyLabel = baseCurrencyLabel;
    this.responseDataPath = responseDataPath;
  }

  formatCurrencyConversionData = (rawCurrencyResponseData: any) => {
    //convert the raw currency conversion data to a standard format, may differ by datasource
    if (getConfig().logLevel.logNetworkEvents)
      logPegMessage("Handling response in base data source handler.");

    return null; //this should be overridden!
  };

  fetchCurrencyConversionData = () => {
    //console.log("Fetching currency data from: " + this.baseCurrencyLabel + " - " + this.baseCurrencySymbol + " => " + this.dataUrl);

    this.lastFetchAttemptTime = Date.now();

    let deferred = Q.defer();

    rp.get({
      uri: this.dataUrl,
      json: true
    }).then((parsedBody) => {
        this.handleFetchCurrencyConversionData(parsedBody);
        deferred.resolve();
    })
    .catch((err) => { // if rp.get rejects (e.g. 500), do this:
      logPegMessage("Error requesting data for " + this.dataUrl + " ,err: " + JSON.stringify(err));
      deferred.reject("Error requesting data for " + this.dataUrl + " ,err: " + JSON.stringify(err));
    });

    return deferred.promise;
  };

  handleFetchCurrencyConversionData = (response: any) => {
    this.rawCurrencyConversionData = response;
    this.lastSuccessfulFetchTime = Date.now();

    if (getConfig().logLevel.logNetworkEvents)
      logPegMessage(this.dataUrl + " returned!");

    this.formatCurrencyConversionData(this.rawCurrencyConversionData);
  };

}

