import { create } from 'zustand'

const useStore = create((set, get) => ({
  // Data state
  rawData: null,
  processedData: null,
  columns: [],
  dataTypes: {},

  // Chart configuration
  chartType: 'scatter',
  chartConfig: {
    xAxis: '',
    yAxis: '',
    colorBy: '',
    sizeBy: '',
    facetBy: '',
    aggregation: 'none',
    groupBy: ''
  },

  // Customization options
  chartOptions: {
    title: '',
    xAxisLabel: '',
    yAxisLabel: '',
    colorScheme: 'Viridis',
    showLegend: true,
    showGrid: true,
    annotations: [],
    width: null,
    height: 600
  },

  // Data cleaning options
  cleaningOptions: {
    removeDuplicates: false,
    removeNulls: false,
    filters: []
  },

  // UI state
  activeTab: 'upload',
  isLoading: false,
  error: null,

  // Actions
  setRawData: (data) => set({ rawData: data }),

  setProcessedData: (data) => set({ processedData: data }),

  setColumns: (columns) => set({ columns }),

  setDataTypes: (dataTypes) => set({ dataTypes }),

  setChartType: (chartType) => set({ chartType }),

  setChartConfig: (config) => set((state) => ({
    chartConfig: { ...state.chartConfig, ...config }
  })),

  setChartOptions: (options) => set((state) => ({
    chartOptions: { ...state.chartOptions, ...options }
  })),

  setCleaningOptions: (options) => set((state) => ({
    cleaningOptions: { ...state.cleaningOptions, ...options }
  })),

  setActiveTab: (tab) => set({ activeTab: tab }),

  setLoading: (isLoading) => set({ isLoading }),

  setError: (error) => set({ error }),

  // Reset all state
  reset: () => set({
    rawData: null,
    processedData: null,
    columns: [],
    dataTypes: {},
    chartType: 'scatter',
    chartConfig: {
      xAxis: '',
      yAxis: '',
      colorBy: '',
      sizeBy: '',
      facetBy: '',
      aggregation: 'none',
      groupBy: ''
    },
    chartOptions: {
      title: '',
      xAxisLabel: '',
      yAxisLabel: '',
      colorScheme: 'Viridis',
      showLegend: true,
      showGrid: true,
      annotations: [],
      width: null,
      height: 600
    },
    cleaningOptions: {
      removeDuplicates: false,
      removeNulls: false,
      filters: []
    },
    activeTab: 'upload',
    isLoading: false,
    error: null
  }),

  // Save/Load configuration
  saveConfiguration: () => {
    const state = get()
    const config = {
      chartType: state.chartType,
      chartConfig: state.chartConfig,
      chartOptions: state.chartOptions,
      cleaningOptions: state.cleaningOptions
    }
    const blob = new Blob([JSON.stringify(config, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'chart-config.json'
    a.click()
    URL.revokeObjectURL(url)
  },

  loadConfiguration: (config) => {
    set({
      chartType: config.chartType || 'scatter',
      chartConfig: config.chartConfig || {},
      chartOptions: config.chartOptions || {},
      cleaningOptions: config.cleaningOptions || {}
    })
  }
}))

export default useStore
