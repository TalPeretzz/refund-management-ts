import React, { useState } from 'react';
import RequestCard from './RequestCard';
import { Request } from '../../types/Request';
import { getHistoryRequests } from '../../services/requestService';

const HistoryTab: React.FC = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [requests, setRequests] = useState<Request[]>([]);
  const [errorMessage, setErrorMessage] = useState('');

  const validateDates = () => {
    if (startDate && endDate) {
      if (new Date(startDate) > new Date(endDate)) {
        setErrorMessage('Start Date cannot be later than End Date.');
        return false;
      } else {
        setErrorMessage('');
        return true;
      }
    }
    return true;
  };

  const handleSearch = async () => {
    if (validateDates() && startDate && endDate) {
      try {
        const data = await getHistoryRequests(startDate, endDate);
        setRequests(data);
        setErrorMessage(''); // Clear error messages
      } catch (error) {
        setErrorMessage('Failed to fetch history. Please try again later.');
      }
    } else {
      setErrorMessage('Please select both Start Date and End Date.');
    }
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    if (endDate && new Date(selectedDate) > new Date(endDate)) {
      setErrorMessage('Start Date cannot be later than End Date.');
    } else {
      setErrorMessage('');
    }
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);
    if (startDate && new Date(startDate) > new Date(selectedDate)) {
      setErrorMessage('End Date cannot be earlier than Start Date.');
    } else {
      setErrorMessage('');
    }
  };

  return (
    <div className="history-tab">
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            max={endDate || ''}
          />
        </label>
        <label>
          End Date:
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            min={startDate || ''}
          />
        </label>
        <button
          onClick={handleSearch}
          style={{
            marginLeft: '1rem',
            padding: '0.75rem 1.5rem',
            fontSize: '1rem',
            fontWeight: 'bold',
          }}
        >
          Search
        </button>
      </div>
      {errorMessage && (
        <p style={{ color: 'red', fontWeight: 'bold', fontSize: '1rem' }}>
          {errorMessage}
        </p>
      )}
      <div className="request-list">
        {requests.length === 0 && !errorMessage ? (
          <p>No historical requests for the selected time frame.</p>
        ) : (
          requests.map((request) => (
            <RequestCard key={request.id} request={request} />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryTab;
