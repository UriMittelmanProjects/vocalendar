// vocalendar/frontend/src/components/UI/TimeSelector.jsx
import React, { useState } from 'react';

const TimeSelector = ({ 
  value, 
  onChange, 
  label, 
  name, 
  required = false,
  placeholder = "Select time"
}) => {
  const [showPresets, setShowPresets] = useState(false);

  // Generate time options in 15-minute increments
  const generateTimeOptions = () => {
    const options = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = formatTimeDisplay(hour, minute);
        options.push({ value: timeValue, label: displayTime });
      }
    }
    return options;
  };

  const formatTimeDisplay = (hour, minute) => {
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    const displayMinute = minute === 0 ? '' : `:${minute.toString().padStart(2, '0')}`;
    return `${displayHour}${displayMinute} ${period}`;
  };

  const timeOptions = generateTimeOptions();

  // Common time presets
  const presets = [
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '11:00', label: '11:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '13:00', label: '1:00 PM' },
    { value: '14:00', label: '2:00 PM' },
    { value: '15:00', label: '3:00 PM' },
    { value: '16:00', label: '4:00 PM' },
    { value: '17:00', label: '5:00 PM' },
    { value: '18:00', label: '6:00 PM' }
  ];

  const handlePresetClick = (presetValue) => {
    onChange({ target: { name, value: presetValue } });
    setShowPresets(false);
  };

  const selectedOption = timeOptions.find(option => option.value === value);

  return (
    <div className="relative">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      
      <div className="flex space-x-2">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
          required={required}
        >
          <option value="">{placeholder}</option>
          {timeOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <button
          type="button"
          onClick={() => setShowPresets(!showPresets)}
          className="px-3 py-2 text-sm bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Quick
        </button>
      </div>

      {/* Quick Time Presets */}
      {showPresets && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
          <div className="p-2">
            <div className="text-xs font-medium text-gray-500 mb-2">Common Times</div>
            <div className="grid grid-cols-2 gap-1">
              {presets.map((preset) => (
                <button
                  key={preset.value}
                  type="button"
                  onClick={() => handlePresetClick(preset.value)}
                  className="text-xs px-2 py-1 text-left hover:bg-purple-50 hover:text-purple-700 rounded"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeSelector;