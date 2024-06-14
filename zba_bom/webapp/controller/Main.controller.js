sap.ui.define([
    "sap/ui/core/mvc/Controller",
    'sap/ui/model/Filter',
    "sap/ui/core/Fragment",
    "sap/ui/model/FilterOperator"
],
    function (Controller, Filter, Fragment, FilterOperator) {
        "use strict";

        var sBomid = '';

        return Controller.extend("zbabom.controller.Main", {
            
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();
                this.oRouter.getRoute('RouteMain').attachPatternMatched(this.onPatternMatched, this);

                // FilterBar와 Table 객체 참조
                this.oFilterBar = this.byId("filterbar");
                this.oTable = this.byId("HeaderTable");

            },

            // 이미지 필드
            setImageUrl: function (sValue) {
                return `${_rootPath}/image/${sValue}.jpg`;
            },

            onPatternMatched: function () {
                console.log("onPatternMatched function is called.")
                this.byId("HeaderTable").removeSelections();
                sBomid = '';

                this.getView().byId("page").addStyleClass("custom-title");
            },

            onProductNameSelect: function (oEvent) {
                this.onSearch();
            },

            onFilterChange: function (oEvent) {
                this.onSearch();
            },

            onSearch: function () {
                console.log("onSearch function called.");
                // 필터링을 수행할 필터 배열 초기화
                var aFilters = [];
                
                // 필터 바에서 필터링할 값을 가져오는 예시 코드
                var oFilterBar = this.byId("filterbar");
                var oNameControl = oFilterBar.determineControlByName("Matcode");
                console.log("oNameControl:", oNameControl); // 디버깅을 위해 필터 컨트롤을 출력해봅니다.
                
                if (oNameControl) {
                    var aSelectedNames = oNameControl.getSelectedKeys();
                    console.log("aSelectedNames:", aSelectedNames); // 디버깅을 위해 선택된 값을 출력해봅니다.
                    
                    if (aSelectedNames.length > 0) {
                        // 선택된 값이 있는 경우 각 선택한 값에 대해 필터를 생성하여 필터 배열에 추가
                        aSelectedNames.forEach(function (sName) {
                            var oNameFilter = new Filter("Matcode", FilterOperator.EQ, sName);
                            aFilters.push(oNameFilter);
                        });
                    }
                }
            
                // Table 바인딩을 가져옴
                var oTable = this.byId("HeaderTable");
                var oBinding = oTable.getBinding("items");
                console.log("oBinding:", oBinding); // 디버깅을 위해 바인딩 객체를 출력해봅니다.
            
                // 필터 배열이 비어있는 경우 전체 데이터를 조회하도록 필터를 제거
                if (aFilters.length > 0) {
                    var oCombinedFilter = new Filter({
                        filters: aFilters,
                        and: false
                    });
                    console.log("Applying filters:", oCombinedFilter); // 디버깅을 위해 적용할 필터를 출력해봅니다.
                    oBinding.filter(oCombinedFilter);
                } else {
                    console.log("No filters applied, showing all data."); // 디버깅을 위해 전체 데이터 조회를 출력해봅니다.
                    oBinding.filter([]);
                }
            },
            

            onTableItemPress: function (oEvent) {
                console.log("onTableItemPress function is called.");
                let sPath = oEvent.getParameters().listItem.getBindingContextPath(),
                    oMainModel = this.getView().getModel(),
                    oSelectData = this.getView().getModel().getProperty(sPath),
                    oFilter = new Filter('Bomid', FilterOperator.EQ, oSelectData.Bomid);

                this.getView().getModel().read("/BOMItemEntitySet", {
                    filters: [oFilter],
                    success: function (oReturn) {
                        oMainModel.setProperty("/BOMItemEntitySet", oReturn.results);

                        sBomid = oReturn.results[0].Bomid;
                    }
                });

                this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                    id: oSelectData.Bomid,
                    matname: oSelectData.Matname // 자재명을 URL 파라미터로 추가
                });
                console.log("Matname:", oSelectData.Matname);
            }
        });
    });
