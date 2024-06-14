sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel) {
        "use strict";

        return Controller.extend("exam.exprogram01.controller.Main", {
            onInit: function () {
                const oRouter = this.getOwnerComponent().getRouter();
                this.getView().setModel(new JSONModel({
                    Conditions : {},
                    LocalProducts : [],
                    LocalChart : []
                }), 'main');

                oRouter.getRoute('RouteMain').attachPatternMatched(this.onPatternMatched, this);

                // var oRouter = this.getOwnerComponent().getRouter();
                // this.oRouter = this.getOwnerComponent().getRouter();

                // var oData = {
                //     CategoryID : " ",
                //     ProductName : " ",
                //     UnitsInStock : " ",
                //     UnitsOnOrder : " "
                // }
                // this.getView().setModel(new JSONModel(oData),"categoery");

            },

            onPatternMatched: function() {
                this.getView().getModel('main').setData({
                    Conditions : {},
                    LocalProducts : [],
                    LocalChart : []
                });

                this.byId("CategoryTable").removeSelections();
            },

            // onGoDetail : function(){
            //     this.oRouter.navTo('RouteDetail', {}, true);
            // },

            onSearch:function(){
                const oTable = this.byId("CategoryTable"),
                      oMainModel = this.getView().getModel('main');
                let oCondition = oMainModel.getData().Conditions,
                    aFilter = [];
                    
                if(oCondition.CategoryID) 
                    aFilter.push(new Filter('CategoryID', 'GE', oCondition.CategoryID));
                if(oCondition.CategoryName) 
                    aFilter.push(new Filter('CategoryName', 'Contains', oCondition.CategoryName));

                oTable.getBinding("items").filter(aFilter);
                oTable.removeSelections();
                
                oMainModel.setProperty("/LocalProducts", []);
                oMainModel.setProperty("/LocalChart", []);
                

                // var oTable = this.byId("tableID");
                // var oBinding = oTable.getBinding("items");

                // var sId = this.byId("InputId").getValue();
                // var sCn = this.byId("InputId2").getValue();

                // var aFilter = [] ;

                // if(sId){
                //     var aFilter = new Filter({
                //         path : 'CategoryID',
                //         operator : 'GE',
                //         value1 : sId
                //     });
                // }

                // if(sCn){
                //     var aFilter = new Filter({
                //         path : 'CategoryName',
                //         operator : "Contains",
                //         value1 : sCn
                //     });
                // }
                //     oBinding.filter(aFilter);

                // if (aFilter.length === "0") {
                //     oBinding.filter([]);
                // } 
            },

            onSelectionChange : function(oEvent){
                let sPath = oEvent.getParameters().listItem.getBindingContextPath(),
                oMainModel = this.getView().getModel('main'),
                oSelectData = this.getView().getModel().getProperty(sPath),
                oFilter = new Filter('CategoryID', 'EQ', oSelectData.CategoryID);

                this.getView().getModel().read("/Products", {
                    filters : [oFilter],
                    success: function(oReturn) {
                        oMainModel.setProperty("/LocalProducts", oReturn.results);
                    }
                });
                
                this.getView().getModel().read("/Sales_by_Categories", {
                    filters : [oFilter],
                    success: function(oReturn) {
                        oMainModel.setProperty("/LocalChart", oReturn.results);
                    }
                });
                    

                // //문제3번 
                // var oTable = oEvent.getSource();
                // var oSelectedCategory = oTable.getSelectedItem().getBindingContext().getObject();
                // var sCategoryID = oSelectedCategory.CategoryID;

                // var oModel = this.getView().getModel();
                // var oProductTable = this.byId("productId");
                
                // oProductTable.getBinding("rows").filter(new Filter("CategoryID", "EQ", sCategoryID));
   

                // //문제4번
                // var select = this.byId("tableID").getModel("categoery");

                // var aFilter = [];
                
                // if(select){
                //     this.byId("idVizFrame").setData(select);}

               
            }
        });
    });
