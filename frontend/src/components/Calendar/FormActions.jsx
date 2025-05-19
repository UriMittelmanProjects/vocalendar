// vocalendar/frontend/src/components/Calendar/FormActions.jsx
import React from 'react';
import Button from '../common/Button';

const FormActions = ({ onCancel, submitLabel = 'Save' }) => {
  return (
    <div className="flex justify-end space-x-3">
      <Button
        type="button"
        variant="secondary"
        onClick={onCancel}
      >
        Cancel
      </Button>
      <Button
        type="submit"
        variant="primary"
      >
        {submitLabel}
      </Button>
    </div>
  );
};

export default FormActions;