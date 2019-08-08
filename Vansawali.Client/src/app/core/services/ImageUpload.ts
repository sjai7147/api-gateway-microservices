
export class ImageUpload {
    public imagePath;
    imgURL: any;
    public message: string;
   
   get getBase64(){      
    return this.imgURL;
    }
    preview(files) {
        return new Promise((resolve,reject)=>{
            if (files.length === 0){
                reject({'error':'Select file for upload'});
                return;
            }
           
       
          var mimeType = files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            reject({'error':this.message});
            return;
          }
       
          var reader = new FileReader();
          this.imagePath = files;
          reader.readAsDataURL(files[0]); 
          reader.onload = (_event) => { 
            this.imgURL = reader.result; 
            resolve(reader.result);
          }
        });
     
      
    }
  }