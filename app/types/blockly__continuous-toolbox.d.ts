declare module '@blockly/continuous-toolbox' {
    import * as Blockly from 'blockly/core';
  
    export class ContinuousToolbox extends Blockly.Toolbox {
      constructor(workspace: Blockly.WorkspaceSvg);
      getCategoryByName(name: string): Blockly.ToolboxCategory | null;
      selectCategoryByName(name: string): void;
    }
  
    export class ContinuousFlyout extends Blockly.Flyout {
      constructor(workspaceOptions: Blockly.Options);
    }
  
    export class ContinuousMetrics extends Blockly.MetricsManager {
      constructor(workspace: Blockly.WorkspaceSvg);
    }
  }
  