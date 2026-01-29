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

/**
 * Chart click event data structure
 * Lightweight event for chart interactions without triggering dashboard refresh
 */
export interface ChartClickEventData {
  chartId: number;
  value: any;
  metricName?: string;
  timestamp: number;
  chartType?: string;
  [key: string]: any;
}

/**
 * Chart event types
 */
export enum ChartEventType {
  Click = 'CHART_CLICK',
  Hover = 'CHART_HOVER',
  Select = 'CHART_SELECT',
}

/**
 * Chart event message structure for postMessage
 */
export interface ChartEventMessage {
  type: `SUPERSET_${ChartEventType}`;
  payload: ChartClickEventData;
}
