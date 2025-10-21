import { FiSettings, FiDownload, FiSave } from 'react-icons/fi'
import useStore from '../store/useStore'
import { exportToCSV } from '../utils/dataProcessor'

const COLOR_SCHEMES = [
  'Viridis', 'Blues', 'Greens', 'Reds', 'Portland', 'Jet', 'Hot',
  'Blackbody', 'Earth', 'Electric', 'YlOrRd', 'YlGnBu'
]

const ChartCustomizer = ({ plotRef }) => {
  const {
    chartOptions,
    setChartOptions,
    processedData,
    saveConfiguration
  } = useStore()

  const handleExportPNG = () => {
    if (plotRef?.current) {
      // Use the built-in Plotly export feature via the plot reference
      const gd = plotRef.current.el || plotRef.current
      if (gd && window.Plotly) {
        window.Plotly.downloadImage(gd, {
          format: 'png',
          width: 1920,
          height: 1080,
          filename: chartOptions.title || 'chart'
        })
      }
    }
  }

  const handleExportSVG = () => {
    if (plotRef?.current) {
      const gd = plotRef.current.el || plotRef.current
      if (gd && window.Plotly) {
        window.Plotly.downloadImage(gd, {
          format: 'svg',
          width: 1920,
          height: 1080,
          filename: chartOptions.title || 'chart'
        })
      }
    }
  }

  const handleExportCSV = () => {
    exportToCSV(processedData, `${chartOptions.title || 'data'}.csv`)
  }

  return (
    <div className="space-y-6">
      {/* Customization Panel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiSettings className="w-5 h-5" />
          Personnalisation
        </h3>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Titre du graphique
            </label>
            <input
              type="text"
              value={chartOptions.title || ''}
              onChange={(e) => setChartOptions({ title: e.target.value })}
              placeholder="Entrez un titre..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Axis Labels */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label axe X
              </label>
              <input
                type="text"
                value={chartOptions.xAxisLabel || ''}
                onChange={(e) => setChartOptions({ xAxisLabel: e.target.value })}
                placeholder="Label axe X"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Label axe Y
              </label>
              <input
                type="text"
                value={chartOptions.yAxisLabel || ''}
                onChange={(e) => setChartOptions({ yAxisLabel: e.target.value })}
                placeholder="Label axe Y"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
              />
            </div>
          </div>

          {/* Color Scheme */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Palette de couleurs
            </label>
            <select
              value={chartOptions.colorScheme || 'Viridis'}
              onChange={(e) => setChartOptions({ colorScheme: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            >
              {COLOR_SCHEMES.map(scheme => (
                <option key={scheme} value={scheme}>{scheme}</option>
              ))}
            </select>
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hauteur (px)
            </label>
            <input
              type="number"
              value={chartOptions.height || 600}
              onChange={(e) => setChartOptions({ height: parseInt(e.target.value) || 600 })}
              min="300"
              max="1200"
              step="50"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-500"
            />
          </div>

          {/* Options Checkboxes */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showLegend"
                checked={chartOptions.showLegend ?? true}
                onChange={(e) => setChartOptions({ showLegend: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="showLegend" className="text-gray-700 cursor-pointer">
                Afficher la légende
              </label>
            </div>

            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="showGrid"
                checked={chartOptions.showGrid ?? true}
                onChange={(e) => setChartOptions({ showGrid: e.target.checked })}
                className="w-5 h-5 text-primary-600 rounded focus:ring-primary-500"
              />
              <label htmlFor="showGrid" className="text-gray-700 cursor-pointer">
                Afficher la grille
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Export Panel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiDownload className="w-5 h-5" />
          Exportation
        </h3>

        <div className="space-y-3">
          <button
            onClick={handleExportPNG}
            className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FiDownload className="w-5 h-5" />
            Exporter en PNG
          </button>

          <button
            onClick={handleExportSVG}
            className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FiDownload className="w-5 h-5" />
            Exporter en SVG
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FiDownload className="w-5 h-5" />
            Exporter les données (CSV)
          </button>
        </div>
      </div>

      {/* Configuration Panel */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiSave className="w-5 h-5" />
          Configuration
        </h3>

        <div className="space-y-3">
          <button
            onClick={saveConfiguration}
            className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium flex items-center justify-center gap-2"
          >
            <FiSave className="w-5 h-5" />
            Sauvegarder la configuration
          </button>

          <div>
            <label htmlFor="loadConfig" className="w-full px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors font-medium flex items-center justify-center gap-2 cursor-pointer">
              <FiDownload className="w-5 h-5" />
              Charger une configuration
            </label>
            <input
              id="loadConfig"
              type="file"
              accept=".json"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  const reader = new FileReader()
                  reader.onload = (event) => {
                    try {
                      const config = JSON.parse(event.target.result)
                      useStore.getState().loadConfiguration(config)
                    } catch (error) {
                      console.error('Error loading configuration:', error)
                    }
                  }
                  reader.readAsText(file)
                }
              }}
            />
          </div>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          La configuration sauvegarde le type de graphique, le mapping des colonnes et toutes les options de personnalisation.
        </p>
      </div>
    </div>
  )
}

export default ChartCustomizer
