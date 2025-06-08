// vocalendar/frontend/src/components/UI/RecurrenceSelector.jsx
import React, { useState } from 'react';

const RecurrenceSelector = ({ value, onChange, name }) => {
    const [showAdvanced, setShowAdvanced] = useState(false);

    const frequencies = [
        { value: 'none', label: 'Does not repeat' },
        { value: 'daily', label: 'Daily' },
        { value: 'weekly', label: 'Weekly' },
        { value: 'monthly', label: 'Monthly' },
        { value: 'yearly', label: 'Yearly' },
        { value: 'custom', label: 'Custom...' }
    ];

    const daysOfWeek = [
        { value: 0, label: 'Sun', fullLabel: 'Sunday' },
        { value: 1, label: 'Mon', fullLabel: 'Monday' },
        { value: 2, label: 'Tue', fullLabel: 'Tuesday' },
        { value: 3, label: 'Wed', fullLabel: 'Wednesday' },
        { value: 4, label: 'Thu', fullLabel: 'Thursday' },
        { value: 5, label: 'Fri', fullLabel: 'Friday' },
        { value: 6, label: 'Sat', fullLabel: 'Saturday' }
    ];

    const handleFrequencyChange = (frequency) => {
        if (frequency === 'none') {
            onChange({
                target: {
                    name,
                    value: null
                }
            });
        } else {
            // Get current date for default day selection
            const currentDate = new Date();
            const newRule = {
                frequency,
                interval: 1,
                daysOfWeek: frequency === 'weekly' ? [currentDate.getDay()] : [],
                endDate: null,
                count: null
            };
            onChange({
                target: {
                    name,
                    value: newRule
                }
            });
        }
        setShowAdvanced(frequency === 'custom');
    };

    const handleRuleChange = (field, fieldValue) => {
        const updatedRule = {
            ...value,
            [field]: fieldValue
        };
        onChange({
            target: {
                name,
                value: updatedRule
            }
        });
    };

    const handleDayToggle = (dayValue) => {
        const currentDays = value?.daysOfWeek || [];
        const updatedDays = currentDays.includes(dayValue)
            ? currentDays.filter(day => day !== dayValue)
            : [...currentDays, dayValue].sort();

        handleRuleChange('daysOfWeek', updatedDays);
    };

    const currentFrequency = value?.frequency || 'none';

    return (
        <div className="space-y-3">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Repeat
                </label>
                <select
                    value={currentFrequency}
                    onChange={(e) => handleFrequencyChange(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                    {frequencies.map(freq => (
                        <option key={freq.value} value={freq.value}>
                            {freq.label}
                        </option>
                    ))}
                </select>
            </div>

            {(currentFrequency !== 'none' && (showAdvanced || currentFrequency === 'custom')) && (
                <div className="space-y-3 p-3 bg-gray-50 rounded-md">
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Repeat every
                            </label>
                            <div className="flex items-center space-x-2">
                                <input
                                    type="number"
                                    min="1"
                                    max="99"
                                    value={value?.interval || 1}
                                    onChange={(e) => handleRuleChange('interval', parseInt(e.target.value))}
                                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                />
                                <span className="text-sm text-gray-600">
                                    {currentFrequency === 'daily' ? 'day(s)' :
                                        currentFrequency === 'weekly' ? 'week(s)' :
                                            currentFrequency === 'monthly' ? 'month(s)' :
                                                currentFrequency === 'yearly' ? 'year(s)' : 'period(s)'}
                                </span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Ends
                            </label>
                            <select
                                value={value?.endDate ? 'date' : value?.count ? 'count' : 'never'}
                                onChange={(e) => {
                                    if (e.target.value === 'never') {
                                        handleRuleChange('endDate', null);
                                        handleRuleChange('count', null);
                                    } else if (e.target.value === 'date') {
                                        handleRuleChange('count', null);
                                        // Set default end date to 3 months from now if not set
                                        if (!value?.endDate) {
                                            const defaultEndDate = new Date();
                                            defaultEndDate.setMonth(defaultEndDate.getMonth() + 3);
                                            handleRuleChange('endDate', defaultEndDate.toISOString().split('T')[0]);
                                        }
                                    } else if (e.target.value === 'count') {
                                        handleRuleChange('endDate', null);
                                        if (!value?.count) {
                                            handleRuleChange('count', 10);
                                        }
                                    }
                                }}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="never">Never</option>
                                <option value="date">On date</option>
                                <option value="count">After</option>
                            </select>
                        </div>
                    </div>

                    {currentFrequency === 'weekly' && (
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-2">
                                Repeat on
                            </label>
                            <div className="flex space-x-1">
                                {daysOfWeek.map(day => (
                                    <button
                                        key={day.value}
                                        type="button"
                                        onClick={() => handleDayToggle(day.value)}
                                        className={`w-8 h-8 text-xs rounded-full border ${(value?.daysOfWeek || []).includes(day.value)
                                            ? 'bg-purple-600 text-white border-purple-600'
                                            : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        {day.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {value?.endDate !== null && (
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                End date
                            </label>
                            <input
                                type="date"
                                value={value?.endDate ? (typeof value.endDate === 'string' ? value.endDate : value.endDate.toISOString().split('T')[0]) : ''}
                                onChange={(e) => handleRuleChange('endDate', e.target.value ? e.target.value : null)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    )}

                    {value?.count !== null && (
                        <div>
                            <label className="block text-xs font-medium text-gray-600 mb-1">
                                Number of occurrences
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="999"
                                value={value?.count || ''}
                                onChange={(e) => handleRuleChange('count', parseInt(e.target.value) || null)}
                                className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecurrenceSelector;