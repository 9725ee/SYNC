sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,Filter) {
        "use strict";

        return Controller.extend("odata.project0113.controller.Main", {
            onInit: function () {
                var oData = {
                        "Productno" : "",
                        "Productname" : "",
                        "Fname" : "",
                        "Lname" : "",
                        "Memo" : ""
                
                }
                this.getView().setModel(new JSONModel(oData), 'data');

            },

            onRowSelectionChange: function(oEvent){
                if(!oEvent.getParameter('rowContext')) return;

                var sPath = oEvent.getParameter('rowContext').getPath();
                
                var oSelectData = this.getView().getModel().getProperty(sPath); 
                var oJSONModel = this.getView().getModel('data')
                

                oJSONModel.setData(oSelectData);
                
            },

            onReset: function(){
                this.getView().getModel('data').setData({
                    "Productno" : "",
                    "Productname" : "",
                    "Fname" : "",
                    "Lname" : "",
                    "Memo" : ""
            
            });  

                this.byId("tableid").clearSelection();
                this.getView().getModel().refresh(true);
            
            },

            onEntitySet: function(){
                
                // 전체 조회 구현
                // GET 요청 : "/Products"
                var oDataModel = this.getView().getModel(); 
                var oFilter = new Filter("Productname","EQ", "안녕"); //필터객체 생성


                oDataModel.read("/Products", {
                    filters : [oFilter],
                    success:function(oReturn){
                        console.log("전체조회", oReturn);
                        this.byId("idDialog").setModel(new JSONModel(oReturn),'popup');
                        this.byId("idDialog").open();
                    }.bind(this),
                    error: function(oError){
                        console.log("전체조회 중 오류 발생", oError);
                    }  
                }); 
               
            },

            onClose:function(oEvent) {
                oEvent.getSource().getParent().close()  
            },

            onEntity:function(){
                // 데이터 한 건 조회
                // GET 요청 : "/Products(ProductNo='1')"

                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products", {
                    Productno : '1000'  //키값에 대한 내용 
                }); // => sPath값 => "/Products('1000')"
                    // Product가  '1000'번에 해당하는 데이터 한 건을 조회함

                oDataModel.read(sPath, {
                    success:function(oReturn){
                        console.log("한 건 조회:" , oReturn)

                    }
                })
            },

            onCreate : function(){
                // 데이터 생성 구현
                // POST 요청 : "/Products"+Body

                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                
                // 아래 코드 중 A \\ "" 의 뜻 ?
                // => A 값이 없으면 (false), 공백을 넣어라 
                var oBody = {
                    "Productno" : oJSONData.Productno,
                    "Productname" : oJSONData.Productname || "",
                    "Fname" : oJSONData.Fname || "",
                    "Lname" : oJSONData.Lname || "",
                    "Memo" : oJSONData.Memo || ""
                };

                oDataModel.create("/Products", oBody, {
                    success:function(){
                        sap.m.MessageToast.show("데이터 생성 완료");
                        
                    },
                    error:function(oError){
                        sap.m.MessageToast.show("에러발생");
                    }
                });
                
                
            },

            onUpdate:function(){
                // 데이터 변경 요청
                // PUT 요청 : "/Products('1000')" + Body

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products",{
                    Productno : oBody.Productno                    
                }); // "/Products('키값')과 동일 "

                oDataModel.update(sPath, oBody, {
                    success:function(){
                        sap.m.MessageToast.show("데이터 변경 완료");
                    }
                });
                    

            },

            onDelete:function(){
                // 데이터 삭제 요청
                // DELETE 요청 :"/Products('1000')"

                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Products",{
                    Productno : oBody.Productno                    
                }); // "/Products('키값')과 동일 "

                oDataModel.remove(sPath,{
                    success: function() {
                        sap.m.MessageToast.show('삭제되었습니다.');
                    }
                });
            }

        });
    });
