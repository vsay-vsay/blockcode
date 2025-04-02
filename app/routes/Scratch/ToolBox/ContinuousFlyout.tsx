import * as Blockly from 'blockly/core';
import { useEffect, useRef, useState } from 'react';
import ContinuousFlyoutMetrics from './ContinuousMetricsFlyout';


type ContinuousFlyoutProps = {
  workspaceOptions: Blockly.Options;
};

const ContinuousFlyout: React.FC<ContinuousFlyoutProps> = ({ workspaceOptions }) => {
  const workspaceRef = useRef<Blockly.WorkspaceSvg | null>(null);
  const scrollPositionsRef = useRef<{ name: string; position: Blockly.utils.Coordinate }[]>([]);
  const scrollTargetRef = useRef<number | null>(null);
  const [recyclingEnabled, setRecyclingEnabled] = useState(true);
  const labelGapsRef = useRef<number[]>([]);
  const scrollAnimationFraction = 0.3;

  useEffect(() => {
    if (!workspaceRef.current) {
      const workspace = new Blockly.WorkspaceSvg(workspaceOptions);
      workspace.setMetricsManager(new ContinuousFlyoutMetrics(workspace, {} as Blockly.Flyout));
      workspace.addChangeListener(handleViewportChange);
      workspaceRef.current = workspace;
    }
    return () => {
      workspaceRef.current?.removeChangeListener(handleViewportChange);
    };
  }, [workspaceOptions]);

  const handleViewportChange = (e: Blockly.Events.Abstract) => {
    if (e.type === Blockly.Events.VIEWPORT_CHANGE) {
      selectCategoryByScrollPosition(-workspaceRef.current!.scrollY);
    }
  };

  const recordScrollPositions = () => {
    if (!workspaceRef.current) return;
    scrollPositionsRef.current = [];
    const toolbox = workspaceRef.current.getToolbox();
    if (!toolbox) return;

    const categoryLabels = toolbox.getContents().filter(
      (item) => item instanceof Blockly.ToolboxCategory
    );

    categoryLabels.forEach((category, index) => {
      if (category instanceof Blockly.ToolboxCategory) {
        const position = new Blockly.utils.Coordinate(0, index * 40);
        scrollPositionsRef.current.push({
          name: category.getName(),
          position: position,
        });
      }
    });
  };

  const getCategoryScrollPosition = (name: string): Blockly.utils.Coordinate | null => {
    return scrollPositionsRef.current.find((info) => info.name === name)?.position || null;
  };

  const selectCategoryByScrollPosition = (position: number) => {
    if (scrollTargetRef.current !== null) return;
    const scaledPosition = Math.round(position / (workspaceRef.current?.scale || 1));
    for (let i = scrollPositionsRef.current.length - 1; i >= 0; i--) {
      const category = scrollPositionsRef.current[i];
      if (scaledPosition >= category.position.y) {
        workspaceRef.current?.getToolbox()?.selectCategoryByName(category.name);
        return;
      }
    }
  };

  const scrollTo = (position: number) => {
    if (!workspaceRef.current) return;
    const metrics = workspaceRef.current.getMetrics();
    scrollTargetRef.current = Math.min(
      position * workspaceRef.current.scale,
      metrics.scrollHeight - metrics.viewHeight
    );
    stepScrollAnimation();
  };

  const stepScrollAnimation = () => {
    if (!workspaceRef.current || scrollTargetRef.current === null) return;
    const currentScrollPos = -workspaceRef.current.scrollY;
    const diff = scrollTargetRef.current - currentScrollPos;
    if (Math.abs(diff) < 1) {
      workspaceRef.current.scrollbar.setY(scrollTargetRef.current);
      scrollTargetRef.current = null;
      return;
    }
    workspaceRef.current.scrollbar.setY(
      currentScrollPos + diff * scrollAnimationFraction
    );
    requestAnimationFrame(stepScrollAnimation);
  };

  return null;
};

export default ContinuousFlyout;