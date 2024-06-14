sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter', 
    'sap/ui/model/FilterOperator',
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,Filter,FilterOperator,JSONModel) {
        "use strict";

        return Controller.extend("odata.project0109.controller.Main", {
            onInit: function () {
                var oData = {
                    OrderID : '',
                    CustomerID : '',
                    OrderDate_start : null,
                    OrderDate_end : null
                }
                this.getView().setModel(new JSONModel(),'search');

                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute('RouteMain').attachPatternMatched(this._onPattenMattched, this);
            },

           
            _onPatternMatched : function(oEvent){
                var aArgu = oEvent.getParameters().arguments;
               
            },


            fnDateToString : function(sValue){
                if(sValue){
                    var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                        pattern : 'YYYY-MM-dd'
                    });

                    return oFormat.format(sValue); //2024-01-08
                }

            },

            onValueHelpRequestCustomer : function(){
                this.byId("idCustomerDialog").open();
            },

            onClose: function(oEvent){
                oEvent.getSource().getParent().close();
            },

            onValueHelpRequest: function() {
                sap.m.MessageToast.show('팝업 오픈!');
            },

            onSearch : function(){
                // var sOrderID = this.byId("idOrderID").getValue();
                // var sCustomerID = this.byId("idCustomerID").getValue();

                // var Date1 = this.byId("idOrderDate").getDateValue();
                // var Date2 = this.byId("idOrderDate").getSecondDateValue();
                var oSearchData = this.getView().getModel('search').getData();
                // oSearchData {OrderID : '', CustomerID : '', 
                //              OrderDate_start : '', OrderDate_end: ''}
                var aFilter = [];

                // debugger;

                if(oSearchData.OrderID){
                    aFilter.push(new Filter({
                        path : 'OrderID',      //대상 필드명
                        operator : 'BT',  //연산자(조건)
                        value1: oSearchData.OrderID,  //값 (BT의 경우 From)
                        value2: ''     //값 (BT의 경우 TO)
                    }));     
                } 
                if(oSearchData.CustomerID){
                    aFilter.push( new Filter({
                        path : 'CustomerID',
                        operator : "Contains",
                        value1 : oSearchData.CustomerID
                    }));
                }
                if(oSearchData.OrderDate_start && oSearchData.OrderDate_end){
                    aFilter.push(new Filter({
                            path :'OrderDate',
                            operator :'BT',
                            value1 :oSearchData.OrderDate_start,
                            value2 : oSearchData.OrderDate_end
                        }))}
                
            
                this.byId("idTable").getBinding("items").filter(aFilter);
                
            },

            //***************filters 사용 시 ************/
            // var sOrderID = this.byId("idOrderID").getValue();
            // var sCustomerID = this.byId("idCustomerID").getValue();
           

            
            // var aFilter = [];

            // if(sOrderID) aFilter.push(new Filter('OrderID', 'EQ', sOrderID));
            // if(sCustomerID) aFilter.push(new Filter('CustmoerID','Contains', sCustomerID))
            // 

            // this.byID("idTable").getBinding("items").filter(new Filter({
            //     filters : aFilter,
            //     and : true // OR조건이됨
            // }));
            // }
            // filters 쓸 때 주의
            // aFilter 배열에 필터 객체가 1개 이상인 경우만 적용하고,
            // 필터 객체가 없는 빈 배열이면 적용하지 않기 !
    

            // sap.m.Table 에서, selectionChange 이벤트 실행
            onSelectionChange : function(oEvent){
                // 상대 경로로 지정되어 있는 데이터 셋에서, 내가 선택한 Row의 모델 경로를 얻음
                var sPath = oEvent.getParameters().listItem.getBindingContextPath();
                // 모델 경로를 통해서, 해당 경로의 전체 데이터를 얻음
                var oSelectData = this.getView().getModel().getProperty(sPath);

                this.oRouter.navTo('RouteOrders', {
                    OrderID : oSelectData.OrderID
                }, true);


                // alert(oSelectData.OrderID) ;
                // Dialog 호출
                // local 이름의 JSONModel이 전역으로 사용 할 수 있도록 생성되어 있음
                // local 모델에 데이터를 담아놓으면 
                // Dialog 에서도 사용이 가능함
                
                // 주의) Fragment.load()를 통해서, 팝업 호출시 
                //      해당 팝업에 모델 데이터를 띄우기 위해서는  
                //     호출된 Dialog에 .setModel(모델객체) 해줘야 함
            }
         
        });
    });
