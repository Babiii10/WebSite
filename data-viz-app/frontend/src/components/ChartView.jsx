import { useRef } from 'react'
import ChartRenderer from './ChartRenderer'
import ChartCustomizer from './ChartCustomizer'

const ChartView = () => {
  const plotRef = useRef(null)

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Visualisation</h2>
        <p className="text-gray-600">
          Personnalisez votre graphique et exportez-le
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
          <ChartRenderer
            onExportImage={(ref) => {
              plotRef.current = ref.current
            }}
          />
        </div>

        {/* Customization Panel */}
        <div className="lg:col-span-1">
          <ChartCustomizer plotRef={plotRef} />
        </div>
      </div>
    </div>
  )
}

export default ChartView
