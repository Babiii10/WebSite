import { useRef, useState } from 'react'
import { FiUpload, FiFile, FiDownload } from 'react-icons/fi'
import useStore from '../store/useStore'
import { parseFile, detectDataTypes } from '../utils/fileParser'

const FileUpload = () => {
  const fileInputRef = useRef(null)
  const [dragActive, setDragActive] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  const { setRawData, setColumns, setDataTypes, setActiveTab, setLoading, setError } = useStore()

  const handleFile = async (file) => {
    if (!file) return

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      setError('Le fichier est trop volumineux. Taille maximum : 50 Mo')
      return
    }

    setLoading(true)
    setError(null)
    setUploadProgress(10)

    try {
      // Parse file
      const result = await parseFile(file)
      setUploadProgress(50)

      // Validate data
      if (!result.data || result.data.length === 0) {
        throw new Error('Le fichier ne contient aucune donnée')
      }

      if (!result.columns || result.columns.length === 0) {
        throw new Error('Le fichier ne contient aucune colonne')
      }

      // Detect data types
      const dataTypes = detectDataTypes(result.data, result.columns)
      setUploadProgress(80)

      // Store data
      setRawData(result.data)
      setColumns(result.columns)
      setDataTypes(dataTypes)
      setUploadProgress(100)

      // Move to next tab
      setTimeout(() => {
        setActiveTab('preview')
        setLoading(false)
        setUploadProgress(0)
      }, 500)

    } catch (error) {
      console.error('Error parsing file:', error)
      setError(error.message || 'Erreur lors de la lecture du fichier')
      setLoading(false)
      setUploadProgress(0)
    }
  }

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const loadSampleData = async () => {
    setLoading(true)
    setError(null)

    try {
      // Create sample sales data
      const sampleData = []
      const regions = ['Nord', 'Sud', 'Est', 'Ouest']
      const products = ['Product A', 'Product B', 'Product C', 'Product D']
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

      for (let i = 0; i < 200; i++) {
        sampleData.push({
          'Month': months[Math.floor(Math.random() * months.length)],
          'Region': regions[Math.floor(Math.random() * regions.length)],
          'Product': products[Math.floor(Math.random() * products.length)],
          'Sales': Math.floor(Math.random() * 10000) + 1000,
          'Quantity': Math.floor(Math.random() * 100) + 10,
          'Profit': Math.floor(Math.random() * 5000) + 500,
          'Customer_Count': Math.floor(Math.random() * 50) + 5
        })
      }

      const columns = ['Month', 'Region', 'Product', 'Sales', 'Quantity', 'Profit', 'Customer_Count']
      const dataTypes = detectDataTypes(sampleData, columns)

      setRawData(sampleData)
      setColumns(columns)
      setDataTypes(dataTypes)

      setTimeout(() => {
        setActiveTab('preview')
        setLoading(false)
      }, 500)

    } catch (error) {
      console.error('Error loading sample data:', error)
      setError('Erreur lors du chargement des données exemple')
      setLoading(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Application de Visualisation de Données
        </h1>
        <p className="text-gray-600">
          Uploadez un fichier CSV ou Excel pour commencer
        </p>
      </div>

      <div
        className={`
          border-2 border-dashed rounded-lg p-12 text-center transition-colors
          ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'}
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={handleChange}
          className="hidden"
        />

        <FiUpload className="w-16 h-16 mx-auto text-gray-400 mb-4" />

        <h3 className="text-xl font-semibold text-gray-700 mb-2">
          Glissez-déposez votre fichier ici
        </h3>
        <p className="text-gray-500 mb-6">
          ou cliquez pour sélectionner un fichier
        </p>

        <button
          onClick={handleButtonClick}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium inline-flex items-center gap-2"
        >
          <FiFile className="w-5 h-5" />
          Sélectionner un fichier
        </button>

        <p className="text-sm text-gray-400 mt-4">
          Formats supportés : CSV, XLSX, XLS (max 50 Mo)
        </p>
      </div>

      {uploadProgress > 0 && (
        <div className="mt-6">
          <div className="bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="bg-primary-600 h-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 text-center mt-2">
            Chargement... {uploadProgress}%
          </p>
        </div>
      )}

      <div className="mt-8 text-center">
        <p className="text-gray-600 mb-3">Ou essayez avec des données exemple</p>
        <button
          onClick={loadSampleData}
          className="px-6 py-2 border-2 border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors font-medium inline-flex items-center gap-2"
        >
          <FiDownload className="w-5 h-5" />
          Charger des données exemple
        </button>
      </div>

      <div className="mt-12 bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Fonctionnalités disponibles :
        </h3>
        <ul className="space-y-2 text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>Aperçu et nettoyage des données (types, filtres, doublons)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>Tous types de graphiques (barres, lignes, scatter, heatmap, etc.)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>Mapping automatique et personnalisation complète</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>Interactions (zoom, tooltip, filtres dynamiques)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-primary-600 mt-1">✓</span>
            <span>Export PNG/SVG/CSV et sauvegarde de configurations</span>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FileUpload
