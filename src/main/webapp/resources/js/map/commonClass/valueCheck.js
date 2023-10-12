class ValueCheckClass{
    static ValueEmptyCheck(value){
        if(typeof value == "undefined" || value == "" || value == null){
            return false;
        }else{
            return true;
        }
    }

    static ValueEmptyCheckNecessary(value, valueKeyArr){
        $.each(valueKeyArr, (index, item) => {
            let check = this.ValueEmptyCheck(value[item]);
            if(!check){
                throw new Error(`${item} 속성은 필수값 입니다.`);
            }
        });

        return true;
    }

    static ValueEmptySubstitute(value1, value2){
        if(typeof value1 == "undefined" || value1 == "" || value1 == null){
            return value2;
        }else{
            return value1;
        }
    }
}