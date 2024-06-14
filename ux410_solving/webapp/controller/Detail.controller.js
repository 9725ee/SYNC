sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("sap.btp.ux410solving.controller.Employee", {
           
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this._onPatternMatched, this);
            },

           
            _onPatternMatched : function(oEvent){
                var aArgu = oEvent.getParameter('arguments');

                this.byId("SimpleFormID").bindElement(`/Order_Details(OrderID=${aArgu.key1},ProductID=${aArgu.key2})`);

                // '/Orders(value)'

                // '/Order_Details(key1=value,key2=value)'
    
            },

            onNavBack : function(){
                this.oRouter.navTo('RouteMain',{});
            }
           
            
        });
    });
