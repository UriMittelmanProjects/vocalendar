// vocalendar/frontend/src/components/Calendar/RecurrenceOptions.jsx
import React from 'react';

const RecurrenceOptions = ({ 
  showRecurrence, 
  toggleRecurrence, 
  recurrenceData, 
  handleRecurrenceChange, 
  formattedEndsOnDate 
}) => {
  return (
    <>
      {/* Recurrence Toggle */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="repeat"
              checked={showRecurrence}
              onChange={toggleRecurrence}
              className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            />
            <label htmlFor="repeat" className="ml-2 block text-sm text-gray-700">
              Repeat
            </label>
          </div>
        </div>
      </div>
      
      {/* Recurrence Options */}
      {showRecurrence && (
        <div className="mb-6 bg-gray-50 p-4 rounded-md border border-gray-200">
          <div className="mb-3">
            <label htmlFor="frequency" className="block text-sm font-medium text-gray-700 mb-1">
              Frequency
            </label>
            <select
              id="frequency"
              name="frequency"
              value={recurrenceData.frequency}
              onChange={handleRecurrenceChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
          
          <div className="mb-3">
            <label htmlFor="interval" className="block text-sm font-medium text-gray-700 mb-1">
              Repeat every
            </label>
            <div className="flex items-center">
              <input
                type="number"
                id="interval"
                name="interval"
                min="1"
                max="99"
                value={recurrenceData.interval}
                onChange={handleRecurrenceChange}
                className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">
                {recurrenceData.frequency === 'daily' ? 'day(s)' : 
                 recurrenceData.frequency === 'weekly' ? 'week(s)' :
                 recurrenceData.frequency === 'monthly' ? 'month(s)' : 'year(s)'}
              </span>
            </div>
          </div>
          
          {/* Weekly specific options */}
          {recurrenceData.frequency === 'weekly' && (
            <div className="mb-3">
              <fieldset>
                <legend className="block text-sm font-medium text-gray-700 mb-1">
                  Repeat on
                </legend>
                <div className="grid grid-cols-7 gap-2">
                  {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                    <div key={index} className="flex justify-center">
                      <label className="flex flex-col items-center">
                        <input
                          type="checkbox"
                          name={`day-${index}`}
                          checked={recurrenceData.days.includes(index)}
                          onChange={handleRecurrenceChange}
                          className="sr-only"
                        />
                        <span 
                          className={`
                            w-8 h-8 flex items-center justify-center rounded-full text-xs
                            ${recurrenceData.days.includes(index) 
                              ? 'bg-purple-600 text-white' 
                              : 'bg-gray-200 text-gray-700'}
                          `}
                        >
                          {day}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
            </div>
          )}
          
          {/* Ends options */}
          <div className="mb-3">
            <fieldset>
              <legend className="block text-sm font-medium text-gray-700 mb-1">
                Ends
              </legend>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ends-never"
                    name="endsType"
                    value="never"
                    checked={recurrenceData.ends.type === 'never'}
                    onChange={handleRecurrenceChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor="ends-never" className="ml-2 block text-sm text-gray-700">
                    Never
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ends-after"
                    name="endsType"
                    value="after"
                    checked={recurrenceData.ends.type === 'after'}
                    onChange={handleRecurrenceChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor="ends-after" className="ml-2 block text-sm text-gray-700">
                    After
                  </label>
                  <input
                    type="number"
                    name="endsAfter"
                    min="1"
                    max="999"
                    value={recurrenceData.ends.occurrences || 10}
                    onChange={handleRecurrenceChange}
                    className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={recurrenceData.ends.type !== 'after'}
                  />
                  <span className="ml-2 text-sm text-gray-700">occurrence(s)</span>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="ends-on"
                    name="endsType"
                    value="on"
                    checked={recurrenceData.ends.type === 'on'}
                    onChange={handleRecurrenceChange}
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300"
                  />
                  <label htmlFor="ends-on" className="ml-2 block text-sm text-gray-700">
                    On
                  </label>
                  <input
                    type="date"
                    name="endsOn"
                    value={recurrenceData.ends.date ? formatDateForInput(new Date(recurrenceData.ends.date)) : formattedEndsOnDate}
                    onChange={handleRecurrenceChange}
                    className="ml-2 px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled={recurrenceData.ends.type !== 'on'}
                  />
                </div>
              </div>
            </fieldset>
          </div>
        </div>
      )}
    </>
  );
};

export default RecurrenceOptions;