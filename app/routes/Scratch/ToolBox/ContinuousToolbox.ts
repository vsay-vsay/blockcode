import * as Blockly from 'blockly/core';
import { useEffect, useRef, useState } from 'react';

type ContinuousToolboxProps = {
  workspace: Blockly.WorkspaceSvg;
};

const ContinuousToolbox: React.FC<ContinuousToolboxProps> = ({ workspace }) => {
  const flyoutRef = useRef<Blockly.Flyout | null>(null);
  const [selectedItem, setSelectedItem] = useState<Blockly.ToolboxItem | null>(null);

  useEffect(() => {
    if (!flyoutRef.current) {
      flyoutRef.current = workspace.getFlyout() as Blockly.Flyout;
      flyoutRef.current.show(getInitialFlyoutContents());
      flyoutRef.current.recordScrollPositions();
    }

    const handleChange = (e: Blockly.Events.Abstract) => {
      if (
        e.type === Blockly.Events.BLOCK_CREATE ||
        e.type === Blockly.Events.BLOCK_DELETE
      ) {
        refreshSelection();
      }
    };

    workspace.addChangeListener(handleChange);
    return () => workspace.removeChangeListener(handleChange);
  }, [workspace]);

  const getInitialFlyoutContents = (): Blockly.utils.toolbox.FlyoutItemInfoArray => {
    let contents: Blockly.utils.toolbox.FlyoutItemInfoArray = [];
    for (const toolboxItem of workspace.getToolbox()?.getContents() || []) {
      if (toolboxItem instanceof Blockly.ToolboxCategory) {
        contents.push({ kind: 'LABEL', text: toolboxItem.getName() });
        let itemContents = toolboxItem.getContents();
        if (typeof itemContents === 'string') {
          itemContents = { custom: itemContents, kind: 'CATEGORY' } as Blockly.utils.toolbox.DynamicCategoryInfo;
        }
        contents = contents.concat(itemContents as Blockly.utils.toolbox.FlyoutItemInfoArray);
      }
    }
    return contents;
  };

  const refreshSelection = () => {
    flyoutRef.current?.show(getInitialFlyoutContents());
  };

  const selectCategoryByName = (name: string) => {
    const newItem = getCategoryByName(name);
    if (!newItem) return;

    if (shouldDeselectItem(selectedItem, newItem)) {
      deselectItem(selectedItem);
    }
    if (shouldSelectItem(selectedItem, newItem)) {
      selectItem(selectedItem, newItem);
    }
  };

  const getCategoryByName = (name: string): Blockly.ToolboxCategory | null => {
    return workspace.getToolbox()?.getContents().find(
      (item) => item instanceof Blockly.ToolboxCategory && item.isSelectable() && name === item.getName()
    ) as Blockly.ToolboxCategory | null;
  };

  const shouldDeselectItem = (oldItem: Blockly.ToolboxItem | null, newItem: Blockly.ToolboxItem | null) => {
    return oldItem !== null && oldItem !== newItem;
  };

  const shouldSelectItem = (oldItem: Blockly.ToolboxItem | null, newItem: Blockly.ToolboxItem | null) => {
    return newItem !== null && oldItem !== newItem;
  };

  const deselectItem = (item: Blockly.ToolboxItem | null) => {
    if (item) {
      setSelectedItem(null);
    }
  };

  const selectItem = (oldItem: Blockly.ToolboxItem | null, newItem: Blockly.ToolboxItem) => {
    setSelectedItem(newItem);
  };

  return null;
};

export default ContinuousToolbox;