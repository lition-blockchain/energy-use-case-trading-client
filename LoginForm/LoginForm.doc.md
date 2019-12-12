#### LoginForm component:

```jsx
const wrapperStyles = {
    background: '#051a2d',
    padding: '1rem 2rem'
};
const labels = {
    usernameField: 'Username',
    passwordField: 'Password',
    forgotPasswordLink: 'Forgot your password?',
    loginButton: 'Login'
};

<div style={wrapperStyles}>
    <LoginForm
        labels={labels}
        onForgotPasswordLinkClick={() => {
            console.log('forgot password link was clicked');
        }}
        onSubmit={credentials => console.log(credentials)}
    />
</div>;

```

#### LoginForm with errors:

```jsx
const wrapperStyles = {
    background: '#051a2d',
    padding: '1rem 2rem'
};
const labels = {
    usernameField: 'Username',
    passwordField: 'Password',
    forgotPasswordLink: 'Forgot your password?',
    loginButton: 'Login'
};
const errors = {
    username: 'Enter your username.',
    password: 'Enter your password.'
};

<div style={wrapperStyles}>
    <LoginForm
        labels={labels}
        errors={errors}
        onForgotPasswordLinkClick={() => {
            console.log('forgot password link was clicked');
        }}
        onSubmit={credentials => console.log(credentials)}
    />
</div>;
```
