```jsx
const profile = {
    email: 'info@nordicenergy.io',
    firstName: 'Arthur',
    lastName: 'Curry',
    country: 'Germany',
    postcode: '10115',
    city: 'Berlin',
    street: 'justice-league',
    streetNumber: '5',
    birthday: 1535587200,
    contract: {
        IBAN:'DE89370400440532013000',
        paymentMethod: 'debit',
        id: '1000087',
        startDate: 339984000,
        endDate: 339984000,
        firstName: 'Max',
        lastName: 'Mustermann',
        street: 'Treskowstr.',
        houseNumber: '10',
        postcode: '13089',
        city: 'Berlin'
    }
};
<ProfileForm profile={profile} onSubmit={formData => console.log(formData)} />;
```
