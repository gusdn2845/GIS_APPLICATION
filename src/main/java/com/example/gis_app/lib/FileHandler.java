package com.example.gis_app.lib;

import java.io.File;
import java.io.FileWriter;

/*파일 관련 클래스*/
public class FileHandler {
    private FileHandler(){}

    /* 파일 객체 생성 - File */
    public static File of(String path, String filename){
        return new File(path + File.separator + filename);
    }

    /* 파일 객체 생성 - Folder */
    public static File of(String path){
        return new File(path);
    }

    /* 파일 존재 여부 확인 (존재 : true, 미존재 : false)
     *  Parameter - 경로, 파일명
     */
    public static boolean exist(String path, String filename){
        return FileHandler.of(path, filename).exists();
    }

    /* 파일 존재 여부 확인 (존재 : true, 미존재 : false)
     *  Parameter - 경로
     */
    public static boolean exist(String path){
        return FileHandler.of(path).exists();
    }

    /* 파일 존재 여부 확인 (존재 : true, 미존재 : false)
     *  Parameter - 파일
     */
    public static boolean exist(File file){
        return file.exists();
    }

    /* 디렉토리 생성 */
    public static boolean createFolder(File file, boolean overwrite){
        boolean check = false;

        if(overwrite || !FileHandler.exist(file)){
            file.mkdirs();
        }

        return check;
    }

    /* 텍스트파일 생성 */
    public static boolean createTextFile(String path, String filename, String context, boolean overwrite) throws Exception{
        boolean check = false;
        File file = FileHandler.of(path + File.separator + filename);

        if(overwrite || !FileHandler.exist(file)){
            FileWriter writer =  new FileWriter(file, true);
            writer.write(context);
            writer.flush();
            writer.close();
            check = true;
        }

        return check;
    }
}