// vocalendar/frontend/src/components/Integrations/IntegrationsContainer.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const IntegrationsContainer = () => {
  const [connectedServices, setConnectedServices] = useState([
    { id: 'google', name: 'Google Calendar', isConnected: true, lastSync: '2025-05-19T10:30:00' }
  ]);
  
  const availableServices = [
    { id: 'google', name: 'Google Calendar', icon: '🔄', description: 'Sync events with your Google Calendar' },
    { id: 'outlook', name: 'Microsoft Outlook', icon: '📅', description: 'Connect to your Outlook calendar' },
    { id: 'apple', name: 'Apple iCloud', icon: '☁️', description: 'Sync with your Apple Calendar' },
    { id: 'zoom', name: 'Zoom', icon: '🎥', description: 'Automatically create Zoom links for meetings' },
    { id: 'teams', name: 'Microsoft Teams', icon: '👥', description: 'Create Teams meetings directly from calendar' }
  ];
  
  const toggleConnection = (serviceId) => {
    const isCurrentlyConnected = connectedServices.some(s => s.id === serviceId);
    
    if (isCurrentlyConnected) {
      // Disconnect
      setConnectedServices(connectedServices.filter(s => s.id !== serviceId));
    } else {
      // Connect
      const serviceToAdd = availableServices.find(s => s.id === serviceId);
      if (serviceToAdd) {
        setConnectedServices([
          ...connectedServices,
          { id: serviceId, name: serviceToAdd.name, isConnected: true, lastSync: new Date().toISOString() }
        ]);
      }
    }
  };
  
  const formatLastSync = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full gap-4">
      <div className="w-full md:w-2/3">
        <div className="bg-white rounded-lg shadow-md p-4 mb-4">
          <h3 className="text-lg font-semibold mb-4 border-b pb-2">Calendar Integrations</h3>
          
          <div className="space-y-4">
            {availableServices.map(service => {
              const isConnected = connectedServices.some(s => s.id === service.id);
              const connectedService = connectedServices.find(s => s.id === service.id);
              
              return (
                <div key={service.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-2xl mr-3">{service.icon}</div>
                      <div>
                        <div className="font-medium">{service.name}</div>
                        <div className="text-sm text-gray-600">{service.description}</div>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => toggleConnection(service.id)}
                      className={`px-3 py-1 rounded-md transition-colors ${
                        isConnected 
                          ? 'bg-red-100 text-red-700 hover:bg-red-200' 
                          : 'bg-purple-600 text-white hover:bg-purple-700'
                      }`}
                    >
                      {isConnected ? 'Disconnect' : 'Connect'}
                    </button>
                  </div>
                  
                  {isConnected && connectedService && (
                    <div className="mt-3 pt-3 border-t text-sm">
                      <div className="flex justify-between items-center">
                        <div className="text-gray-600">
                          Last synced: {formatLastSync(connectedService.lastSync)}
                        </div>
                        <button className="text-purple-600 hover:text-purple-800">
                          Sync Now
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      <div className="w-full md:w-1/3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="font-semibold mb-4 border-b pb-2">Integration Settings</h3>
          
          <div className="space-y-4">
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" defaultChecked />
                <span>Auto-sync on app startup</span>
              </label>
              <p className="text-sm text-gray-600 mt-1 pl-6">
                Automatically sync all connected calendars when you open the app
              </p>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" defaultChecked />
                <span>Sync event changes immediately</span>
              </label>
              <p className="text-sm text-gray-600 mt-1 pl-6">
                Push changes immediately when you create or modify events
              </p>
            </div>
            
            <div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="form-checkbox h-4 w-4 text-purple-600" defaultChecked />
                <span>Two-way synchronization</span>
              </label>
              <p className="text-sm text-gray-600 mt-1 pl-6">
                Allow changes made in external calendars to appear in Vocalendar
              </p>
            </div>
            
            <div className="mt-6">
              <h4 className="font-medium mb-2">Sync Frequency</h4>
              <select className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400">
                <option value="5">Every 5 minutes</option>
                <option value="15">Every 15 minutes</option>
                <option value="30" selected>Every 30 minutes</option>
                <option value="60">Every hour</option>
                <option value="manual">Manual sync only</option>
              </select>
            </div>
            
            <div className="border-t pt-4 mt-4">
              <button className="w-full py-2 text-center bg-purple-600 text-white rounded-md hover:bg-purple-700">
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationsContainer;