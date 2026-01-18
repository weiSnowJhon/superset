# zz-analysis-plugin-chart-echarts

这是 Zz Analysis Plugin Chart Echarts 的 Superset 图表插件。

### 用法

要构建该插件，请运行以下命令：

```bash
npm ci
npm run build
```

或者，若要以开发模式运行（在修改时自动重建），请启动开发服务器：

```bash
npm run dev
```

要将此包添加到 Superset，请进入你 Superset 源码文件夹中的 `superset-frontend` 子目录（假设 `zz-analysis-plugin-chart-echarts` 插件和 `superset` 仓库位于同一根目录下），然后运行：

```bash
npm i -S ../../zz-analysis-plugin-chart-echarts
```

如果你的 Superset 插件位于 `superset-frontend` 目录中，并且遇到关于 `@superset-ui/core` 无法正确解析的 TypeScript 错误，请在你的 `tsconfig.json` 中添加以下内容：

```json
"references": [
  {
    "path": "../../packages/superset-ui-chart-controls"
  },
  {
    "path": "../../packages/superset-ui-core"
  }
]
```

你也可能希望将下面内容添加到 `tsconfig.json` 的 `include` 数组中，以便在插件中使用 Superset 的类型定义：

```json
"../../types/**/*"
```

最后，如果希望你的插件的 `tsconfig.json` 与 Superset 根项目保持一致，可以在你的 `tsconfig.json` 中添加：

```json
"extends": "../../tsconfig.json",
```

编辑完成后，修改 `superset-frontend/src/visualizations/presets/MainPreset.js` 并做如下更改：

将以下内容添加为导入插件的语句：

```js
import { ZzAnalysisPluginChartEcharts } from 'zz-analysis-plugin-chart-echarts';
```

然后在传入 `plugins` 属性的数组中添加如下项：

```js
new ZzAnalysisPluginChartEcharts().configure({ key: 'zz-analysis-plugin-chart-echarts' }),
```

之后，当你运行 Superset（例如开发服务器）时，该插件应该会出现在界面中：

```bash
npm run dev-server
```