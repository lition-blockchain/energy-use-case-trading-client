import { defineMessages } from 'react-intl';

const messages = defineMessages({
    successfulRegistration: {
        id: 'app.registrationPage.successfulRegistration',
        defaultMessage: 'Registration is succeeded.'
    },
    copyright: {
        id: 'app.registrationPage.copyright',
        defaultMessage: 'Nordic Energy. All rights reserved.'
    },
    stepsMessages: {
        1: {
            title: {
                id: 'app.registrationPage.firstStepTitle',
                defaultMessage: 'Lieferadresse'
            },
            formMessages: {
                title: {
                    id: 'app.registrationPage.deliveryAddressForm.title',
                    defaultMessage: 'Lieferadresse'
                },
                submit: {
                    id: 'app.registrationPage.deliveryAddressForm.submit',
                    defaultMessage: 'Nächster Schritt'
                },
                fields: {
                    business: {
                        id: 'app.registrationPage.fields.business',
                        defaultMessage: 'An diese Adresse liefern wir deinen Strom'
                    },
                    businessOptions: [
                        {
                            id: 'app.registrationPage.options.business.0',
                            defaultMessage: 'Privat'
                        },
                        {
                            id: 'app.registrationPage.options.business.1',
                            defaultMessage: 'Gewerbe'
                        }
                    ],
                    company: {
                        id: 'app.registrationPage.fields.company',
                        defaultMessage: 'Name der Firma'
                    },
                    legalForm: {
                        id: 'app.registrationPage.fields.legalForm',
                        defaultMessage: 'Rechtsform'
                    },
                    salutation: {
                        id: 'app.registrationPage.fields.salutation',
                        defaultMessage: 'Anrede'
                    },
                    salutationOptions: [
                        {
                            id: 'app.registrationPage.options.salutation.0',
                            defaultMessage: 'Herr'
                        },
                        {
                            id: 'app.registrationPage.options.salutation.1',
                            defaultMessage: 'Frau'
                        }
                    ],
                    firstName: {
                        id: 'app.registrationPage.fields.firstName',
                        defaultMessage: 'Vorname'
                    },
                    lastName: {
                        id: 'app.registrationPage.fields.lastName',
                        defaultMessage: 'Last name'
                    },
                    postcode: {
                        id: 'app.registrationPage.fields.postcode',
                        defaultMessage: 'Nachname'
                    },
                    city: {
                        id: 'app.registrationPage.fields.city',
                        defaultMessage: 'Ort'
                    },
                    street: {
                        id: 'app.registrationPage.fields.street',
                        defaultMessage: 'Straße'
                    },
                    streetNumber: {
                        id: 'app.registrationPage.fields.streetNumber',
                        defaultMessage: 'Hausnummer'
                    },
                    billingAlternativeAddress: {
                        id: 'app.registrationPage.fields.billingAlternativeAddress',
                        defaultMessage: 'Abweichender Rechnungsempfänger?'
                    },
                    billingAlternativeAddressOptions: [
                        {
                            id: 'app.registrationPage.options.billingAlternativeAddressOptions.0',
                            defaultMessage: 'Nein'
                        },
                        {
                            id: 'app.registrationPage.options.billingAlternativeAddressOptions.1',
                            defaultMessage: 'Ja'
                        }
                    ],
                    billingCompany: {
                        id: 'app.registrationPage.fields.billingCompany',
                        defaultMessage: 'Name der Firma'
                    },
                    billingLegalForm: {
                        id: 'app.registrationPage.fields.billingLegalForm',
                        defaultMessage: 'Rechtsform'
                    },
                    billingSalutation: {
                        id: 'app.registrationPage.fields.billingSalutation',
                        defaultMessage: 'Anrede'
                    },
                    billingFirstName: {
                        id: 'app.registrationPage.fields.billingFirstName',
                        defaultMessage: 'Vorname'
                    },
                    billingSurname: {
                        id: 'app.registrationPage.fields.billingSurname',
                        defaultMessage: 'Nachname'
                    },
                    billingZip: {
                        id: 'app.registrationPage.fields.billingZip',
                        defaultMessage: 'Postleitzahl'
                    },
                    billingCity: {
                        id: 'app.registrationPage.fields.billingCity',
                        defaultMessage: 'Ort'
                    },
                    billingStreet: {
                        id: 'app.registrationPage.fields.billingStreet',
                        defaultMessage: 'Straße'
                    },
                    billingHouseNumber: {
                        id: 'app.registrationPage.fields.billingHouseNumber',
                        defaultMessage: 'Hausnummer'
                    }
                },
                errors: {
                    companyRequired: {
                        id: 'app.registrationPage.errors.companyRequired',
                        defaultMessage: 'Enter company.'
                    },
                    legalFormRequired: {
                        id: 'app.registrationPage.errors.legalFormRequired',
                        defaultMessage: 'Enter legal form.'
                    },
                    firstNameRequired: {
                        id: 'app.registrationPage.errors.firstNameRequired',
                        defaultMessage: 'Enter first name.'
                    },
                    lastNameRequired: {
                        id: 'app.registrationPage.errors.lastNameRequired',
                        defaultMessage: 'Enter last name.'
                    },
                    postcodeRequired: {
                        id: 'app.registrationPage.errors.postcodeRequired',
                        defaultMessage: 'Enter postcode.'
                    },
                    postcodePattern: {
                        id: 'app.registrationPage.errors.postcodePattern',
                        defaultMessage: 'Use 5 or 6 numbers.'
                    },
                    cityRequired: {
                        id: 'app.registrationPage.errors.cityRequired',
                        defaultMessage: 'Enter city.'
                    },
                    streetRequired: {
                        id: 'app.registrationPage.errors.streetRequired',
                        defaultMessage: 'Enter street.'
                    },
                    streetNumberRequired: {
                        id: 'app.registrationPage.errors.streetNumberRequired',
                        defaultMessage: 'Enter street number.'
                    },
                    streetNumberPattern: {
                        id: 'app.registrationPage.errors.streetNumberPattern',
                        defaultMessage: 'You can use numbers and letter (e.g. 12a).'
                    }
                }
            }
        },
        2: {
            title: {
                id: 'app.registrationPage.secondStepTitle',
                defaultMessage: 'Lieferbeginn'
            },
            formMessages: {
                title: {
                    id: 'app.registrationPage.consumptionForm.title',
                    defaultMessage: 'Lieferbeginn'
                },
                submit: {
                    id: 'app.registrationPage.consumptionForm.submit',
                    defaultMessage: 'Nächster Schritt'
                },
                cancel: {
                    id: 'app.registrationPage.consumptionForm.cancel',
                    defaultMessage: 'Vorheriger Schritt'
                },
                fields: {
                    usage: {
                        id: 'app.registrationPage.fields.usage',
                        defaultMessage: 'Jahresverbrauch'
                    },
                    usageHelp: {
                        id: 'app.registrationPage.helps.usage',
                        defaultMessage:
                            'Dies ist der Wert den Du eben bei der Preisberechnung eingegeben hast. Wenn Du ihn jetzt änderst, verändert sich auch dein Preis.'
                    },
                    customerSpecification: {
                        id: 'app.registrationPage.fields.customerSpecification',
                        defaultMessage: 'AUmzug oder Lieferantenwechsel'
                    },
                    customerSpecificationOptions: [
                        {
                            id: 'app.registrationPage.options.customerSpecification.0',
                            defaultMessage: 'Wechsel zu Nordic Energy'
                        },
                        {
                            id: 'app.registrationPage.options.customerSpecification.1',
                            defaultMessage: 'Umzug'
                        }
                    ],
                    counterNumber: {
                        id: 'app.registrationPage.fields.counterNumber',
                        defaultMessage: 'Zählernummer'
                    },
                    counterNumberHelp: {
                        id: 'app.registrationPage.helps.counterNumber',
                        defaultMessage: 'Die Zählernummer brauchen wir zur Ummeldung deines Stromanschlusses.'
                    },
                    relocationDate: {
                        id: 'app.registrationPage.fields.relocationDate',
                        defaultMessage: 'Datum des Einzuges'
                    },
                    relocationDateHelp: {
                        id: 'app.registrationPage.helps.relocationDate',
                        defaultMessage: 'An welchem Tag ist bzw. war der Ein/Umzug?'
                    }
                },
                errors: {
                    usageRequired: {
                        id: 'app.registrationPage.errors.usageRequired',
                        defaultMessage: 'Enter usage.'
                    },
                    usageNumber: {
                        id: 'app.registrationPage.errors.usageNumber',
                        defaultMessage: 'Usage should be greater than 1000 and less than 100000.'
                    },
                    counterNumberRequired: {
                        id: 'app.registrationPage.errors.counterNumberRequired',
                        defaultMessage: 'Enter counter number.'
                    },
                    counterNumberPattern: {
                        id: 'app.registrationPage.errors.counterNumberPattern',
                        defaultMessage: 'Invalid counter number.'
                    },
                    relocationDateRequired: {
                        id: 'app.registrationPage.errors.relocationDateRequired',
                        defaultMessage: 'Enter relocation date.'
                    }
                }
            }
        },
        3: {
            title: {
                id: 'app.registrationPage.thirdStepTitle',
                defaultMessage: 'Weitere Angaben'
            },
            formMessages: {
                title: {
                    id: 'app.registrationPage.personalInformationForm.title',
                    defaultMessage: 'Weitere Angaben'
                },
                subTitle: {
                    id: 'app.registrationPage.personalInformationForm.subTitle',
                    defaultMessage: 'Persönliche Daten'
                },
                submit: {
                    id: 'app.registrationPage.personalInformationForm.submit',
                    defaultMessage: 'Nächster Schritt'
                },
                cancel: {
                    id: 'app.registrationPage.personalInformationForm.cancel',
                    defaultMessage: 'Vorheriger Schritt'
                },
                fields: {
                    email: {
                        id: 'app.registrationPage.fields.email',
                        defaultMessage: 'Email'
                    },
                    birthday: {
                        id: 'app.registrationPage.fields.birthday',
                        defaultMessage: 'Geburtsdatum'
                    },
                    birthdayHelperText: {
                        id: 'app.registrationPage.fields.birthdayHelperText',
                        defaultMessage: 'Format bearbeiten dd.mm.yyyy'
                    },
                    phoneAreaCode: {
                        id: 'app.registrationPage.fields.phoneAreaCode',
                        defaultMessage: 'Vorwahl'
                    },
                    phone: {
                        id: 'app.registrationPage.fields.phone',
                        defaultMessage: 'Telefonnummer'
                    }
                },
                errors: {
                    emailRequired: {
                        id: 'app.registrationPage.errors.emailRequired',
                        defaultMessage: 'Enter email address.'
                    },
                    emailType: {
                        id: 'app.registrationPage.errors.emailType',
                        defaultMessage: 'Email address is invalid.'
                    },
                    birthdayRequired: {
                        id: 'app.registrationPage.errors.birthdayRequired',
                        defaultMessage: 'Enter date of birth.'
                    },
                    phoneAreaCodePattern: {
                        id: 'app.registrationPage.errors.phoneAreaCodePattern',
                        defaultMessage: 'Phone code is invalid.'
                    },
                    phoneAreaCodeValidator: {
                        id: 'app.registrationPage.errors.phoneAreaCodeValidator',
                        defaultMessage: 'Enter phone code.'
                    },
                    phonePattern: {
                        id: 'app.registrationPage.errors.phonePattern',
                        defaultMessage: 'Phone is invalid.'
                    },
                    phoneValidator: {
                        id: 'app.registrationPage.errors.phoneValidator',
                        defaultMessage: 'Enter phone.'
                    }
                }
            }
        },
        4: {
            title: {
                id: 'app.registrationPage.fourthStepTitle',
                defaultMessage: 'Zahlweise / Bankdaten'
            },
            formMessages: {
                title: {
                    id: 'app.registrationPage.paymentInformationForm.title',
                    defaultMessage: 'Zahlweise / Bankdaten'
                },
                subTitle: {
                    id: 'app.registrationPage.paymentInformationForm.subTitle',
                    defaultMessage: 'Gewünschte Zahlungsweise'
                },
                submit: {
                    id: 'app.registrationPage.paymentInformationForm.submit',
                    defaultMessage: 'Nächster Schritt'
                },
                cancel: {
                    id: 'app.registrationPage.paymentInformationForm.cancel',
                    defaultMessage: 'Vorheriger Schritt'
                },
                fields: {
                    paymentMethod: {
                        id: 'app.registrationPage.fields.paymentMethod',
                        defaultMessage: 'Zahlweise'
                    },
                    paymentMethodOptions: [
                        {
                            id: 'app.registrationPage.options.paymentMethod.0',
                            defaultMessage: 'Lastschrift'
                        },
                        {
                            id: 'app.registrationPage.options.paymentMethod.1',
                            defaultMessage: 'Überweisung'
                        }
                    ],
                    iban: {
                        id: 'app.registrationPage.fields.iban',
                        defaultMessage: 'IBAN'
                    },
                    ibanHelp: {
                        id: 'app.registrationPage.helps.iban',
                        defaultMessage: 'Unsere Gläubiger ID ist DE29ZZZ00002101922.'
                    },
                    alternativeAccountHolder: {
                        id: 'app.registrationPage.fields.alternativeAccountHolder',
                        defaultMessage: 'Name des Kontoinhabers'
                    },
                    sepaApproval: {
                        id: 'app.registrationPage.fields.sepaApproval',
                        defaultMessage: 'Erteilung SEPA-Mandat'
                    },
                    sepaApprovalOption: {
                        id: 'app.registrationPage.options.sepaApproval.0',
                        defaultMessage: 'Zustimmung'
                    },
                    sepaApprovalHelp: {
                        id: 'app.registrationPage.helps.sepaApproval',
                        defaultMessage:
                            'Der genannte Kontoinhaber ermächtigt die Nordic Energy. Ltd Zahlungen von seinem Konto mittels Lastschrift einzuziehen. Zugleich weist der genannte Kontoinhaber sein Kreditinstitut an, die von dem Lieferanten auf sein Konto gezogenen Lastschriften einzulösen. Hinweis: Innerhalb von acht Wochen, beginnend mit dem Belastungs-datum, kann die Erstattung des belasteten Betrages zurückverlangt werden. Es gelten dabei die mit dem Kreditinstitut vereinbarten Bedingungen.'
                    }
                },
                errors: {
                    ibanRequired: {
                        id: 'app.registrationPage.errors.ibanRequired',
                        defaultMessage: 'Enter IBAN.'
                    },
                    ibanValidator: {
                        id: 'app.registrationPage.errors.ibanValidator',
                        defaultMessage: 'IBAN is invalid.'
                    },
                    sepaApprovalValidator: {
                        id: 'app.registrationPage.errors.sepaApprovalValidator',
                        defaultMessage: 'Please accept the SEPA terms.'
                    }
                }
            }
        },
        5: {
            title: {
                id: 'app.registrationPage.fifthStepTitle',
                defaultMessage: 'Dein Kundenkonto'
            },
            formMessages: {
                title: {
                    id: 'app.registrationPage.authInformationForm.title',
                    defaultMessage: 'Dein Kundenkonto'
                },
                submit: {
                    id: 'app.registrationPage.authInformationForm.submit',
                    defaultMessage: 'Nächster Schritt'
                },
                cancel: {
                    id: 'app.registrationPage.authInformationForm.cancel',
                    defaultMessage: 'Vorheriger Schritt'
                },
                fields: {
                    username: {
                        id: 'app.registrationPage.fields.username',
                        defaultMessage: 'Kundenlogin'
                    },
                    password: {
                        id: 'app.registrationPage.fields.password',
                        defaultMessage: 'Passwort'
                    },
                    passwordConfirmation: {
                        id: 'app.registrationPage.fields.passwordConfirmation',
                        defaultMessage: 'Passwortbestätigung'
                    }
                },
                errors: {
                    passwordRequired: {
                        id: 'app.registrationPage.fields.passwordRequired',
                        defaultMessage: 'Enter password.'
                    },
                    passwordMinLength: {
                        id: 'app.registrationPage.fields.passwordMinLength',
                        defaultMessage: 'Use 8 characters or more.'
                    },
                    passwordLetterPattern: {
                        id: 'app.registrationPage.fields.passwordLetterPattern',
                        defaultMessage: 'Use 1 letter or more.'
                    },
                    passwordDigitPattern: {
                        id: 'app.registrationPage.fields.passwordDigitPattern',
                        defaultMessage: 'Use 1 number or more.'
                    },
                    passwordConfirmationRequired: {
                        id: 'app.registrationPage.fields.passwordConfirmationRequired',
                        defaultMessage: 'Enter password again.'
                    },
                    passwordConfirmationValidator: {
                        id: 'app.registrationPage.fields.passwordConfirmationValidator',
                        defaultMessage: 'Passwords should match.'
                    }
                }
            }
        },
        6: {
            title: {
                id: 'app.registrationPage.sixthStepTitle',
                defaultMessage: 'Abschluss'
            },
            formMessages: {
                title: {
                    id: 'app.registrationPage.termsAndConditionsForm.title',
                    defaultMessage: 'Abschluss'
                },
                submit: {
                    id: 'app.registrationPage.termsAndConditionsForm.submit',
                    defaultMessage: 'Kunde werden'
                },
                cancel: {
                    id: 'app.registrationPage.termsAndConditionsForm.cancel',
                    defaultMessage: 'Vorheriger Schritt'
                },
                fields: {
                    message: {
                        id: 'app.registrationPage.fields.message',
                        defaultMessage: 'Nachricht an uns'
                    },
                    agbApproval: {
                        id: 'app.registrationPage.fields.agbApproval',
                        defaultMessage:
                            'Mit <a href="https://www.nordicenergy.co/wp-content/uploads/2019/11/Nordic_Energy-AGB-v2c.pdf" rel="noopener noreferrer" target="_blank">AGBs</a>, <a href="https://www.nordicenergy.co/wp-content/uploads/2019/11/Widerrufsformular.pdf" rel="noopener noreferrer" target="_blank">Widerruf</a> und <a href="https://www.nordicenergy.co/privacy-policy" rel="noopener noreferrer" target="_blank">Datenschutzerklärung</a> einverstanden?'
                    },
                    enableNotifications: {
                        id: 'app.registrationPage.fields.enableNotifications',
                        defaultMessage:
                            'Dürfen wir Dich über die neuen Entwicklungen und Produkte unserer Firma per E-Mail, per Telefon oder per Post, informieren?'
                    }
                },
                errors: {
                    agbApprovalValidator: {
                        id: 'app.registrationPage.errors.agbApprovalValidator',
                        defaultMessage: 'Please accept the terms.'
                    },
                    googleReCaptchaResponse: {
                        id: 'app.registrationPage.errors.googleReCaptchaResponse',
                        defaultMessage: 'Solve the CAPTCHA.'
                    }
                }
            }
        }
    }
});

export default messages;
