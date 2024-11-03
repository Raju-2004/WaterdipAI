import React from 'react'
import ReactApexChart from 'react-apexcharts'
import { TimeSeriesData, ColumnChartData } from '../types'
import { getChartOptions, getColumnChartOptions } from './chartOptions'

interface ChartsProps {
  timeSeriesData: TimeSeriesData[]
  columnChartData: ColumnChartData[]
}

export const Charts: React.FC<ChartsProps> = ({ timeSeriesData, columnChartData }) => (
  <div className="col-span-2 bg-white p-4 rounded-lg shadow-sm">
    {timeSeriesData.length > 0 && (
      <ReactApexChart
        key={`timeseries-${timeSeriesData.length}`}
        options={getChartOptions(timeSeriesData)}
        series={[
          {
            name: 'Total Visitors',
            data: timeSeriesData.map((item) => item.visitors),
          },
        ]}
        type="line"
        height={400}
      />
    )}
    {columnChartData.length > 0 && (
      <ReactApexChart
        key={`column-${columnChartData.length}`}
        options={getColumnChartOptions(columnChartData)}
        series={[
          {
            name: 'Total Visitors Per Country',
            data: columnChartData.map((item) => item.visitors),
          },
        ]}
        type="bar"
        height={400}
      />
    )}
  </div>
)
