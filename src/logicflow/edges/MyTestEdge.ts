import { PolylineEdge, PolylineEdgeModel } from "@logicflow/core";

class MyTestEdgeModel extends PolylineEdgeModel {
  setAttributes() {
    this.offset = 20;
  }
  getEdgeStyle() {
    const style = super.getEdgeStyle();
    const { properties } = this;
    if (properties.isActived) {
      style.strokeDasharray = "4 4";
    }
    style.stroke = "orange";
    return style;
  }
  getTextStyle() {
    const style = super.getTextStyle();
    style.color = "#3451F1";
    style.fontSize = 30;
    if(style.background)
      style.background.fill = "#F2F131";
    return style;
  }
  getOutlineStyle() {
    const style = super.getOutlineStyle();
    style.stroke = "red";
    if(style.hover)
      style.hover.stroke = "red";
    return style;
  }
}

export default {
  type: "MyTestEdge",
  view: PolylineEdge,
  model: MyTestEdgeModel,
};
