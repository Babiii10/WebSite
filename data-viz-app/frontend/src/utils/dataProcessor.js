/**
 * Remove duplicate rows from data
 */
export const removeDuplicates = (data) => {
  const seen = new Set()
  return data.filter(row => {
    const key = JSON.stringify(row)
    if (seen.has(key)) {
      return false
    }
    seen.add(key)
    return true
  })
}

/**
 * Remove rows with null values in specified columns
 */
export const removeNulls = (data, columns = null) => {
  return data.filter(row => {
    const columnsToCheck = columns || Object.keys(row)
    return columnsToCheck.every(col => {
      const value = row[col]
      return value !== null && value !== undefined && value !== ''
    })
  })
}

/**
 * Apply filters to data
 * Filter format: { column: string, operator: string, value: any }
 */
export const applyFilters = (data, filters) => {
  if (!filters || filters.length === 0) {
    return data
  }

  return data.filter(row => {
    return filters.every(filter => {
      const { column, operator, value } = filter
      const cellValue = row[column]

      switch (operator) {
        case 'equals':
          return cellValue == value
        case 'not_equals':
          return cellValue != value
        case 'contains':
          return String(cellValue).toLowerCase().includes(String(value).toLowerCase())
        case 'not_contains':
          return !String(cellValue).toLowerCase().includes(String(value).toLowerCase())
        case 'greater_than':
          return parseFloat(cellValue) > parseFloat(value)
        case 'less_than':
          return parseFloat(cellValue) < parseFloat(value)
        case 'greater_equal':
          return parseFloat(cellValue) >= parseFloat(value)
        case 'less_equal':
          return parseFloat(cellValue) <= parseFloat(value)
        case 'is_null':
          return cellValue === null || cellValue === undefined || cellValue === ''
        case 'is_not_null':
          return cellValue !== null && cellValue !== undefined && cellValue !== ''
        default:
          return true
      }
    })
  })
}

/**
 * Aggregate data by group
 */
export const aggregateData = (data, groupBy, valueColumn, aggregation) => {
  if (!groupBy || !valueColumn || aggregation === 'none') {
    return data
  }

  const grouped = {}

  data.forEach(row => {
    const groupKey = row[groupBy]
    if (!grouped[groupKey]) {
      grouped[groupKey] = []
    }
    grouped[groupKey].push(row[valueColumn])
  })

  const aggregated = []

  Object.keys(grouped).forEach(groupKey => {
    const values = grouped[groupKey].filter(v => v !== null && v !== undefined && !isNaN(parseFloat(v)))
    let aggregatedValue

    switch (aggregation) {
      case 'sum':
        aggregatedValue = values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0)
        break
      case 'mean':
        aggregatedValue = values.length > 0
          ? values.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / values.length
          : 0
        break
      case 'median':
        if (values.length > 0) {
          const sorted = values.map(v => parseFloat(v)).sort((a, b) => a - b)
          const mid = Math.floor(sorted.length / 2)
          aggregatedValue = sorted.length % 2 === 0
            ? (sorted[mid - 1] + sorted[mid]) / 2
            : sorted[mid]
        } else {
          aggregatedValue = 0
        }
        break
      case 'count':
        aggregatedValue = values.length
        break
      case 'min':
        aggregatedValue = values.length > 0 ? Math.min(...values.map(v => parseFloat(v))) : 0
        break
      case 'max':
        aggregatedValue = values.length > 0 ? Math.max(...values.map(v => parseFloat(v))) : 0
        break
      default:
        aggregatedValue = 0
    }

    aggregated.push({
      [groupBy]: groupKey,
      [valueColumn]: aggregatedValue
    })
  })

  return aggregated
}

/**
 * Process data with all cleaning and transformation options
 */
export const processData = (rawData, options) => {
  let processed = [...rawData]

  // Remove duplicates
  if (options.removeDuplicates) {
    processed = removeDuplicates(processed)
  }

  // Apply filters
  if (options.filters && options.filters.length > 0) {
    processed = applyFilters(processed, options.filters)
  }

  // Remove nulls (after filters)
  if (options.removeNulls) {
    processed = removeNulls(processed)
  }

  return processed
}

/**
 * Get unique values for a column
 */
export const getUniqueValues = (data, column) => {
  const values = data.map(row => row[column])
  return [...new Set(values)].filter(v => v !== null && v !== undefined && v !== '')
}

/**
 * Get statistics for a numeric column
 */
export const getColumnStats = (data, column) => {
  const values = data
    .map(row => row[column])
    .filter(v => v !== null && v !== undefined && !isNaN(parseFloat(v)))
    .map(v => parseFloat(v))

  if (values.length === 0) {
    return null
  }

  const sorted = [...values].sort((a, b) => a - b)
  const sum = values.reduce((a, b) => a + b, 0)
  const mean = sum / values.length
  const median = sorted.length % 2 === 0
    ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
    : sorted[Math.floor(sorted.length / 2)]

  const variance = values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / values.length
  const stdDev = Math.sqrt(variance)

  return {
    count: values.length,
    sum,
    mean,
    median,
    min: sorted[0],
    max: sorted[sorted.length - 1],
    stdDev,
    q1: sorted[Math.floor(sorted.length * 0.25)],
    q3: sorted[Math.floor(sorted.length * 0.75)]
  }
}

/**
 * Export data to CSV
 */
export const exportToCSV = (data, filename = 'data.csv') => {
  if (!data || data.length === 0) {
    return
  }

  const headers = Object.keys(data[0])
  const csvContent = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const value = row[header]
        // Escape commas and quotes
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      }).join(',')
    )
  ].join('\n')

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  link.click()
  URL.revokeObjectURL(url)
}
