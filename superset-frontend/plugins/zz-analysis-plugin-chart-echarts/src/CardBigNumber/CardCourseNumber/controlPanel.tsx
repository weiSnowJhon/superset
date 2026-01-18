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
import { t } from '@superset-ui/core';
import {
  ControlPanelConfig,
  D3_FORMAT_DOCS,
  sharedControls,
} from '@superset-ui/chart-controls';

const config: ControlPanelConfig = {
  controlPanelSections: [
    {
      label: t('Query'),
      expanded: true,
      controlSetRows: [
        ['metric'],
        [
          {
            name: 'metric1',
            config: {
              ...sharedControls.metric,
              label: t('Metric 1'),
              description: t('First metric on the right (e.g., total views)'),
            },
          },
        ],
        [
          {
            name: 'metric2',
            config: {
              ...sharedControls.metric,
              label: t('Metric 2'),
              description: t('Second metric on the right (e.g., unique viewers)'),
            },
          },
        ],
        [
          {
            name: 'metric3',
            config: {
              ...sharedControls.metric,
              label: t('Metric 3'),
              description: t('Third metric on the right (e.g., average duration)'),
            },
          },
        ],
        ['adhoc_filters'],
      ],
    },
    {
      label: t('Options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'courseName',
            config: {
              type: 'TextControl',
              label: t('Course Name'),
              description: t('Custom course name to display in the top left'),
              default: '体系框架课',
            },
          },
        ],
        [
          {
            name: 'unit',
            config: {
              type: 'TextControl',
              label: t('Unit'),
              description: t('Unit text to display after the main number'),
              default: '节',
            },
          },
        ],
        [
          {
            name: 'metric1Label',
            config: {
              type: 'TextControl',
              label: t('Metric 1 Label'),
              description: t('Label for the first metric'),
              default: '听课次数',
            },
          },
        ],
        [
          {
            name: 'metric2Label',
            config: {
              type: 'TextControl',
              label: t('Metric 2 Label'),
              description: t('Label for the second metric'),
              default: '听课人数',
            },
          },
        ],
        [
          {
            name: 'metric3Label',
            config: {
              type: 'TextControl',
              label: t('Metric 3 Label'),
              description: t('Label for the third metric'),
              default: '人均听课时长',
            },
          },
        ],
      ],
    },
    {
      label: t('Chart Options'),
      expanded: true,
      controlSetRows: [
        [
          {
            name: 'courseNameFontSize',
            config: {
              type: 'SelectControl',
              label: t('Course Name Font Size'),
              renderTrigger: true,
              clearable: false,
              default: 0.08,
              options: [
                { label: t('Tiny'), value: 0.05 },
                { label: t('Small'), value: 0.08 },
                { label: t('Normal'), value: 0.1 },
                { label: t('Large'), value: 0.125 },
                { label: t('Huge'), value: 0.15 },
              ],
            },
          },
        ],
        [
          {
            name: 'mainNumberFontSize',
            config: {
              type: 'SelectControl',
              label: t('Main Number Font Size'),
              renderTrigger: true,
              clearable: false,
              default: 0.25,
              options: [
                { label: t('Small'), value: 0.15 },
                { label: t('Normal'), value: 0.2 },
                { label: t('Large'), value: 0.25 },
                { label: t('Huge'), value: 0.3 },
              ],
            },
          },
        ],
        [
          {
            name: 'unitFontSize',
            config: {
              type: 'SelectControl',
              label: t('Unit Font Size'),
              renderTrigger: true,
              clearable: false,
              default: 0.08,
              options: [
                { label: t('Tiny'), value: 0.05 },
                { label: t('Small'), value: 0.08 },
                { label: t('Normal'), value: 0.1 },
                { label: t('Large'), value: 0.125 },
              ],
            },
          },
        ],
        ['y_axis_format'],
        [
        // 新增：Metric 1 独立的格式化器
          {
            name: 'metric1_format',
            config: {
              ...sharedControls.y_axis_format,
              label: t('Metric 1 Format'),
              description: D3_FORMAT_DOCS,
            },
          },
        ],
        [
           // 新增：Metric 2 独立的格式化器
          {
            name: 'metric2_format',
            config: {
              ...sharedControls.y_axis_format,
              label: t('Metric 2 Format'),
              description: D3_FORMAT_DOCS,
            },
          },
        ],
        [
          // 新增：Metric 3 独立的格式化器
          {
            name: 'metric3_format',
            config: {
              ...sharedControls.y_axis_format,
              label: t('Metric 3 Format'),
              description: D3_FORMAT_DOCS,
            },
          },
        ]
      ],
    },
  ],
  controlOverrides: {
    metric: {
      label: t('Main Metric'),
      description: t('The main metric to display (e.g., total lessons)'),
    },
    y_axis_format: {
      label: t('Number format'),
      description: D3_FORMAT_DOCS,
    },
  },
};

export default config;
