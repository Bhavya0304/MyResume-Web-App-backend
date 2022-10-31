module.exports = class MapPaths{
    constructor(url){
        this.url = url;
    }

    getImage = (username,name)=>{
        return this.url + "/assets/" + username +"/images/" + name;
    }

    getInfoImage = (username,name)=>{
        return this.url + "/assets/" + username +"/images/" + name;
    }
    getEducationImage = (username,name)=>{
        return this.url + "/assets/"+username+"/images/" + name;
    }
    getExpirenceImage = (username,name)=>{
        return this.url + "/assets/"+username+"/images/" + name;
    }
    getSkillTagImages = (username,name)=>{
        return this.url + "/assets/"+username+"/images/" + name;
    }
    getSocialButtonsImages = (username,name)=>{
        return this.url + "/assets/"+username+"/images/" +name;
    }
    getTimelineImages = (username,name)=>{
        return this.url + "/assets/"+username+"/images/" + name;
    }
    getOthers = (username,name)=>{
        return this.url + "/assets/"+username+"/Others/" + name;
    }

}
