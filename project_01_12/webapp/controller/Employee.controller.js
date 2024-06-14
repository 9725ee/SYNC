sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sync.project0112.controller.Employee", {
           
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteEmployee").attachPatternMatched(this._onPatternMatched, this);
            },

           
            _onPatternMatched : function(oEvent){
                var aArgu = oEvent.getParameters().arguments;
                console.log(oEvent.getParameters());
    
            },

            onNavBack : function(){
                this.oRouter.navTo('RouteMain',{});
            }
           
            
        });
    });
