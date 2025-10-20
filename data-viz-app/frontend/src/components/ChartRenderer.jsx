import { useMemo, useRef } from 'react'
import Plot from 'react-plotly.js'
import useStore from '../store/useStore'
import { aggregateData } from '../utils/dataProcessor'

const COLOR_SCHEMES = {
  'Viridis': 'Viridis',
  'Blues': 'Blues',
  'Greens': 'Greens',
  'Reds': 'Reds',
  'Portland': 'Portland',
  'Jet': 'Jet',
  'Hot': 'Hot',
  'Blackbody': 'Blackbody',
  'Earth': 'Earth',
  'Electric': 'Electric',
  'YlOrRd': 'YlOrRd',
  'YlGnBu': 'YlGnBu'
}

const ChartRenderer = ({ onExportImage }) => {
  const plotRef = useRef(null)

  const {
    processedData,
    chartType,
    chartConfig,
    chartOptions,
    dataTypes
  } = useStore()

  // Prepare data for plotting
  const plotData = useMemo(() => {
    if (!processedData || processedData.length === 0) return []

    let data = [...processedData]

    // Apply aggregation if needed
    if (chartConfig.aggregation !== 'none' && chartConfig.groupBy && chartConfig.yAxis) {
      data = aggregateData(data, chartConfig.groupBy, chartConfig.yAxis, chartConfig.aggregation)
    }

    const traces = []

    switch (chartType) {
      case 'scatter':
        traces.push({
          type: 'scatter',
          mode: 'markers',
          x: data.map(row => row[chartConfig.xAxis]),
          y: data.map(row => row[chartConfig.yAxis]),
          marker: {
            size: chartConfig.sizeBy ? data.map(row => row[chartConfig.sizeBy]) : 8,
            color: chartConfig.colorBy ? data.map(row => row[chartConfig.colorBy]) : '#0ea5e9',
            colorscale: chartOptions.colorScheme,
            showscale: !!chartConfig.colorBy,
            line: { width: 0.5, color: '#fff' }
          },
          text: data.map((row, i) =>
            `${chartConfig.xAxis}: ${row[chartConfig.xAxis]}<br>` +
            `${chartConfig.yAxis}: ${row[chartConfig.yAxis]}` +
            (chartConfig.colorBy ? `<br>${chartConfig.colorBy}: ${row[chartConfig.colorBy]}` : '')
          ),
          hoverinfo: 'text'
        })
        break

      case 'line':
        if (chartConfig.colorBy) {
          // Group by color
          const groups = {}
          data.forEach(row => {
            const key = row[chartConfig.colorBy]
            if (!groups[key]) groups[key] = []
            groups[key].push(row)
          })

          Object.keys(groups).forEach(key => {
            traces.push({
              type: 'scatter',
              mode: 'lines+markers',
              name: key,
              x: groups[key].map(row => row[chartConfig.xAxis]),
              y: groups[key].map(row => row[chartConfig.yAxis]),
              line: { width: 2 },
              marker: { size: 6 }
            })
          })
        } else {
          traces.push({
            type: 'scatter',
            mode: 'lines+markers',
            x: data.map(row => row[chartConfig.xAxis]),
            y: data.map(row => row[chartConfig.yAxis]),
            line: { width: 2, color: '#0ea5e9' },
            marker: { size: 6 }
          })
        }
        break

      case 'bar':
        if (chartConfig.colorBy) {
          const groups = {}
          data.forEach(row => {
            const key = row[chartConfig.colorBy]
            if (!groups[key]) groups[key] = []
            groups[key].push(row)
          })

          Object.keys(groups).forEach(key => {
            traces.push({
              type: 'bar',
              name: key,
              x: groups[key].map(row => row[chartConfig.xAxis]),
              y: groups[key].map(row => row[chartConfig.yAxis])
            })
          })
        } else {
          traces.push({
            type: 'bar',
            x: data.map(row => row[chartConfig.xAxis]),
            y: data.map(row => row[chartConfig.yAxis]),
            marker: { color: '#0ea5e9' }
          })
        }
        break

      case 'area':
        if (chartConfig.colorBy) {
          const groups = {}
          data.forEach(row => {
            const key = row[chartConfig.colorBy]
            if (!groups[key]) groups[key] = []
            groups[key].push(row)
          })

          Object.keys(groups).forEach(key => {
            traces.push({
              type: 'scatter',
              mode: 'lines',
              name: key,
              x: groups[key].map(row => row[chartConfig.xAxis]),
              y: groups[key].map(row => row[chartConfig.yAxis]),
              fill: 'tonexty',
              line: { width: 2 }
            })
          })
        } else {
          traces.push({
            type: 'scatter',
            mode: 'lines',
            x: data.map(row => row[chartConfig.xAxis]),
            y: data.map(row => row[chartConfig.yAxis]),
            fill: 'tozeroy',
            line: { width: 2, color: '#0ea5e9' }
          })
        }
        break

      case 'pie':
        traces.push({
          type: 'pie',
          labels: data.map(row => row[chartConfig.xAxis]),
          values: data.map(row => row[chartConfig.yAxis]),
          textinfo: 'label+percent',
          hoverinfo: 'label+value+percent'
        })
        break

      case 'histogram':
        traces.push({
          type: 'histogram',
          x: data.map(row => row[chartConfig.xAxis]),
          marker: { color: '#0ea5e9' },
          nbinsx: 30
        })
        break

      case 'box':
        if (chartConfig.xAxis) {
          const groups = {}
          data.forEach(row => {
            const key = row[chartConfig.xAxis]
            if (!groups[key]) groups[key] = []
            groups[key].push(row[chartConfig.yAxis])
          })

          Object.keys(groups).forEach(key => {
            traces.push({
              type: 'box',
              name: key,
              y: groups[key],
              boxmean: 'sd'
            })
          })
        } else {
          traces.push({
            type: 'box',
            y: data.map(row => row[chartConfig.yAxis]),
            boxmean: 'sd',
            marker: { color: '#0ea5e9' }
          })
        }
        break

      case 'violin':
        if (chartConfig.xAxis) {
          const groups = {}
          data.forEach(row => {
            const key = row[chartConfig.xAxis]
            if (!groups[key]) groups[key] = []
            groups[key].push(row[chartConfig.yAxis])
          })

          Object.keys(groups).forEach(key => {
            traces.push({
              type: 'violin',
              name: key,
              y: groups[key],
              box: { visible: true },
              meanline: { visible: true }
            })
          })
        } else {
          traces.push({
            type: 'violin',
            y: data.map(row => row[chartConfig.yAxis]),
            box: { visible: true },
            meanline: { visible: true },
            marker: { color: '#0ea5e9' }
          })
        }
        break

      case 'heatmap':
        // Create matrix for heatmap
        const xValues = [...new Set(data.map(row => row[chartConfig.xAxis]))]
        const yValues = [...new Set(data.map(row => row[chartConfig.yAxis]))]
        const matrix = []

        yValues.forEach(yVal => {
          const row = []
          xValues.forEach(xVal => {
            const match = data.find(d =>
              d[chartConfig.xAxis] === xVal && d[chartConfig.yAxis] === yVal
            )
            row.push(match ? match[chartConfig.colorBy] : null)
          })
          matrix.push(row)
        })

        traces.push({
          type: 'heatmap',
          x: xValues,
          y: yValues,
          z: matrix,
          colorscale: chartOptions.colorScheme,
          hoverongaps: false
        })
        break

      case 'bubble':
        traces.push({
          type: 'scatter',
          mode: 'markers',
          x: data.map(row => row[chartConfig.xAxis]),
          y: data.map(row => row[chartConfig.yAxis]),
          marker: {
            size: chartConfig.sizeBy ? data.map(row => Math.sqrt(row[chartConfig.sizeBy]) * 2) : 15,
            color: chartConfig.colorBy ? data.map(row => row[chartConfig.colorBy]) : '#0ea5e9',
            colorscale: chartOptions.colorScheme,
            showscale: !!chartConfig.colorBy,
            sizemode: 'diameter',
            line: { width: 1, color: '#fff' }
          },
          text: data.map(row =>
            `${chartConfig.xAxis}: ${row[chartConfig.xAxis]}<br>` +
            `${chartConfig.yAxis}: ${row[chartConfig.yAxis]}` +
            (chartConfig.sizeBy ? `<br>${chartConfig.sizeBy}: ${row[chartConfig.sizeBy]}` : '') +
            (chartConfig.colorBy ? `<br>${chartConfig.colorBy}: ${row[chartConfig.colorBy]}` : '')
          ),
          hoverinfo: 'text'
        })
        break

      default:
        break
    }

    return traces
  }, [processedData, chartType, chartConfig, chartOptions])

  // Layout configuration
  const layout = useMemo(() => {
    return {
      title: {
        text: chartOptions.title || '',
        font: { size: 18, weight: 'bold' }
      },
      xaxis: {
        title: chartOptions.xAxisLabel || chartConfig.xAxis || '',
        showgrid: chartOptions.showGrid,
        zeroline: false
      },
      yaxis: {
        title: chartOptions.yAxisLabel || chartConfig.yAxis || '',
        showgrid: chartOptions.showGrid,
        zeroline: false
      },
      showlegend: chartOptions.showLegend,
      legend: {
        orientation: 'v',
        x: 1.02,
        y: 1,
        xanchor: 'left'
      },
      hovermode: 'closest',
      autosize: true,
      height: chartOptions.height || 600,
      margin: { l: 60, r: 40, t: 80, b: 60 },
      paper_bgcolor: '#fff',
      plot_bgcolor: '#fff',
      annotations: chartOptions.annotations || []
    }
  }, [chartOptions, chartConfig])

  // Config for Plotly
  const config = {
    responsive: true,
    displayModeBar: true,
    displaylogo: false,
    modeBarButtonsToAdd: ['hoverclosest', 'hovercompare'],
    modeBarButtonsToRemove: ['lasso2d', 'select2d'],
    toImageButtonOptions: {
      format: 'png',
      filename: 'chart',
      height: 1080,
      width: 1920,
      scale: 2
    }
  }

  // Expose plot reference for external image export
  if (onExportImage) {
    onExportImage(plotRef)
  }

  if (!processedData || processedData.length === 0 || plotData.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-600">Aucune donnée à afficher</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      <Plot
        ref={plotRef}
        data={plotData}
        layout={layout}
        config={config}
        style={{ width: '100%', height: '100%' }}
        useResizeHandler={true}
      />
    </div>
  )
}

export default ChartRenderer
