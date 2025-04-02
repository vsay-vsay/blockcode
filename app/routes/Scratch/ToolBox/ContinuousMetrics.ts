import * as Blockly from 'blockly/core';
import { useEffect, useRef } from 'react';

type ContinuousMetricsProps = {
  workspace: Blockly.WorkspaceSvg;
};

const ContinuousMetrics: React.FC<ContinuousMetricsProps> = ({ workspace }) => {
  const metricsManagerRef = useRef<Blockly.MetricsManager | null>(null);

  useEffect(() => {
    if (!metricsManagerRef.current) {
      metricsManagerRef.current = new Blockly.MetricsManager(workspace);
    }
  }, [workspace]);

  const getViewMetrics = (getWorkspaceCoordinates: boolean = false): Blockly.MetricsManager.ViewMetrics => {
    const scale = getWorkspaceCoordinates ? workspace.scale : 1;
    const svgMetrics = metricsManagerRef.current!.getSvgMetrics();
    const toolboxMetrics = metricsManagerRef.current!.getToolboxMetrics();
    const flyoutMetrics = metricsManagerRef.current!.getFlyoutMetrics(false);
    const toolboxPosition = toolboxMetrics.position;

    if (workspace.getToolbox()) {
      if (
        toolboxPosition === Blockly.TOOLBOX_AT_TOP ||
        toolboxPosition === Blockly.TOOLBOX_AT_BOTTOM
      ) {
        svgMetrics.height -= toolboxMetrics.height + flyoutMetrics.height;
      } else if (
        toolboxPosition === Blockly.TOOLBOX_AT_LEFT ||
        toolboxPosition === Blockly.TOOLBOX_AT_RIGHT
      ) {
        svgMetrics.width -= toolboxMetrics.width + flyoutMetrics.width;
      }
    }
    return {
      height: svgMetrics.height / scale,
      width: svgMetrics.width / scale,
      top: -workspace.scrollY / scale,
      left: -workspace.scrollX / scale,
    };
  };

  const getAbsoluteMetrics = (): Blockly.MetricsManager.AbsoluteMetrics => {
    const toolboxMetrics = metricsManagerRef.current!.getToolboxMetrics();
    const flyoutMetrics = metricsManagerRef.current!.getFlyoutMetrics(false);
    const toolboxPosition = toolboxMetrics.position;
    let absoluteLeft = 0;

    if (workspace.getToolbox() && toolboxPosition === Blockly.TOOLBOX_AT_LEFT) {
      absoluteLeft = toolboxMetrics.width + flyoutMetrics.width;
    }
    let absoluteTop = 0;
    if (workspace.getToolbox() && toolboxPosition === Blockly.TOOLBOX_AT_TOP) {
      absoluteTop = toolboxMetrics.height + flyoutMetrics.height;
    }
    return {
      top: absoluteTop,
      left: absoluteLeft,
    };
  };

  return null;
};

export default ContinuousMetrics;

Blockly?.registry?.register(
  Blockly.registry.Type.METRICS_MANAGER,
  'CustomMetricsManager',
  ContinuousMetrics
);