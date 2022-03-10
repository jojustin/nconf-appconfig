/*
 * nconf-appconfig.js: IBM Cloud App Configuration storage for nconf configuration(s)
 *
 * (C) 2022, Josephine Eskaline Joyce
 *
 */
var async = require('async'),
	{ AppConfiguration } = require('ibm-appconfiguration-node-sdk'); // App Configuration SDK
	nconf = require('nconf');

// Variable to track App Configuration initialization
var appConfigInitialized = false;

//
// ### function Appconfig (options)
// #### @options {Object} Options for this instance
// Constructor function for the AppConfig nconf store
//
var Appconfig = exports.Appconfig = function (options) {
	options        			= options || {};
	this.type     			= "appconfig";
	this.store    			= {};
	this.region    			= options.region || 'us-south';
	this.guid      			= options.guid || 'guid';
	this.apikey    			= options.apikey   || 'apikey';
	this.collectionId  		= options.collectionId  || 'collectionId';
	this.environmentId  	= options.environmentId  || 'environmentId';  
	this.appconfigInstance  = AppConfiguration.getInstance();
	
	this.appconfigInstance.init(this.region, this.guid, this.apikey);
	this.appconfigInstance.setDebug(true);
	this.appconfigInstance.setContext(this.collectionId, this.environmentId);
	this.appconfigInstance.emitter.on('configurationUpdate', () => {
		appConfigInitialized = true;
	});
};

//
// Define a getter so that `nconf.AppConfig` 
// is available and thus backwards compatible.
//
nconf.Appconfig = this.Appconfig;


function isEmptyObject(obj) {
	for (var key in obj) {
		if (Object.prototype.hasOwnProperty.call(obj, key)) {
			return false;
		}
	}
	return true;
}

Appconfig.prototype.isInitialized = function () {
	return appConfigInitialized;
}

//
// ### function get (propname, callback)
// #### @key {string} Key to retrieve for this instance.
// #### @callback {function} Continuation to respond to when complete.
// Retrieves the value for the specified property name (if any).
//
Appconfig.prototype.get = function (propname, callback) {
	var propertyObj = this.appconfigInstance.getProperties();
	callback = callback || function () { };

	if(isEmptyObject(propertyObj)) {
		err = "Config property does not exist in IBM Cloud App Configuration"
		return callback(err);
	} else {
		const property = propertyObj[propname.key];

		if(isEmptyObject(property)) {
			err = "Config property does not exist in IBM Cloud App Configuration"
			return callback(err);
		} else {
			const propertyValue = property.getCurrentValue(key.entityid)		
			return propertyValue; 
		}
	}
};

// ### function loadSync
// Returns the store managed by this instance
//
Appconfig.prototype.loadSync = function () {
	var propertyObj = this.appconfigInstance.getProperties();
	return propertyObj; 
};

module.exports = {
	isInitialized: Appconfig.prototype.isInitialized
};