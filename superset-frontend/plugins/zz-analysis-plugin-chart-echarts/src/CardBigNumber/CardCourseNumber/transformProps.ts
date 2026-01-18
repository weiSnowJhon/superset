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
import { ChartProps, getNumberFormatter, getMetricLabel } from '@superset-ui/core';
import { CardCourseNumberFormData, CourseNumberVizProps } from './types';

export default function transformProps(
  chartProps: ChartProps,
): CourseNumberVizProps {
  const { width, height, queriesData, formData } = chartProps;
  const { data = [] } = queriesData[0] || {};

  const {
    courseName = '体系框架课',
    courseNameFontSize = 0.08,
    metric,
    mainNumberFontSize = 0.25,
    unit = '节',
    unitFontSize = 0.08,
    metric1,
    metric1Label = '听课次数',
    metric2,
    metric2Label = '听课人数',
    metric3,
    metric3Label = '人均听课时长',
    yAxisFormat,
    metric1_format,
    metric2_format,
    metric3_format
  } = formData as CardCourseNumberFormData;

  // Get number formatter
  const numberFormatter = getNumberFormatter(yAxisFormat);
  const metric1Formatter = getNumberFormatter(metric1_format);
  const metric2Formatter = getNumberFormatter(metric2_format);
  const metric3Formatter = getNumberFormatter(metric3_format);


  // Helper function to get metric value from data
  const getMetricValue = (metricConfig: any): number | null => {
    if (!metricConfig || data.length === 0) return null;
    const metricLabel = getMetricLabel(metricConfig);
    const record = data[0];
    const value = record[metricLabel];
    return value !== null && value !== undefined ? Number(value) : null;
  };

  // Extract metric values from data
  const mainNumber = getMetricValue(metric);
  const metric1Value = getMetricValue(metric1);
  const metric2Value = getMetricValue(metric2);
  const metric3Value = getMetricValue(metric3);

  return {
    width,
    height,
    courseName,
    courseNameFontSize,
    mainNumber,
    mainNumberFontSize,
    unit,
    unitFontSize,
    metric1Value,
    metric1Label,
    metric2Value,
    metric2Label,
    metric3Value,
    metric3Label,
    numberFormatter,
    metric1Formatter,
    metric2Formatter,
    metric3Formatter
  };
}
