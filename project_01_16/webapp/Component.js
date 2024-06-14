/**
 * eslint-disable @sap/ui5-jsdocs/no-jsdoc
 */
// 변수선언 (얘가 진짜 전역변수)
var _rootPath = jQuery.sap.getModulePath("project0116").split('~/')[0];
debugger;


sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project0116/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project0116.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device");
            }
        });
    }
);