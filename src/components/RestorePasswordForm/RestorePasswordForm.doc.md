#### RestorePasswordForm component:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};
const labels = {
    formTitle: 'Restore password',
    emailField: 'Enter Your Email',
    sendButton: 'Send',
    loginLink: 'Login'
};

<div style={wrapperStyles}>
    <RestorePasswordForm
        labels={labels}
        onSubmit={email => console.log('send:', email)}
        onLoginLinkClick={() => console.log('login link was clicked')}
    />
</div>;
```

#### RestorePasswordForm with errors:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};
const labels = {
    formTitle: 'Restore password',
    emailField: 'Enter Your Email',
    sendButton: 'Send',
    loginLink: 'Login'
};
const errors = {
    email: 'Invalid email.'
};

<div style={wrapperStyles}>
    <RestorePasswordForm
        labels={labels}
        errors={errors}
        onSubmit={email => console.log('send:', email)}
        onLoginLinkClick={() => console.log('login link was clicked')}
    />
</div>;
```
