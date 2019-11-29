#### TextField:

```jsx
const wrapperStyles = {
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField label="Username" required />
</div>;
```

#### Required TextField:

```jsx
const wrapperStyles = {
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField label="Username" />
</div>;
```

#### TextField Multiline:

```jsx
const wrapperStyles = {
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField label="Username" multiLine />
</div>;
```

#### Dark TextField:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField darkMode label="Username" />
</div>;
```

#### Light TextField with helper text:

```jsx
const wrapperStyles = { padding: '1rem 2rem' };

<div style={wrapperStyles}>
    <TextField
        label="Meter readings"
        helperText={
            <span>
                Number of meter: <strong style={{ color: '#cc9900' }}>1225678936</strong>
            </span>
        }
    />
</div>;
```

#### Dark TextField with helper text:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField
        darkMode
        label="Meter readings"
        helperText={
            <span>
                Number of meter: <strong style={{ color: '#cc9900' }}>1225678936</strong>
            </span>
        }
    />
</div>;
```

#### Light TextField with addon:

```jsx
const wrapperStyles = { padding: '1rem 2rem' };

<div style={wrapperStyles}>
    <TextField
        label="Meter readings"
        addon="kWh"
        helperText={
            <span>
                Number of meter: <strong style={{ color: '#cc9900' }}>1225678936</strong>
            </span>
        }
    />
</div>;
```

#### Dark TextField with addon:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField
        darkMode
        label="Meter readings"
        addon="kWh"
        helperText={
            <span>
                Number of meter: <strong style={{ color: '#cc9900' }}>1225678936</strong>
            </span>
        }
    />
</div>;
```

#### Light TextField with error:

```jsx
const wrapperStyles = { padding: '1rem 2rem' };

<div style={wrapperStyles}>
    <TextField label="Username" error="Enter your username" />
</div>;
```

#### Dark TextField with error:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};

<div style={wrapperStyles}>
    <TextField darkMode label="Username" error="Enter your username" />
</div>;
```
