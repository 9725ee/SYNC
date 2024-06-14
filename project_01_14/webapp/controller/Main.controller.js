sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageBox",
    "sap/ui/core/Fragment",
    "sap/ui/model/Filter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,JSONModel,MessageBox,Fragment,Filter) {
        "use strict";

        return Controller.extend("project0114.controller.Main", {
            onInit: function () {
                var oData = {
                    Memid : "",
                    Memnm : "",
                    Telno : "",
                    Email : ""
                }
                this.getView().setModel(new JSONModel(oData), 'data');

            },

            onRowSelectionChange: function(oEvent){
                // Row 선택 해제 되었을 때도, '선택'된 것이기 때문에 이벤트 발생
                // 따라서 rowContext가 없을 땐 함수 종료하도록 함
                if(!oEvent.getParameter('rowContext')) return; //함수 종료 
                
                var sPath = oEvent.getParameter('rowContext').getPath();
                var oSelectData = this.getView().getModel().getProperty(sPath); 
                var oJSONModel = this.getView().getModel('data')
                

                oJSONModel.setData(oSelectData);
                
            },

            onReset: function(){
                this.getView().getModel('data').setData({
                    Memid : "",
                    Memnm : "",
                    Telno : "",
                    Email : ""
                });  

                this.byId("tableid").clearSelection();
                this.getView().getModel().refresh(true);
            
            },


            onEntitySet: function(oEvent){
                var oDataModel = this.getView().getModel(); 

                var oButton = oEvent.getSource(),
				    oView = this.getView();

                // create popover
                if (!this._pPopover) {
                    this._pPopover = Fragment.load({   //view id를 같이 넘겨 줬기때문에 this.byId() 가능
                        id: oView.getId(),  // 뷰 세팅
                        name: "project0114.view.fragment.Popover",
                        controller: this
                    }).then(function(oPopover) {
                        oPopover.setModel(new JSONModel(),'popover');
                        oView.addDependent(oPopover);
                        return oPopover;
				    });
                 }
                 this._pPopover.then(function(oPopover) {
                    oPopover.openBy(oButton);
                });


                // oDataModel.read("/Member", {
                //     success:function(oReturn){
                //         console.log("전체조회", oReturn);
                //         MessageBox.success("전체 조회 성 공 ! ");
                //     },
                //     error: function(oError){
                //         console.log("전체조회 중 오류 발생", oError);
                //         MessageBox.error("전체 조회 중 오류 발생 ~~~~");
                //     }  
                // }) 
            },

            onRead: function(){
                // var oPopover = sap.ui.getCore().byId("myPopover");
                // view id 를 같이 넘겨줬기 때문에 view 안에 popover가 붙게됨.
                // 따라서 this.byId로 접근 가능
                var oPopover = this.byId("myPopover");  // 팝오버객체가져요고
                var oPopoverModel = oPopover.getModel('popover'); //제이슨모델가져오고

                var oData = oPopoverModel.getData(); //데이터가져옴
                var oFilter = new Filter("Memnm", "EQ", oData.Membername);

                this.getView().getModel().read("/Member",{
                    urlParameters:{
                        "&expand" : "WorkSet",
                        "$select" : "Memid,WorkSet" //내가 조회할 필드를 특정해서 선택
                    },
                    filters : [oFilter],
                    success:function(oReturn){
                        console.log(`검색어(${oData.Membername}):`,oReturn.results);
                    }
                    
                });
      
                // console.log(oPopoverModel.getData());

            },

            onEntity:function(){

                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                var sPath = oDataModel.createKey("/Member",{
                    Memid : oJSONData.Memid
                });

                oDataModel.read(sPath,{
                    success:function(oReturn){
                        console.log('한 건 조회 : ', oReturn)
                    }
                });
            },

            onCreate : function(){
            
                var oDataModel = this.getView().getModel();
                var oJSONData = this.getView().getModel('data').getData();
                
                var oBody = { 
                    Memid : oJSONData.Memid,
                    Memnm : oJSONData.Memnm || "",
                    Telno : oJSONData.Telno || "",
                    Email : oJSONData.Email || "",
                    // WorkSet : [
                        
                    // ]
                }
                    
                
                oDataModel.create("/Member", oBody, {
                    success:function(){
                        // sap.m.MessageToast.show("데이터 생성 완료")
                        // MessageBox.success("데이터 생성 성공 !! ");


                        // 서버요청이 끝난 후 작업은 해당 함수 안에서 구현 
                        // 해당 함수 안에서는 this가 달라지기 때문에,
                        // 이전에 사용하던 this를 그대로 넘겨주기 위해서
                        // .bind(this)를 적용시킴
                      
                        this._showMessage("S","데이터생성완료");
                    }.bind(this),
                    error : function(oError){
                        this._showMessage("E","에러 발생")
                        // MessageBox.error("E","에러 발생 !!");
                    }.bind(this)
                });
              

            },
            
            _showMessage:function(gubun,msg){
                switch(gubun){
                    case 'S' : 
                        sap.m.MessageBox.success(msg)
                        break;
                    case 'E' :
                        sap.m.MessageBox.error(msg);
                        break;
                }
            },
            

            onUpdate : function(){
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Member",{
                    Memid : oBody.Memid});

                oDataModel.update(sPath, oBody, {
                    success:function(){
                        sap.m.MessageToast.show("데이터 변경 완료")
                    }
                });
          
            },

            onDelete : function(){
                var oBody = this.getView().getModel('data').getData();
                var oDataModel = this.getView().getModel();
                var sPath = oDataModel.createKey("/Member",{
                    Memid : oBody.Memid
                });

                oDataModel.remove(sPath,{
                    success: function() {
                        sap.m.MessageToast.show('삭제되었습니다.');
                    }
                });
            }


        });
    });
