class MapHistoryClass{
    constructor() {
        this.history = [];
        this.historyNow = -1;
        this.click = false;
        this.delay = 1000;
    }

    initHistory(){
        olHyun.map.on('moveend', function(event){
            olHyun.mapHistory.addMapHistoryInfo();
        });

        this.addMapHistoryInfo();
    }

    addMapHistoryInfo(){
        let currentMapPosInfo = {
            center : olHyun.view.getCenter(),
            resolution: olHyun.view.getResolution()
        };

        if(this.click || JSON.stringify(currentMapPosInfo) == JSON.stringify(this.history[this.history.length - 1])){
            return;
        }

        this.history.push(currentMapPosInfo);
        this.historyNow++;
    }

    preView(){
        if (this.historyNow > 0) {
            this.click = true;
            this.historyNow--;
            /* 센터값세팅 */
            // olHyun.view.setCenter(this.history[this.historyNow].center );
            /* 레졸류션값 세팅 */
            // olHyun.view.setResolution(this.history[this.historyNow].resolution );

            let option = this.getRecentlyHistory();
            olHyun.view.viewAnimate(option);

            setTimeout(function () {
                olHyun.mapHistory.click = false;
            }, olHyun.mapHistory.delay);
        }
    }
    /* 다음 버튼 클릭시 */
    nextView(){
        if (this.historyNow < this.history.length - 1) {
            this.click = true;
            this.historyNow++;
            /* 센터값세팅 */
            // olHyun.view.setCenter(this.history[this.historyNow].center );
            /* 레졸류션값 세팅 */
            // olHyun.view.setResolution(this.history[this.historyNow].resolution );

            let option = this.getRecentlyHistory();
            olHyun.view.viewAnimate(option);

            setTimeout(function () {
                olHyun.mapHistory.click = false;
            }, olHyun.mapHistory.delay);
        }
    }

    getRecentlyHistory(){
        return {
            center : this.history[this.historyNow].center,
            resolution : this.history[this.historyNow].resolution,
            duration : 700
        };
    }
}