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
import { t, ChartMetadata, ChartPlugin } from '@superset-ui/core';
import buildQuery from './buildQuery';
import transformProps from './transformProps';
import thumbnail from './images/course_card_template.png';
import example1 from './images/course_card_template.png';
import controlPanel from './controlPanel';

export default class CardCourseNumberChartPlugin extends ChartPlugin {
  constructor() {
    const metadata = new ChartMetadata({
      category: t('业务'),
      description: t('Course card displaying course name and key metrics'),
      exampleGallery: [{ url: example1 }],
      name: t('Z Course Card'),
      tags: [t('Card'), t('Course'), t('KPI'), t('Comparison')],
      thumbnail,
    });

    super({
      buildQuery,
      loadChart: () => import('./CourseNumberViz'),
      metadata,
      transformProps,
      controlPanel
    });
  }
}
