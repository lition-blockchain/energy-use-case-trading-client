#### ResetPasswordForm component:

```jsx
const wrapperStyles = {
    background: '#cc9900',
    padding: '1rem 2rem'
};
const labels = {
    formTitle: 'Reset password',
    passwordField: 'Enter new password',
    confirmField: 'Re-enter new password',
    sendButton: 'Confirm',
    loginLink: 'Login'
};

<div style={wrapperStyles}>
    <ResetPasswordForm
        labels={labels}
        onSubmit={password => console.log('send:', password)}
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
    formTitle: 'Reset password',
    passwordField: 'Enter new password',
    confirmField: 'Re-enter new password',
    sendButton: 'Confirm',
    loginLink: 'Login'
};
const errors = {
    password: 'Invalid password',
    confirm: 'Invalid confirm'
};

<div style={wrapperStyles}>
    <ResetPasswordForm
        labels={labels}
        errors={errors}
        onSubmit={password => console.log('send:', password)}
        onLoginLinkClick={() => console.log('login link was clicked')}
    />
</div>;
```
