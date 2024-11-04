import { ApexOptions } from 'apexcharts'
import { TimeSeriesData, ColumnChartData, SparkLineChartData } from '../types'

export const getTimeSeriesChartOptions = (timeSeriesData: TimeSeriesData[]): ApexOptions => ({
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

// export const getColumnChartOptions = (columnChartData: ColumnChartData[]): ApexOptions => ({
//   chart: {
//     type: 'bar',
//     height: 350,
//     zoom: { enabled: true, type: 'x', autoScaleYaxis: true },
//     toolbar: { autoSelected: 'zoom' },
//     animations: { enabled: false },
//     background: '#ffffff',
//   },
//   plotOptions: {
//     bar: {
//       borderRadius: 10,
//       dataLabels: {
//         position: 'top', // similar to the provided example
//       },
//     },
//   },
//   dataLabels: {
//     enabled: true,
//     offsetY: -20,
//     style: {
//       fontSize: '12px',
//       colors: ['#304758'],
//     },
//   },
//   stroke: { curve: 'smooth', width: 2 },
//   title: {
//     text: 'Visitors by Country',
//     floating: true,
//     offsetY: 0,
//     align: 'center',
//     style: { color: '#444', fontSize: '16px', fontWeight: 'bold' },
//   },
//   xaxis: {
//     type: 'category',
//     categories: columnChartData.map((item) => item.country),
//     position: 'bottom',
//     axisBorder: { show: false },
//     axisTicks: { show: false },
//     crosshairs: {
//       fill: {
//         type: 'gradient',
//         gradient: {
//           colorFrom: '#D8E3F0',
//           colorTo: '#BED1E6',
//           stops: [0, 100],
//           opacityFrom: 0.4,
//           opacityTo: 0.5,
//         },
//       },
//     },
//     tooltip: { enabled: true },
//   },
//   yaxis: {
//     axisBorder: { show: false },
//     axisTicks: { show: false },
//     labels: {
//       show: false,
//       formatter: (val) => `${val}%`, // adds "%" to values
//     },
//   },
//   theme: { mode: 'light' },
// })

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

export const getSparkLineChartOptions = (data: SparkLineChartData, title: string): ApexOptions => ({
  chart: {
    type: 'area',
    sparkline: {
      enabled: true,
    },
    background: '#ffffff',
  },
  colors: ['#1E90FF'],

  stroke: {
    curve: 'straight',
    width: 2,
  },
  title: {
    text: `Total: ${data.total}`,
    align: 'center',
    style: { fontSize: '14px', fontWeight: 'bold' },
  },
  subtitle: {
    text: `${title}`,
    align: 'center',
    style: { fontSize: '12px' },
  },
})
