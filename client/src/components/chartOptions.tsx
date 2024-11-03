import { ApexOptions } from 'apexcharts'
import { TimeSeriesData, ColumnChartData } from '../types'

export const getChartOptions = (timeSeriesData: TimeSeriesData[]): ApexOptions => ({
  chart: {
    type: 'line',
    zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
    toolbar: { autoSelected: 'zoom' },
    animations: { enabled: false },
    background: '#ffffff',
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  title: {
    text: 'Daily Visitors',
    align: 'left',
    style: { fontSize: '16px', fontWeight: 'bold' },
  },
  xaxis: {
    type: 'datetime',
    categories: timeSeriesData.map((item) => item.date),
  },
  tooltip: { x: { format: 'dd MMM yyyy' } },
  theme: { mode: 'light' },
})

export const getColumnChartOptions = (columnChartData: ColumnChartData[]): ApexOptions => ({
  chart: {
    type: 'bar',
    zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
    toolbar: { autoSelected: 'zoom' },
    animations: { enabled: false },
    background: '#ffffff',
  },
  dataLabels: { enabled: false },
  stroke: { curve: 'smooth', width: 2 },
  title: {
    text: 'Visitors by Country',
    align: 'left',
    style: { fontSize: '16px', fontWeight: 'bold' },
  },
  xaxis: {
    type: 'category',
    categories: columnChartData.map((item) => item.country),
  },
  theme: { mode: 'light' },
})
