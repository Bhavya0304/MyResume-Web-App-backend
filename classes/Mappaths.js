module.exports = class MapPaths{
    constructor(url){
        this.url = url;
        this.url = `https://${process.env.AWS_BUCKET_NAME}${process.env.AWS_REGION === 'eu-central-1' ? '.' : '.'}s3${process.env.AWS_REGION === 'us-east-1' ? '' : '-' + process.env.AWS_REGION}.amazonaws.com/`;
    }

    getImage = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }

    getInfoImage = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }
    getEducationImage = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }
    getExpirenceImage = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }
    getSkillTagImages = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }
    getSocialButtonsImages = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }
    getTimelineImages = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }
    getOthers = (username,name)=>{
        return this.url + process.env.MEDIA_PATH +"/"+ username +"/" + name;
    }

}
