import '../dashboard.css'
import ReactApexChart from 'react-apexcharts'
import { TimeSeriesData, ColumnChartData, SparkLineChartData } from '../types'
import { getTimeSeriesChartOptions, getColumnChartOptions, getSparkLineChartOptions } from './chartOptions'

interface ChartsProps {
  timeSeriesData: TimeSeriesData[]
  columnChartData: ColumnChartData[]
  AdultVisitors: SparkLineChartData
  ChildrenVisitors: SparkLineChartData
}

export const Charts = ({ timeSeriesData, columnChartData, AdultVisitors, ChildrenVisitors }: ChartsProps) => (
  <div className="charts-grid">
    {timeSeriesData.length > 0 && (
      <ReactApexChart
        key={`timeseries-${timeSeriesData.length}`}
        options={getTimeSeriesChartOptions(timeSeriesData)}
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

    {AdultVisitors && (
      <ReactApexChart
        key={`adult-sparkline-${AdultVisitors.Array.length}`}
        options={getSparkLineChartOptions(AdultVisitors, 'Adults')}
        series={[
          {
            name: 'Adults',
            data: AdultVisitors.Array,
          },
        ]}
        type="area"
        height={400}
      />
    )}

    {ChildrenVisitors && (
      <ReactApexChart
        key={`children-sparkline-${ChildrenVisitors.Array.length}`}
        options={getSparkLineChartOptions(ChildrenVisitors, 'Children')}
        series={[
          {
            name: 'Children',
            data: ChildrenVisitors.Array,
          },
        ]}
        type="area"
        height={400}
      />
    )}
  </div>
)
