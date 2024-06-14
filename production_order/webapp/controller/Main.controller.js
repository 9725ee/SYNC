sap.ui.define([
	"sap/ui/core/library",
	"sap/ui/core/Fragment",
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/format/DateFormat",
	"sap/ui/model/json/JSONModel",
    "sap/ui/model/odata/v2/ODataModel",
	"sap/ui/unified/library",
	"sap/m/library",
	"sap/m/MessageToast",
	"sap/ui/core/date/UI5Date"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function(coreLibrary, Fragment, Controller, DateFormat, JSONModel, ODataModel, unifiedLibrary, mobileLibrary, MessageToast, UI5Date) {
        "use strict";
    
        var CalendarDayType = unifiedLibrary.CalendarDayType;
        var ValueState = coreLibrary.ValueState;
    
        return Controller.extend("productionorder.controller.Main", {
    
        onInit: function() {
            var oDataModel = new ODataModel("/sap/opu/odata/sap/ZBA_GW_PP_SRV/");
            this.getView().setModel(oDataModel, "odata");

            oDataModel.read("/PROEntitySet", {
                success: function(oReturn) {
                    var oAppointmentsModel = new JSONModel({
                        startDate: new Date(),
                        appointments: oReturn.results.map(function(item) {
                            return {
                                startDate: new Date(item.Eddate),
                                endDate: new Date(item.Eddate),
                                title: item.Procode,
                                type: CalendarDayType.Type03,
                                Procode: item.Procode,
                                Eddate: item.Eddate,
                                Sapcode: item.Sapcode,
                                Bomid: item.Bomid,
                                Werks: item.Werks,
                                Whcode: item.Whcode,
                                Matname: item.Matname,
                                Proquan: item.Proquan,
                                Unit: item.Unit,
                                Prqdate: item.Prqdate,
                                Stdate: item.Stdate
                            };
                        })
                    });
                    this.getView().setModel(oAppointmentsModel, "appointmentsModel");
                }.bind(this),
                error: function(oError) {
                    console.error(oError);
                }
            });
        },

            //생산오더 상세내역 다이얼로그
            handleAppointmentSelect: function(oEvent) {
                var oAppointment = oEvent.getParameter("appointment");
                var oView = this.getView();
                //var oBindingContext = oAppointment.getBindingContext("appointmentsModel");
               

                if (!this._pDetailsPopover) {
                    this._pDetailsPopover = Fragment.load({
                        id: oView.getId(),
                        name: "productionorder.view.fragment.Detail",
                        controller: this
                    }).then(function(oPopover){
                        oView.addDependent(oPopover);
                        return oPopover;
                    });
                }

                this._pDetailsPopover.then(function(oPopover) {
                    var oBindingContext = oAppointment.getBindingContext("appointmentsModel");
                   
                    if (!oBindingContext) {
                        console.error("Binding context not found for the selected appointment");
                        return;
                    }

                    oPopover.bindElement({
                        path: oBindingContext.getPath(),
                        model: "appointmentsModel"
                    });
                    oPopover.openBy(oAppointment);
                });
            },

            onClose: function(oEvent) {
                this.byId("detailsPopover").close();
            },

        // 날짜 형식
		formatDate: function (oDate) {
            if(oDate){
                var oFormat = sap.ui.core.format.DateFormat.getDateInstance({
                    pattern : 'YYYY년 MM월 dd일'
                });

                return oFormat.format(oDate); //2024-01-08
            }
		},

        handleMoreLinkPress: function(oEvent){
            var oDate = oEvent.getParameter("date"); // 선택한 날짜 가져오기

            if (!oDate) {
                console.error("No date selected");
                return;
            }
            var sTargetDate = this._formatDate(oDate); // 선택한 날짜 포맷팅
            
            var oModel = this.getView().getModel("appointmentsModel");
            var aAppointments = oModel.getProperty("/appointments");
            
            var aFilteredAppointments = aAppointments.filter(function(appointment) {
                var sFormattedEddate = this._formatDate(new Date(appointment.Eddate));
                return sFormattedEddate === sTargetDate;
            }.bind(this));

            var oFilteredModel = new JSONModel({ PROEntitySet: aFilteredAppointments });
            
      
            var nDialog = sap.ui.getCore().byId("ListDialog");

            if (!nDialog){
                Fragment.load({
                    name : "productionorder.view.fragment.List",
                    type : "XML",
                    controller : this
            }).then(function(oDialog) {
                oDialog.setModel(oFilteredModel);  // 필터링된 모델 설정
                oDialog.open();
            }.bind(this));
            } else{ 
                nDialog.setModel(oFilteredModel);  // 필터링된 모델 설정
                nDialog.open();
            }
        },

        _formatDate: function(oDate) {
            return oDate.getFullYear() + "-" +
                ("0" + (oDate.getMonth() + 1)).slice(-2) + "-" +
                ("0" + oDate.getDate()).slice(-2);
        },

        onClose2: function() {
            sap.ui.getCore().byId("ListDialog").close();
        },

        onTableItemPress: function(oEvent){
            var oSelectedItem = oEvent.getParameter("listItem");
            var oBindingContext = oSelectedItem.getBindingContext();
            var sPath = oBindingContext.getPath();
            var oModel = oBindingContext.getModel();
            var oSelectedData = oBindingContext.getProperty(sPath); // 선택한 행의 데이터
        
            if (!this._pDialog) {
                this._pDialog = Fragment.load({
                    id: this.getView().getId(),
                    name: "productionorder.view.fragment.pro",
                    controller: this
                }).then(function(oDialog){
                    oDialog.setModel(oModel); // 모델 설정
                    this.getView().addDependent(oDialog);
                    return oDialog;
                }.bind(this));
            }
            
            this._pDialog.then(function(oDialog) {
                oDialog.bindElement({
                    path: sPath
                });
                oDialog.open();

                console.log("Selected Data:", oSelectedData);
            });
        },
    
        onClose3: function(oEvent) {
            this.byId("prosPopover").close();
        }

        });
    });
    