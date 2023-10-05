class FileCheck{
    static fileExtensionCheck(fileName, ext){
        let fileExt = this.getFileExtension(fileName);
        return fileExt == ext ? true : false;
    }

    static getFileExtension(fileName){
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }
}

