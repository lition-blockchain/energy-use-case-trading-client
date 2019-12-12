Example without errors:
```jsx
const labels = {
    meterReadingsField: 'Meter readings',
    dateField: 'Date of reading',
    commentField: 'Comment',
    submitButton: 'Submit',
    meterNumberTitle: 'Number of meter',
    incorrectMeterNumber: 'Number of meter is still not defined.'
};

const props = {
    labels: labels,
    onSubmit: () => {},
    numberOfMeter: 1234,
    locale: 'en',
    isSuccessfullySubmitted: false,
    errors: {}
};

<MeterReadingForm {...props} />
```

Example with errors:
```jsx
const labels = {
    meterReadingsField: 'Meter readings',
    dateField: 'Date of reading',
    commentField: 'Comment',
    submitButton: 'Submit',
    meterNumberTitle: 'Number of meter',
    incorrectMeterNumber: 'Number of meter is still not defined.'
};

const props = {
    labels: labels,
    onSubmit: () => {},
    numberOfMeter: 1234,
    locale: 'en',
    isSuccessfullySubmitted: false,
    errors: {
        meterReadings: 'Meter readings is not a number',
        comment: 'Comment is not a string',
        date: 'Date is required'
    }
};

<MeterReadingForm {...props} />
```

Example with incorrect meter number:
```jsx
const labels = {
    meterReadingsField: 'Meter readings',
    dateField: 'Date of reading',
    commentField: 'Comment',
    submitButton: 'Submit',
    meterNumberTitle: 'Number of meter',
    incorrectMeterNumber: 'Number of meter is still not defined.'
};

const props = {
    labels: labels,
    onSubmit: () => {},
    numberOfMeter: null,
    locale: 'en',
    isSuccessfullySubmitted: false,
    errors: {}
};

<MeterReadingForm {...props} />
```
