class DaumMap {
    constructor() {
        this.daumTileGrid = olHyun.tilegrid.createTileGrid({
            extent : [(-30000-524288), (-60000-524288), (494288+524288), (988576+524288)],
            tileSize : 256,
            resolutions : [4096, 2048, 1024, 512, 256, 128, 64, 32, 16, 8, 4, 2, 1, 0.5, 0.25],
            minZoom : 1
        });
    }

    getDaumLayer(){
        let layer = olHyun.layer.createOlLayer({
            source : this.getDaumSource("base"),
            id: 'BaseLayer'
        }, "Tile");
        return layer;
    }

    getDaumSource(type){
        return olHyun.source.createXYZSource({
            projection : 'EPSG:5181',
            tileGrid: this.daumTileGrid,
            tileUrlFunction: this.getDaumTileUrlFunction(type),
            tilePixelRatio: 1,              // 타일사이즈 512일때 해상도 비율
        });
    }

    changeDaumMap(layerNm, map){
        let source = this.getDaumSource(layerNm);
        let layer = olHyun.layer.searchLayerById("BaseLayer", map);
        layer.setSource(source);
    }

    getDaumTileUrlFunction(type) {
        let tileUrlFunction = function(tileCoord) {
            let res = this.getTileGrid().getResolutions();
            let sVal = res[tileCoord[0]];
            let yLength = 988576 - (-60000) + 524288 + 524288;
            let yTile = yLength / (sVal * this.getTileGrid().getTileSize());
            let tileGap = Math.pow(2, (tileCoord[0] -1));
            yTile = yTile - tileGap;
            let xTile = tileCoord[1] - tileGap;
            if (type == 'base') {
                return 'http://map' + Math.floor( (Math.random() * (4 - 1 + 1)) + 1 ) + '.daumcdn.net/map_2d_hd/2111ydg/L' + (15 - tileCoord[0]) + '/' + (yTile + tileCoord[2]) + '/' + xTile + '.png';
            } else if (type == 'satellite') {
                return 'https://map' + Math.floor( (Math.random() * (4 - 1 + 1)) + 1 ) + '.daumcdn.net/map_skyview_hd/L' + (15 - tileCoord[0]) + '/' + (yTile + tileCoord[2]) + '/' + xTile + '.jpg';
            } else if (type == 'hybrid') {
                return 'http://map' + Math.floor( (Math.random() * (4 - 1 + 1)) + 1 ) + '.daumcdn.net/map_hybrid_hd/2111ydg/L' + (15 - tileCoord[0]) + '/' + (yTile + tileCoord[2]) + '/' + xTile + '.png';
            }
        };
        return tileUrlFunction;
    }
}