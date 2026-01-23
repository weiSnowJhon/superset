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
import {
  showHoverEffectControl,
  courseNameFontSize,
  mainNumberFontSize,
  unitFontSize,
  metricsFontSize,
  callbackIdentifierControl,
} from '../sharedControls';

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
        [showHoverEffectControl],
        [callbackIdentifierControl],
        [courseNameFontSize],
        [mainNumberFontSize],
        [unitFontSize],
        [metricsFontSize],
        ['y_axis_format'],
        [
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
          {
            name: 'metric3_format',
            config: {
              ...sharedControls.y_axis_format,
              label: t('Metric 3 Format'),
              description: D3_FORMAT_DOCS,
            },
          },
        ],
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
