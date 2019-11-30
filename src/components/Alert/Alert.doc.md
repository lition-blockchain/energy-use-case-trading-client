```jsx
<div style={{ padding: 16, background: '#48D376' }}>
    <Alert duration={0}>
        You currently do are not supplied by Nordic Energy with Energy Trading, further details are available in the “Documents”
        section
        <strong>Error in LWP with supplier</strong>. Feel free to <a href="/">contact us</a> if you have further
        questions.
    </Alert>
</div>
```

#### With custom icon

```jsx
const faRocket = require('@fortawesome/fontawesome-free-solid/faRocket');

<div style={{ padding: 16, background: '#eef2f5' }}>
    <Alert icon={faRocket} duration={0}>
        You currently do are not supplied by Nordic Energy, with further details are available in the “Documents”
        section
        <strong>Error in LWP with supplier</strong>. Feel free to <a href="/">contact us</a> if you have further
        questions.
    </Alert>
</div>;
```
