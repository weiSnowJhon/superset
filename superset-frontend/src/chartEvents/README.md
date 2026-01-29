# Chart Events System

轻量级图表事件系统，用于图表交互通知，**不触发 Redux 更新和图表刷新**。

## 📁 文件结构

```
superset-frontend/src/chartEvents/
├── index.ts       # 模块入口
├── types.ts       # 类型定义
└── emitter.ts     # 事件发射器
```

## 🎯 设计目标

- ✅ **零侵入** - 不修改现有 Dashboard/Chart 架构
- ✅ **无刷新** - 不触发 Redux 状态更新
- ✅ **轻量级** - 仅通过 postMessage 和 DOM 事件通信
- ✅ **类型安全** - 完整的 TypeScript 支持

## 📖 使用方法

### 1. 在图表组件中发送事件

```typescript
import { emitChartClickEvent } from 'src/chartEvents';

function MyChartComponent({ sliceId, callbackIdentifier }) {
  const handleClick = () => {
    emitChartClickEvent({
      chartId: sliceId,
      value: callbackIdentifier,
      metricName: 'Revenue',
      timestamp: Date.now(),
      chartType: 'big_number',
      customField: 'any-data',
    });
  };

  return <div onClick={handleClick}>Click me</div>;
}
```

### 2. 在宿主页面监听事件

#### 方法 A: postMessage（推荐，适用于 iframe 嵌入）

```javascript
window.addEventListener('message', (event) => {
  if (event.data.type === 'SUPERSET_CHART_CLICK') {
    console.log('Chart clicked:', event.data.payload);
    // event.data.payload 结构:
    // {
    //   chartId: 123,
    //   value: "course_001",
    //   metricName: "Revenue",
    //   timestamp: 1704067200000,
    //   chartType: "big_number"
    // }
  }
});
```

#### 方法 B: DOM 事件（适用于同源页面）

```javascript
window.addEventListener('superset-chart-click', (event) => {
  console.log('Chart clicked:', event.detail);
});
```

### 3. 使用 createChartClickHandler (可选)

```typescript
import { createChartClickHandler } from 'src/chartEvents';

function MyChart() {
  const handleClick = createChartClickHandler();
  
  return (
    <div onClick={() => handleClick({ chartId: 1, value: 'test', timestamp: Date.now() })}>
      Click
    </div>
  );
}
```

## 🔧 API 参考

### `emitChartClickEvent(data)`

发送图表点击事件。

**参数：**
```typescript
interface ChartClickEventData {
  chartId: number;        // 必需：图表 ID
  value: any;             // 必需：点击的值
  metricName?: string;    // 可选：指标名称
  timestamp: number;      // 必需：时间戳
  chartType?: string;     // 可选：图表类型
  [key: string]: any;     // 可选：自定义字段
}
```

**示例：**
```typescript
emitChartClickEvent({
  chartId: 123,
  value: 'course_001',
  metricName: 'Sales',
  timestamp: Date.now(),
  chartType: 'bar',
  customData: { region: 'US' },
});
```

### `createChartClickHandler()`

创建一个可复用的点击处理器。

**返回：** `(data: ChartClickEventData) => void`

## 🆚 与 setDataMask 的对比

| 特性 | chartEvents | setDataMask |
|------|------------|-------------|
| 触发刷新 | ❌ 否 | ✅ 是 |
| Redux 更新 | ❌ 否 | ✅ 是 |
| 自定义格式 | ✅ 是 | ❌ 否（固定格式） |
| 跨图表过滤 | ❌ 否 | ✅ 是 |
| 使用场景 | 轻量级通知、埋点 | 仪表盘联动过滤 |

## 📊 完整示例

### BigNumberViz 集成

```typescript
// BigNumberViz.tsx
import { emitChartClickEvent } from 'src/chartEvents';

function BigNumberVis({ sliceId, callbackIdentifier, showHoverEffect }) {
  const handleCardClick = () => {
    if (callbackIdentifier && showHoverEffect) {
      emitChartClickEvent({
        chartId: sliceId || 0,
        value: callbackIdentifier,
        timestamp: Date.now(),
        chartType: 'big_number',
      });
    }
  };

  return <div onClick={handleCardClick}>...</div>;
}
```

### React 宿主应用集成

```jsx
import { useEffect } from 'react';

function DashboardHost() {
  useEffect(() => {
    const handleChartClick = (event) => {
      if (event.data.type === 'SUPERSET_CHART_CLICK') {
        const { chartId, value } = event.data.payload;
        
        // 业务逻辑
        console.log(`Chart ${chartId} clicked with value ${value}`);
        
        // 例如：打开详情页
        window.location.href = `/details/${value}`;
      }
    };

    window.addEventListener('message', handleChartClick);
    return () => window.removeEventListener('message', handleChartClick);
  }, []);

  return (
    <iframe
      src="http://localhost:8088/superset/dashboard/1/"
      width="100%"
      height="800px"
    />
  );
}
```

## 🐛 调试

所有事件都会在控制台打印日志：

```
[ChartEvents] Click event: { chartId: 123, value: "...", ... }
[ChartEvents] Posted to parent window
[ChartEvents] Dispatched DOM event
```

## 🔄 扩展到其他图表类型

在任意图表组件中导入并调用：

```typescript
import { emitChartClickEvent } from 'src/chartEvents';

// 在点击、hover 或其他交互时调用
emitChartClickEvent({
  chartId: props.sliceId,
  value: dataPoint.value,
  timestamp: Date.now(),
  chartType: 'line',
  seriesName: dataPoint.series,
});
```

## ⚠️ 注意事项

1. **iframe 安全**：postMessage 使用 `targetOrigin: '*'`，生产环境建议指定具体域名
2. **事件频率**：高频事件（如 mousemove）建议使用节流
3. **浏览器兼容**：CustomEvent 需 IE 11+ 或现代浏览器

## 📚 参考

- [Window.postMessage() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage)
- [CustomEvent - MDN](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)
