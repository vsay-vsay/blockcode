import * as Blockly from 'blockly/core';
import { useEffect, useRef } from 'react';

type ContinuousFlyoutMetricsProps = {
  workspace: Blockly.WorkspaceSvg;
  flyout: Blockly.Flyout;
};

const ContinuousFlyoutMetrics: React.FC<ContinuousFlyoutMetricsProps> = ({ workspace, flyout }) => {
  const flyoutRef = useRef(flyout);

  useEffect(() => {
    Blockly?.registry?.register(
      Blockly.registry.Type.METRICS_MANAGER,
      'continuousFlyoutMetrics',
      () => new Blockly.FlyoutMetricsManager(workspace, flyoutRef.current),
      true
    );
  }, [workspace]);

  const getScrollMetrics = (
    getWorkspaceCoordinates?: (x: number, y: number) => Blockly.utils.Coordinate,
    cachedViewMetrics?: Blockly.MetricsManager.ContainerRegion,
    cachedContentMetrics?: Blockly.MetricsManager.ContainerRegion
  ): Blockly.MetricsManager.ScrollMetrics | null => {
    const metricsManager = new Blockly.FlyoutMetricsManager(workspace, flyoutRef.current);
    const scrollMetrics = metricsManager.getScrollMetrics(
      getWorkspaceCoordinates,
      cachedViewMetrics,
      cachedContentMetrics
    );
    const contentMetrics =
      cachedContentMetrics || metricsManager.getContentMetrics(getWorkspaceCoordinates);
    const viewMetrics =
      cachedViewMetrics || metricsManager.getViewMetrics(getWorkspaceCoordinates);

    if (scrollMetrics) {
      scrollMetrics.height += flyoutRef.current.calculateBottomPadding(
        contentMetrics,
        viewMetrics
      );
    }
    return scrollMetrics;
  };

  return null;
};

export default ContinuousFlyoutMetrics;
