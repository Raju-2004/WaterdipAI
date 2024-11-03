import React from 'react'
import { Calendar } from 'lucide-react'
import { DateRange } from '../types'

interface DateRangePickerProps {
  dateRange: DateRange
  onDateChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onClear: () => void
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, onDateChange, onClear }) => (
  <div className="flex items-center gap-4 p-2 bg-white rounded-lg shadow-sm">
    <Calendar className="text-gray-500" size={20} />
    <input
      type="date"
      name="startDate"
      value={dateRange.startDate?.toISOString().split('T')[0] || ''}
      onChange={onDateChange}
      className="border rounded px-2 py-1"
    />
    <span className="text-gray-500">to</span>
    <input
      type="date"
      name="endDate"
      value={dateRange.endDate?.toISOString().split('T')[0] || ''}
      onChange={onDateChange}
      className="border rounded px-2 py-1"
    />
    {(dateRange.startDate || dateRange.endDate) && (
      <button onClick={onClear} className="text-sm text-blue-600 hover:text-blue-800">
        Clear
      </button>
    )}
  </div>
)
