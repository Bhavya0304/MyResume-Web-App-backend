module.exports = class MapPaths{
    constructor(url){
        this.url = url;
    }

    getInfoImage = (name)=>{
        return this.url + "/assets/images/" + name;
    }
    getEducationImage = (name)=>{
        return this.url + "/assets/images/Logo/" + name;
    }
    getExpirenceImage = (name)=>{
        return this.url + "/assets/images/Logo/" + name;
    }
    getSkillTagImages = (name)=>{
        return this.url + "/assets/images/Icons/" + name;
    }
    getSocialButtonsImages = (name)=>{
        return this.url + "/assets/images/Icons/" +name;
    }
    getTimelineImages = (name)=>{
        return this.url + "/assets/images/timelines/" + name;
    }
    getOthers = (name)=>{
        return this.url + "/assets/others/" + name;
    }

}
