sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/ui/model/json/JSONModel",
    "sap/m/Title" 
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, Filter, JSONModel, Title) {
        "use strict";

        return Controller.extend("zbabom.controller.Detail", {
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute("RouteDetail").attachPatternMatched(this.onPatternMatched, this);
            },

            onPatternMatched(oEvent) {
                let oParam = oEvent.getParameters().arguments,
                    oFilter = new Filter('Bomid', 'EQ', oParam.id),
                    sMatname = oParam.matname;  // URL 파라미터에서 자재명을 가져옴
                    
                    // console.log("Matched Matname:", sMatname); // URL 파라미터에서 자재명을 가져옴

                this.byId("BomItemTable").getBinding("items").filter(oFilter);
                // this.byId("detailPage").addStyleClass("bold-title");
                // this.byId("detailPage").setTitle(sMatname + " 원자재 내역   ");
                
                // 페이지 제목 설정
                this.getView().getModel().setProperty("/pageTitle", sMatname + " 원자재 내역");

                // 제목을 동적으로 설정
                let oTitle = new Title({
                    text: sMatname + " 원자재 내역",
                    // titleStyle: "H2", // H2 스타일 적용
                    textAlign: sap.ui.core.TextAlign.Left // 제목을 왼쪽 정렬로 설정
                }).addStyleClass("bold-title");

                let oDetailPage = this.byId("detailPage");
                oDetailPage.destroyHeaderContent(); // 기존 헤더 내용을 제거
                oDetailPage.addHeaderContent(oTitle); // 새로운 제목 추가

                // 데이터 로드 후 정렬 수행
                var oBinding = this.byId("BomItemTable").getBinding("items");
                oBinding.attachEventOnce("dataReceived", function () {
                oBinding.sort(new sap.ui.model.Sorter("Matcode"));
                });
            },

            onNavBack : function(){
                this.getOwnerComponent().getRouter().navTo('RouteMain',{
                    
                });
            }
        });
    });
