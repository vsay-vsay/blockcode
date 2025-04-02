import * as Blockly from 'blockly/core';
import { useEffect, useRef, useState } from 'react';

type ContinuousCategoryProps = {
  categoryDef: Blockly.utils.toolbox.CategoryJson;
  toolbox: Blockly.IToolbox;
};

const ContinuousCategory: React.FC<ContinuousCategoryProps> = ({ categoryDef, toolbox }) => {
  const rowDivRef = useRef<HTMLDivElement | null>(null);
  const htmlDivRef = useRef<HTMLDivElement | null>(null);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    Blockly?.registry?.register(
      Blockly.registry.Type.TOOLBOX_ITEM,
      Blockly.ToolboxCategory.registrationName,
      ContinuousCategory as any,
      true
    );
  }, []);

  const createLabelDom = (name: string): HTMLDivElement => {
    const label = document.createElement('div');
    label.setAttribute('id', categoryDef.id + '.label');
    label.textContent = name;
    label.classList.add(categoryDef.cssConfig?.label || '');
    return label;
  };

  const createIconDom = (): HTMLDivElement => {
    const icon = document.createElement('div');
    icon.classList.add('categoryBubble');
    icon.style.backgroundColor = categoryDef.colour || 'gray';
    return icon;
  };

  const setSelected = (selected: boolean) => {
    setIsSelected(selected);
    if (rowDivRef.current) {
      rowDivRef.current.style.backgroundColor = selected ? 'gray' : '';
      rowDivRef.current.classList.toggle(categoryDef.cssConfig?.selected || '', selected);
    }
    if (htmlDivRef.current) {
      Blockly.utils.aria.setState(htmlDivRef.current, Blockly.utils.aria.State.SELECTED, selected);
    }
  };

  return (
    <div ref={htmlDivRef} className="continuous-category">
      <div ref={rowDivRef} className={isSelected ? 'selected' : ''}>
        {createIconDom()}
        {createLabelDom(categoryDef.name || '')}
      </div>
    </div>
  );
};

export default ContinuousCategory;