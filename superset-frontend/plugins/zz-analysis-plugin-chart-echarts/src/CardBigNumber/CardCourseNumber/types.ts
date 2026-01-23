/**
 * Licensed toimport { QueryFormData, QueryFormMetric, DataMask } from '@superset-ui/core';

export interface CardCourseNumberFormData extends QueryFormData {

  // 是否显示悬停效果控制
  showHoverEffect?: boolean;
  
  // 回调标识
  callbackIdentifier?: string;pache Software Foundation (ASF) under one
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
import { QueryFormData, QueryFormMetric, SetDataMaskHook } from '@superset-ui/core';

export interface CardCourseNumberFormData extends QueryFormData {

  // 是否显示悬停效果控制
  showHoverEffect?: boolean;
  
  // 回调标识
  callbackIdentifier?: string;
  // 课程名称
  courseName?: string;
  courseNameFontSize?: number;
  
  // 主数字（节数）- 使用标准的 metric 字段
  metric?: QueryFormMetric;
  mainNumberFontSize?: number;
  
  // 单位
  unit?: string;
  unitFontSize?: number;
  
  // 右侧指标
  metricsFontSize?: number;
  metric1?: QueryFormMetric;
  metric1Label?: string;
  
  metric2?: QueryFormMetric;
  metric2Label?: string;
  
  metric3?: QueryFormMetric;
  metric3Label?: string;
  
  // 数字格式化
  yAxisFormat?: string;

}

export interface CourseNumberVizProps {

  width: number;
  height: number;
  
  // 是否显示悬停效果控制
  showHoverEffect?: boolean;
  callbackIdentifier?: string;
  
  // DataMask hook for cross-filtering
  setDataMask?: SetDataMaskHook;

  // 类
  className?: string;

  // 课程信息
  courseName?: string;
  courseNameFontSize: number;
  
  // 主数字
  mainNumber?: number | null;
  mainNumberFontSize: number;
  
  // 单位
  unit?: string;
  unitFontSize: number;
  
    // 右侧指标
  metricsFontSize?: number;
  // 右侧指标
  metric1Value?: number | null;
  metric1Label?: string;
  
  metric2Value?: number | null;
  metric2Label?: string;
  
  metric3Value?: number | null;
  metric3Label?: string;
  
  // 格式化器
  numberFormatter: (value: number) => string;

    // 其他指标格式化
  metric1Formatter: (value: number) => string;
  metric2Formatter: (value: number) => string;
  metric3Formatter: (value: number) => string;
}
