Example with data:
```jsx
const props = {
    title: 'History',
    noDataMessage: 'message',
    data: [
        {
            date: 1521911833,
            value: 9950.30
        },
        {
            date: '2018-10-22',
            value: 96.707
        },
        {
            date: '2018-09-30',
            value: 23   
        },
        {
            date: 1724911833,
            value: 0
        },
        {
            date: '',
            value: null
        },
        {
            date: undefined,
            value: undefined
        },
        {
            date: undefined,
            value: 'string'
        }
    ]
};

<div style={{ backgroundColor: 'white', padding: '10px', 'maxWidth': '356px' }}>
    <MeterReadingsHistory {...props} />
</div>;
```

Example without data:
```jsx
const props = {
    title: 'History',
    consumptionUnitLabel: 'kWh',
    noDataMessage: 'Sorry, not live metering data available for you…',
    data: []
};
<div style={{ backgroundColor: 'white', padding: '10px', 'maxWidth': '356px' }}>
    <MeterReadingsHistory {...props} />
</div>;
```

Example (extended, with pagination):
```jsx
const props = {
    title: 'History',
    noDataMessage: 'message',
    loading: true,
    data: [
        {
            date: 1521911833,
            value: 9950.3
        },
        {
            date: '2018-10-22',
            value: 9600.7
        },
        {
            date: '2018-09-30',
            value: 9600.6   
        },
        {
            date: 1724911833,
            value: 0
        },
        {
            date: '',
            value: null
        },
        {
            date: undefined,
            value: undefined
        }
    ]
};

<div style={{ backgroundColor: 'white', padding: '10px', 'maxWidth': '356px' }}>
    <MeterReadingsHistory {...props} />
</div>;
```
```
