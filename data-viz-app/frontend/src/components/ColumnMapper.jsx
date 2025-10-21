import { useEffect, useMemo } from 'react'
import { FiTrendingUp, FiCircle, FiDroplet, FiMaximize2, FiGrid } from 'react-icons/fi'
import useStore from '../store/useStore'

const CHART_TYPES = [
  { value: 'scatter', label: 'Scatter', icon: FiCircle, description: 'Points de données' },
  { value: 'line', label: 'Ligne', icon: FiTrendingUp, description: 'Évolution temporelle' },
  { value: 'bar', label: 'Barres', icon: FiGrid, description: 'Comparaison de catégories' },
  { value: 'area', label: 'Aires', icon: FiDroplet, description: 'Surface cumulée' },
  { value: 'pie', label: 'Secteurs', icon: FiCircle, description: 'Proportions' },
  { value: 'histogram', label: 'Histogramme', icon: FiGrid, description: 'Distribution' },
  { value: 'box', label: 'Boxplot', icon: FiMaximize2, description: 'Distribution statistique' },
  { value: 'heatmap', label: 'Heatmap', icon: FiGrid, description: 'Carte de chaleur' },
  { value: 'bubble', label: 'Bulles', icon: FiCircle, description: 'Scatter avec taille' },
  { value: 'violin', label: 'Violin', icon: FiMaximize2, description: 'Distribution dense' }
]

const AGGREGATIONS = [
  { value: 'none', label: 'Aucune' },
  { value: 'sum', label: 'Somme' },
  { value: 'mean', label: 'Moyenne' },
  { value: 'median', label: 'Médiane' },
  { value: 'count', label: 'Compte' },
  { value: 'min', label: 'Minimum' },
  { value: 'max', label: 'Maximum' }
]

const ColumnMapper = () => {
  const {
    processedData,
    columns,
    dataTypes,
    chartType,
    setChartType,
    chartConfig,
    setChartConfig,
    setActiveTab
  } = useStore()

  // Auto-suggest mappings when chart type changes
  useEffect(() => {
    if (!columns || columns.length === 0) return

    const numericColumns = columns.filter(col => dataTypes[col] === 'number')
    const categoricalColumns = columns.filter(col => dataTypes[col] === 'string')

    // Auto-mapping logic
    if (!chartConfig.xAxis && columns.length > 0) {
      setChartConfig({
        xAxis: categoricalColumns[0] || columns[0]
      })
    }

    if (!chartConfig.yAxis && numericColumns.length > 0) {
      setChartConfig({
        yAxis: numericColumns[0]
      })
    }
  }, [chartType, columns])

  const numericColumns = useMemo(() => {
    return columns.filter(col => dataTypes[col] === 'number')
  }, [columns, dataTypes])

  const categoricalColumns = useMemo(() => {
    return columns.filter(col => dataTypes[col] === 'string')
  }, [columns, dataTypes])

  const handleContinue = () => {
    setActiveTab('chart')
  }

  // Chart-specific field requirements
  const chartRequirements = useMemo(() => {
    switch (chartType) {
      case 'scatter':
      case 'line':
      case 'bubble':
        return {
          xAxis: { required: true, type: 'any' },
          yAxis: { required: true, type: 'number' },
          colorBy: { required: false, type: 'any' },
          sizeBy: chartType === 'bubble' ? { required: false, type: 'number' } : null
        }
      case 'bar':
      case 'area':
        return {
          xAxis: { required: true, type: 'any' },
          yAxis: { required: true, type: 'number' },
          colorBy: { required: false, type: 'any' }
        }
      case 'pie':
        return {
          xAxis: { required: true, type: 'any', label: 'Labels' },
          yAxis: { required: true, type: 'number', label: 'Valeurs' }
        }
      case 'histogram':
        return {
          xAxis: { required: true, type: 'number', label: 'Variable' }
        }
      case 'box':
      case 'violin':
        return {
          xAxis: { required: false, type: 'any', label: 'Groupes' },
          yAxis: { required: true, type: 'number', label: 'Valeurs' }
        }
      case 'heatmap':
        return {
          xAxis: { required: true, type: 'any' },
          yAxis: { required: true, type: 'any' },
          colorBy: { required: true, type: 'number', label: 'Valeur de couleur' }
        }
      default:
        return {}
    }
  }, [chartType])

  const isValid = useMemo(() => {
    if (!chartRequirements.xAxis?.required && !chartRequirements.yAxis?.required) {
      return false
    }

    if (chartRequirements.xAxis?.required && !chartConfig.xAxis) return false
    if (chartRequirements.yAxis?.required && !chartConfig.yAxis) return false
    if (chartRequirements.colorBy?.required && !chartConfig.colorBy) return false

    return true
  }, [chartType, chartConfig, chartRequirements])

  if (!processedData || !columns) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Aucune donnée disponible</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Configuration du Graphique</h2>
        <p className="text-gray-600">
          Choisissez le type de graphique et mappez vos colonnes
        </p>
      </div>

      {/* Chart Type Selection */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Type de Graphique</h3>
        <div className="grid grid-cols-5 gap-3">
          {CHART_TYPES.map(type => {
            const Icon = type.icon
            return (
              <button
                key={type.value}
                onClick={() => setChartType(type.value)}
                className={`
                  p-4 rounded-lg border-2 transition-all text-center
                  ${chartType === type.value
                    ? 'border-primary-600 bg-primary-50'
                    : 'border-gray-200 hover:border-primary-300 bg-white'
                  }
                `}
              >
                <Icon className={`w-8 h-8 mx-auto mb-2 ${chartType === type.value ? 'text-primary-600' : 'text-gray-600'}`} />
                <div className={`font-medium mb-1 ${chartType === type.value ? 'text-primary-700' : 'text-gray-700'}`}>
                  {type.label}
                </div>
                <div className="text-xs text-gray-500">
                  {type.description}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Column Mapping */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Mapping des Colonnes</h3>

        <div className="space-y-4">
          {/* X Axis */}
          {chartRequirements.xAxis && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {chartRequirements.xAxis.label || 'Axe X'}
                {chartRequirements.xAxis.required && <span className="text-red-600 ml-1">*</span>}
              </label>
              <select
                value={chartConfig.xAxis || ''}
                onChange={(e) => setChartConfig({ xAxis: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Sélectionner une colonne...</option>
                {columns.map(col => (
                  <option key={col} value={col}>
                    {col} ({dataTypes[col]})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Y Axis */}
          {chartRequirements.yAxis && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {chartRequirements.yAxis.label || 'Axe Y'}
                {chartRequirements.yAxis.required && <span className="text-red-600 ml-1">*</span>}
              </label>
              <select
                value={chartConfig.yAxis || ''}
                onChange={(e) => setChartConfig({ yAxis: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Sélectionner une colonne...</option>
                {(chartRequirements.yAxis.type === 'number' ? numericColumns : columns).map(col => (
                  <option key={col} value={col}>
                    {col} ({dataTypes[col]})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color By */}
          {chartRequirements.colorBy !== null && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {chartRequirements.colorBy?.label || 'Couleur par'}
                {chartRequirements.colorBy?.required && <span className="text-red-600 ml-1">*</span>}
              </label>
              <select
                value={chartConfig.colorBy || ''}
                onChange={(e) => setChartConfig({ colorBy: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Aucune</option>
                {columns.map(col => (
                  <option key={col} value={col}>
                    {col} ({dataTypes[col]})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Size By (for bubble charts) */}
          {chartRequirements.sizeBy && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Taille par
              </label>
              <select
                value={chartConfig.sizeBy || ''}
                onChange={(e) => setChartConfig({ sizeBy: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Aucune</option>
                {numericColumns.map(col => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Facet By */}
          {['scatter', 'line', 'bar'].includes(chartType) && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Facettes (sous-graphiques)
              </label>
              <select
                value={chartConfig.facetBy || ''}
                onChange={(e) => setChartConfig({ facetBy: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                <option value="">Aucune</option>
                {categoricalColumns.map(col => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* Aggregation */}
      {['bar', 'line', 'area'].includes(chartType) && (
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Agrégation</h3>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type d'agrégation
              </label>
              <select
                value={chartConfig.aggregation || 'none'}
                onChange={(e) => setChartConfig({ aggregation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              >
                {AGGREGATIONS.map(agg => (
                  <option key={agg.value} value={agg.value}>
                    {agg.label}
                  </option>
                ))}
              </select>
            </div>

            {chartConfig.aggregation !== 'none' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Grouper par
                </label>
                <select
                  value={chartConfig.groupBy || ''}
                  onChange={(e) => setChartConfig({ groupBy: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
                >
                  <option value="">Sélectionner...</option>
                  {categoricalColumns.map(col => (
                    <option key={col} value={col}>
                      {col}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Validation message */}
      {!isValid && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
          <p className="text-yellow-800">
            Veuillez sélectionner toutes les colonnes requises pour continuer.
          </p>
        </div>
      )}

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!isValid}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Générer le Graphique
        </button>
      </div>
    </div>
  )
}

export default ColumnMapper
