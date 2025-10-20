import { useEffect } from 'react'
import { FiUpload, FiEye, FiMap, FiBarChart2, FiX, FiAlertCircle } from 'react-icons/fi'
import useStore from './store/useStore'
import FileUpload from './components/FileUpload'
import DataPreview from './components/DataPreview'
import ColumnMapper from './components/ColumnMapper'
import ChartView from './components/ChartView'

const TABS = [
  { id: 'upload', label: 'Upload', icon: FiUpload },
  { id: 'preview', label: 'Aperçu', icon: FiEye },
  { id: 'mapping', label: 'Mapping', icon: FiMap },
  { id: 'chart', label: 'Graphique', icon: FiBarChart2 }
]

function App() {
  const { activeTab, setActiveTab, isLoading, error, setError, reset } = useStore()

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'r') {
          e.preventDefault()
          reset()
          setActiveTab('upload')
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [reset, setActiveTab])

  const handleTabChange = (tabId) => {
    const currentIndex = TABS.findIndex(t => t.id === activeTab)
    const targetIndex = TABS.findIndex(t => t.id === tabId)

    // Only allow going back or staying on current tab
    if (targetIndex <= currentIndex) {
      setActiveTab(tabId)
    }
  }

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir recommencer ? Toutes les données seront perdues.')) {
      reset()
      setActiveTab('upload')
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Data Visualization App
              </h1>
              <p className="text-sm text-gray-600">
                Créez des visualisations interactives à partir de vos données
              </p>
            </div>

            {activeTab !== 'upload' && (
              <button
                onClick={handleReset}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2"
              >
                <FiX className="w-4 h-4" />
                Recommencer
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Tabs Navigation */}
      {activeTab !== 'upload' && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-6">
            <nav className="flex space-x-8">
              {TABS.map((tab, index) => {
                const Icon = tab.icon
                const isActive = activeTab === tab.id
                const currentIndex = TABS.findIndex(t => t.id === activeTab)
                const isAccessible = index <= currentIndex

                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabChange(tab.id)}
                    disabled={!isAccessible}
                    className={`
                      flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm transition-colors
                      ${isActive
                        ? 'border-primary-600 text-primary-600'
                        : isAccessible
                          ? 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                          : 'border-transparent text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                )
              })}
            </nav>
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
            <FiAlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h3 className="text-sm font-medium text-red-800">Erreur</h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-600 hover:text-red-800"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            <p className="text-gray-700 font-medium">Chargement...</p>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="py-8">
        {activeTab === 'upload' && <FileUpload />}
        {activeTab === 'preview' && <DataPreview />}
        {activeTab === 'mapping' && <ColumnMapper />}
        {activeTab === 'chart' && <ChartView />}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <p>
              Développé avec React, Plotly.js et Tailwind CSS
            </p>
            <p>
              Raccourci : <kbd className="px-2 py-1 bg-gray-100 rounded border border-gray-300">Ctrl+R</kbd> pour recommencer
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
