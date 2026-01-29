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
import { styled, useTheme } from '@superset-ui/core';
import { CourseNumberVizProps } from './types';
import { emitChartClickEvent, type ChartClickEventData } from 'src/chartEvents';

function CourseNumberVis({
  width,
  height,
  showHoverEffect = false,
  callbackIdentifier = '',
  setDataMask,
  courseName = '体系框架课',
  courseNameFontSize,
  mainNumber,
  mainNumberFontSize,
  unit = '节',
  unitFontSize,
  metricsFontSize = 0.12,
  metric1Value,
  metric1Label = '听课次数',
  metric2Value,
  metric2Label = '听课人数',
  metric3Value,
  metric3Label = '人均听课时长',
  numberFormatter,
  metric1Formatter,
  metric2Formatter,
  metric3Formatter,
  className,
}: CourseNumberVizProps) {
  const theme = useTheme();
  
  // Calculate font sizes
  const courseNameSize = Math.floor(height * courseNameFontSize);
  const mainNumberSize = Math.floor(height * mainNumberFontSize);
  const unitSize = Math.floor(height * unitFontSize);
  const metricLabelSize = Math.floor(height * metricsFontSize);
  const metricValueSize = Math.floor(height * metricsFontSize);

  const handleCardClick = () => {
    const labelName = callbackIdentifier || courseName;
    
    // Use lightweight chart event system (no Redux, no refresh)
    if (labelName && showHoverEffect) {
      const clickData: ChartClickEventData = {
        chartId: 0,
        value: callbackIdentifier,
        courseName,
        timestamp: Date.now(),
        chartType: 'z_course_card',
        labelName,
      };
      
      emitChartClickEvent(clickData);
      return;
    }
  };

  return (
    <div
      className={className}
      onClick={handleCardClick}
      style={{
        width: `calc(${width}px - 2px)`,
        height: `calc(${height}px - 2px)`,
        display: 'flex',
        boxSizing: 'border-box',
        margin: '1px',
      }}
    >
      {/* Left side - Course name and main number */}
        <div
          className="left-section"
          style={{
            flex: '0 0 30%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start', 
            alignItems: 'center',
            paddingRight: '16px',
            borderRight: '1px solid #e8e8e8',
            gap: '2px',
          }}
        >
          {/* Course name */}
          {courseName && (
            <div
              className="course-name"
              style={{
                fontSize: `${courseNameSize}px`,
                color: '#999',
                lineHeight: 1.2,
                textAlign: 'center',
                width: '100%', // 确保文字居中相对于父容器
              }}
            >
              {courseName}
            </div>
          )}

          {/* Main number and unit */}
          <div
            className="main-number-section"
            style={{
                // 2. 核心设置：占据所有剩余高度
                flex: 1, 
                width: '100%',
                // 3. 外层垂直居中
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span
                className="main-number"
                style={{
                  fontSize: `${mainNumberSize}px`,
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                {mainNumber !== null && mainNumber !== undefined 
                  ? Math.floor(mainNumber) 
                  : '-'}
              </span>
              <span
                className="unit"
                style={{
                  fontSize: `${unitSize}px`,
                  color: '#666',
                  lineHeight: 1,
                }}
              >
                {unit}
              </span>
            </div>
          </div>
        </div>

        {/* Right side - Metrics */}
        <div
          className="right-section"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            padding: '0 16px',
          }}
        >

          {/* Metric 1 */}
          {metric1Label && (
            <div className="metric-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                className="metric-label"
                style={{
                  fontSize: `${metricLabelSize}px`,
                  color: '#666',
                }}
              >
                {metric1Label}
              </span>
              <span
                className="metric-value"
                style={{
                  fontSize: `${metricValueSize}px`,
                  fontWeight: 500,
                }}
              >
                {metric1Value !== null && metric1Value !== undefined 
                  ? metric1Formatter(metric1Value) 
                  : '-'}
              </span>
            </div>
          )}

          {/* Metric 2 */}
          {metric2Label && (
            <div className="metric-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                className="metric-label"
                style={{
                  fontSize: `${metricLabelSize}px`,
                  color: '#666',
                }}
              >
                {metric2Label}
              </span>
              <span
                className="metric-value"
                style={{
                  fontSize: `${metricValueSize}px`,
                  fontWeight: 500,
                }}
              >
                {metric2Value !== null && metric2Value !== undefined 
                  ? metric2Formatter(metric2Value) 
                  : '-'}
              </span>
            </div>
          )}

          {/* Metric 3 */}
          {metric3Label && (
            <div className="metric-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                className="metric-label"
                style={{
                  fontSize: `${metricLabelSize}px`,
                  color: '#666',
                }}
              >
                {metric3Label}
              </span>
              <span
                className="metric-value"
                style={{
                  fontSize: `${metricValueSize}px`,
                  fontWeight: 500,
                }}
              >
                {metric3Value !== null && metric3Value !== undefined 
                  ? metric3Formatter(metric3Value) 
                  : '-'}
              </span>
            </div>
          )}
        </div>
      </div>
  );
}

const StyledCourseNumberVis = styled(CourseNumberVis)<{ showHoverEffect?: boolean }>`
  ${({ theme, showHoverEffect }) => `
    font-family: ${theme.fontFamily};
    border:  ${showHoverEffect ? '1px solid #d9d9d9;' : 'none'};
    cursor: ${showHoverEffect ? 'pointer' : 'default'};
    transition: all 0.3s ease;
    box-sizing: border-box;
    
    ${showHoverEffect ? `
      &:hover {
        border-color: #1890ff;
        box-shadow: 0 4px 16px rgba(24, 144, 255, 0.5);
        background-color: rgba(24, 144, 255, 0.05);
      }
      
      &:active {
        transform: scale(0.95);
        border-color: #ff4d4f;
        background-color: rgba(255, 77, 79, 0.2);
      }
    ` : ''}

    .metric-row {
      margin: 4px 0;
    }

    .left-section {
      border-right-color: #e8e8e8;
    }

    .course-name {
      color: #999;
      padding-top: ${theme.sizeUnit * 4}px;
    }

    .unit {
      color: #666;
    }

    .metric-label {
      color: #666;
    }

    .main-number {
      color: inherit;
    }

    .metric-value {
      color: inherit;
    }
  `}
`;

export default StyledCourseNumberVis;
