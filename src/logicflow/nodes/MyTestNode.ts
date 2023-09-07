// UserTaskNode.js
import { RectNode, RectNodeModel } from "@logicflow/core";

class MyTestNodeModel extends RectNodeModel {
  initNodeData(data) {
    super.initNodeData(data);

    const circleOnlyAsTarget = {
      message: "正方形节点下一个节点只能是圆形节点",
      validate: (sourceNode, targetNode, sourceAnchor, targetAnchor) => {
        return targetNode.type === "circle";
      },
    };
    this.sourceRules.push(circleOnlyAsTarget);
  }
  getAnchorStyle(anchorInfo) {
    const style = super.getAnchorStyle(anchorInfo);
    style.stroke = "rgb(24, 125, 255)";
    style.r = 3;
    style.hover.r = 8;
    style.hover.fill = "rgb(24, 125, 255)";
    style.hover.stroke = "rgb(24, 125, 255)";
    return style;
  }
  getDefaultAnchor() {
    const { width, height, x, y, id } = this;
    return [
      {
        x: x - width / 2,
        y,
        type: "left",
        // edgeAddable: false, // 控制锚点是否可以从此锚点手动创建连线。默认为true。
        id: `${id}_0`,
      },
      {
        x: x + width / 2,
        y,
        type: "right",
        id: `${id}_1`,
      },
    ];
  }
  getAnchorShape(anchorData) {
    const { x, y, type } = anchorData;
    return h("rect", {
      x: x - 5,
      y: y - 5,
      width: 10,
      height: 10,
      className: `custom-anchor ${type === "left" ? "incomming-anchor" : "outgoing-anchor"
        }`
    });
  }
}

class MyTestNodeView extends RectNode { }

export default {
  type: "MyTestNode",
  view: MyTestNodeView,
  model: MyTestNodeModel,
};
