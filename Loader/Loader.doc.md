#### Loader component

```jsx
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false
        };
    }

    componentDidMount() {
        document.addEventListener('keydown', this.handleEscPress.bind(this));
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleEscPress.bind(this));
    }

    handleEscPress(event) {
        if (event.keyCode === 27) {
            this.setState({ showLoader: false });
        }
    }

    showLoader() {
        this.setState({ showLoader: true });
    }

    render() {
        const { showLoader } = this.state;
        return (
            <div>
                <button onClick={() => this.showLoader()}>Show loader</button>
                <p>
                    Press <code>ESC</code> to hide loader
                </p>
                <Loader show={showLoader} />
            </div>
        );
    }
}

<Demo />;
```

#### Loader component

```jsx
<Loader show={true} fullScreen={false} />
```
