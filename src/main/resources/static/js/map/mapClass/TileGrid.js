class TileGrid{
    createTileGrid(option, type){
        let tileGrid;
        switch (type){
            case "WMTS":
                tileGrid = new ol.tilegrid.WMTS(option);
                break;
            default:
                tileGrid = new ol.tilegrid.TileGrid(option);
                break;
        }
        return tileGrid;
    }
}