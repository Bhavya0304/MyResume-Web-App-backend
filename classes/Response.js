module.exports = class Response{
    constructor(DataObj){
        if(DataObj.Error != "" && DataObj.Error != undefined && DataObj.Error != null){
            this.Status = DataObj.Status;
            this.Error = DataObj.Error;
        }
        else{
            this.Status = DataObj.Status;
            this.Data = DataObj.Data;
        }
    }

    getResponse = ()=>{
        return this.Error != undefined ? {
            Status:this.Status,
            Error:this.Error
        }:{
            Status:this.Status,
            Data:this.Data
        };
    }

}