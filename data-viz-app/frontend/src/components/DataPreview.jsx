import { useState, useMemo } from 'react'
import { FiTrash2, FiFilter, FiCheck, FiX, FiPlus } from 'react-icons/fi'
import useStore from '../store/useStore'
import { processData, getColumnStats, getUniqueValues } from '../utils/dataProcessor'
import { convertColumnType } from '../utils/fileParser'

const DataPreview = () => {
  const {
    rawData,
    setProcessedData,
    columns,
    dataTypes,
    setDataTypes,
    cleaningOptions,
    setCleaningOptions,
    setActiveTab
  } = useStore()

  const [newFilter, setNewFilter] = useState({
    column: '',
    operator: 'equals',
    value: ''
  })

  // Process data with current options
  const processedData = useMemo(() => {
    if (!rawData) return []
    return processData(rawData, cleaningOptions)
  }, [rawData, cleaningOptions])

  // Get preview data (first 100 rows)
  const previewData = useMemo(() => {
    return processedData.slice(0, 100)
  }, [processedData])

  const handleRemoveDuplicates = () => {
    setCleaningOptions({
      ...cleaningOptions,
      removeDuplicates: !cleaningOptions.removeDuplicates
    })
  }

  const handleRemoveNulls = () => {
    setCleaningOptions({
      ...cleaningOptions,
      removeNulls: !cleaningOptions.removeNulls
    })
  }

  const handleAddFilter = () => {
    if (!newFilter.column || !newFilter.operator) return

    setCleaningOptions({
      ...cleaningOptions,
      filters: [...cleaningOptions.filters, { ...newFilter }]
    })

    setNewFilter({ column: '', operator: 'equals', value: '' })
  }

  const handleRemoveFilter = (index) => {
    const updatedFilters = cleaningOptions.filters.filter((_, i) => i !== index)
    setCleaningOptions({
      ...cleaningOptions,
      filters: updatedFilters
    })
  }

  const handleChangeColumnType = (column, newType) => {
    const updatedData = convertColumnType(rawData, column, newType)
    setDataTypes({ ...dataTypes, [column]: newType })
    // Update raw data with converted values
    useStore.setState({ rawData: updatedData })
  }

  const handleContinue = () => {
    setProcessedData(processedData)
    setActiveTab('mapping')
  }

  if (!rawData || !columns) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-600">Aucune donnée à afficher</p>
      </div>
    )
  }

  const stats = {
    originalRows: rawData.length,
    processedRows: processedData.length,
    removedRows: rawData.length - processedData.length,
    columns: columns.length
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Aperçu et Nettoyage des Données</h2>
        <p className="text-gray-600">
          Vérifiez vos données et appliquez des transformations si nécessaire
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Lignes totales</div>
          <div className="text-2xl font-bold text-gray-800">{stats.originalRows}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Après filtrage</div>
          <div className="text-2xl font-bold text-primary-600">{stats.processedRows}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Lignes supprimées</div>
          <div className="text-2xl font-bold text-red-600">{stats.removedRows}</div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Colonnes</div>
          <div className="text-2xl font-bold text-gray-800">{stats.columns}</div>
        </div>
      </div>

      {/* Cleaning Options */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Options de Nettoyage</h3>

        <div className="space-y-4">
          {/* Remove duplicates */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRemoveDuplicates}
              className={`
                w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                ${cleaningOptions.removeDuplicates
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 hover:border-primary-400'
                }
              `}
            >
              {cleaningOptions.removeDuplicates && <FiCheck className="w-4 h-4" />}
            </button>
            <label className="text-gray-700 cursor-pointer" onClick={handleRemoveDuplicates}>
              Supprimer les doublons
            </label>
          </div>

          {/* Remove nulls */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleRemoveNulls}
              className={`
                w-6 h-6 rounded border-2 flex items-center justify-center transition-colors
                ${cleaningOptions.removeNulls
                  ? 'bg-primary-600 border-primary-600 text-white'
                  : 'border-gray-300 hover:border-primary-400'
                }
              `}
            >
              {cleaningOptions.removeNulls && <FiCheck className="w-4 h-4" />}
            </button>
            <label className="text-gray-700 cursor-pointer" onClick={handleRemoveNulls}>
              Supprimer les lignes avec valeurs manquantes
            </label>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FiFilter className="w-5 h-5" />
          Filtres
        </h3>

        {/* Existing filters */}
        {cleaningOptions.filters.length > 0 && (
          <div className="space-y-2 mb-4">
            {cleaningOptions.filters.map((filter, index) => (
              <div key={index} className="flex items-center gap-2 bg-gray-50 p-3 rounded">
                <span className="font-medium text-gray-700">{filter.column}</span>
                <span className="text-gray-500">{filter.operator}</span>
                <span className="text-gray-700">{filter.value}</span>
                <button
                  onClick={() => handleRemoveFilter(index)}
                  className="ml-auto text-red-600 hover:text-red-700"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Add new filter */}
        <div className="flex gap-2 items-end">
          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Colonne</label>
            <select
              value={newFilter.column}
              onChange={(e) => setNewFilter({ ...newFilter, column: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
            >
              <option value="">Sélectionner...</option>
              {columns.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Opérateur</label>
            <select
              value={newFilter.operator}
              onChange={(e) => setNewFilter({ ...newFilter, operator: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500"
            >
              <option value="equals">Égal à</option>
              <option value="not_equals">Différent de</option>
              <option value="contains">Contient</option>
              <option value="not_contains">Ne contient pas</option>
              <option value="greater_than">Plus grand que</option>
              <option value="less_than">Plus petit que</option>
              <option value="greater_equal">Supérieur ou égal</option>
              <option value="less_equal">Inférieur ou égal</option>
              <option value="is_null">Est vide</option>
              <option value="is_not_null">N'est pas vide</option>
            </select>
          </div>

          <div className="flex-1">
            <label className="block text-sm text-gray-600 mb-1">Valeur</label>
            <input
              type="text"
              value={newFilter.value}
              onChange={(e) => setNewFilter({ ...newFilter, value: e.target.value })}
              disabled={newFilter.operator === 'is_null' || newFilter.operator === 'is_not_null'}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500 disabled:bg-gray-100"
            />
          </div>

          <button
            onClick={handleAddFilter}
            disabled={!newFilter.column}
            className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <FiPlus className="w-5 h-5" />
            Ajouter
          </button>
        </div>
      </div>

      {/* Column Types */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Types de Colonnes</h3>
        <div className="grid grid-cols-3 gap-3">
          {columns.map(col => (
            <div key={col} className="flex items-center gap-2">
              <span className="text-sm text-gray-700 flex-1 truncate">{col}</span>
              <select
                value={dataTypes[col] || 'string'}
                onChange={(e) => handleChangeColumnType(col, e.target.value)}
                className="px-2 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:border-primary-500"
              >
                <option value="string">Texte</option>
                <option value="number">Nombre</option>
                <option value="date">Date</option>
                <option value="boolean">Booléen</option>
              </select>
            </div>
          ))}
        </div>
      </div>

      {/* Data Preview Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden mb-6">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">
            Aperçu (100 premières lignes)
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {columns.map(col => (
                  <th key={col} className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider whitespace-nowrap">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {previewData.map((row, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  {columns.map(col => (
                    <td key={col} className="px-4 py-2 text-sm text-gray-700 whitespace-nowrap">
                      {row[col] !== null && row[col] !== undefined ? String(row[col]) : '-'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Continue Button */}
      <div className="flex justify-end">
        <button
          onClick={handleContinue}
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
        >
          Continuer vers le Mapping
        </button>
      </div>
    </div>
  )
}

export default DataPreview
