module.exports = class MapPaths{
    constructor(url){
        this.url = url;
    }

    getInfoImage = (username,name)=>{
        return this.url + "/assets/" + username +"/images/" + name;
    }
    getEducationImage = (username,name)=>{
        return this.url + "/assets/"+username+"/images/Logo/" + name;
    }
    getExpirenceImage = (username,name)=>{
        return this.url + "/assets/"+username+"/images/Logo/" + name;
    }
    getSkillTagImages = (username,name)=>{
        return this.url + "/assets/"+username+"/images/Icons/" + name;
    }
    getSocialButtonsImages = (username,name)=>{
        return this.url + "/assets/"+username+"/images/Icons/" +name;
    }
    getTimelineImages = (username,name)=>{
        return this.url + "/assets/"+username+"/images/timelines/" + name;
    }
    getOthers = (username,name)=>{
        return this.url + "/assets/"+username+"/Others/" + name;
    }

}
