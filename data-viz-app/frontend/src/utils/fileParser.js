import Papa from 'papaparse'
import * as XLSX from 'xlsx'

/**
 * Parse CSV file
 */
export const parseCSV = (file) => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          console.warn('CSV parsing warnings:', results.errors)
        }
        resolve({
          data: results.data,
          columns: results.meta.fields,
          errors: results.errors
        })
      },
      error: (error) => {
        reject(error)
      }
    })
  })
}

/**
 * Parse Excel file (XLSX, XLS)
 */
export const parseExcel = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result)
        const workbook = XLSX.read(data, { type: 'array' })

        // Get first sheet
        const firstSheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[firstSheetName]

        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet, {
          header: 1,
          defval: null,
          raw: false
        })

        if (jsonData.length === 0) {
          reject(new Error('Le fichier Excel est vide'))
          return
        }

        // Extract headers and data
        const headers = jsonData[0]
        const rows = jsonData.slice(1)

        // Convert to array of objects
        const dataObjects = rows.map(row => {
          const obj = {}
          headers.forEach((header, index) => {
            obj[header] = row[index]
          })
          return obj
        })

        resolve({
          data: dataObjects,
          columns: headers,
          errors: []
        })
      } catch (error) {
        reject(error)
      }
    }

    reader.onerror = (error) => {
      reject(error)
    }

    reader.readAsArrayBuffer(file)
  })
}

/**
 * Main file parser that routes to appropriate parser
 */
export const parseFile = async (file) => {
  const fileName = file.name.toLowerCase()

  if (fileName.endsWith('.csv')) {
    return parseCSV(file)
  } else if (fileName.endsWith('.xlsx') || fileName.endsWith('.xls')) {
    return parseExcel(file)
  } else {
    throw new Error('Format de fichier non supporté. Utilisez CSV ou Excel (.xlsx, .xls)')
  }
}

/**
 * Detect column data types
 */
export const detectDataTypes = (data, columns) => {
  const types = {}

  columns.forEach(column => {
    const values = data.map(row => row[column]).filter(v => v !== null && v !== undefined && v !== '')

    if (values.length === 0) {
      types[column] = 'string'
      return
    }

    // Check if all values are numbers
    const numericValues = values.filter(v => !isNaN(parseFloat(v)) && isFinite(v))
    if (numericValues.length === values.length) {
      types[column] = 'number'
      return
    }

    // Check if values are dates
    const dateValues = values.filter(v => {
      const date = new Date(v)
      return date instanceof Date && !isNaN(date)
    })
    if (dateValues.length === values.length) {
      types[column] = 'date'
      return
    }

    // Check if boolean
    const boolValues = values.filter(v =>
      v === true || v === false ||
      v === 'true' || v === 'false' ||
      v === 'True' || v === 'False' ||
      v === 'TRUE' || v === 'FALSE'
    )
    if (boolValues.length === values.length) {
      types[column] = 'boolean'
      return
    }

    // Default to string
    types[column] = 'string'
  })

  return types
}

/**
 * Convert column to specific type
 */
export const convertColumnType = (data, column, targetType) => {
  return data.map(row => {
    const value = row[column]

    if (value === null || value === undefined || value === '') {
      return row
    }

    let convertedValue = value

    switch (targetType) {
      case 'number':
        convertedValue = parseFloat(value)
        if (isNaN(convertedValue)) {
          convertedValue = null
        }
        break
      case 'string':
        convertedValue = String(value)
        break
      case 'date':
        convertedValue = new Date(value)
        if (isNaN(convertedValue.getTime())) {
          convertedValue = null
        }
        break
      case 'boolean':
        convertedValue = value === true || value === 'true' || value === 'True' || value === 'TRUE' || value === 1
        break
      default:
        break
    }

    return { ...row, [column]: convertedValue }
  })
}
