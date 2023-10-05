class Pan{
    enableDragPan(){
        olHyun.interaction.enableInteraction(ol.interaction.DragPan);
    }

    disableDragPan(){
        olHyun.interaction.disabledInteraction(ol.interaction.DragPan);
    }
}