/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { ChartClickEventData, ChartEventType, ChartEventMessage } from './types';

/**
 * Emit a chart click event
 * This function sends the event via postMessage and DOM events without triggering Redux updates
 */
export function emitChartClickEvent(data: ChartClickEventData): void {
  // eslint-disable-next-line no-console
  console.log('[ChartEvents] Click event:', data);

  // Send to parent window (for embedded dashboards)
  if (window.parent !== window) {
    const message: ChartEventMessage = {
      type: `SUPERSET_${ChartEventType.Click}`,
      payload: data,
    };
    window.parent.postMessage(message, '*');
    // eslint-disable-next-line no-console
    console.log('[ChartEvents] Posted to parent window');
  }

  // Emit custom DOM event for local listeners
  const customEvent = new CustomEvent('superset-chart-click', {
    detail: data,
  });
  window.dispatchEvent(customEvent);
  // eslint-disable-next-line no-console
  console.log('[ChartEvents] Dispatched DOM event');
}

/**
 * Create a chart click handler
 * Returns a callback function that can be passed to chart components
 */
export function createChartClickHandler() {
  return (data: ChartClickEventData) => {
    emitChartClickEvent(data);
  };
}
