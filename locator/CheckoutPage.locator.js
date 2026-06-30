const CHECKOUT_LOCATORS = {
  selectors: {
    firstNameInput: { type: 'id', value: 'first-name' },
    lastNameInput: { type: 'id', value: 'last-name' },
    postalCodeInput: { type: 'id', value: 'postal-code' },
    continueButton: { type: 'id', value: 'continue' },
    finishButton: { type: 'id', value: 'finish' },
    completeHeader: { type: 'css', value: '.complete-header' },
  },
};

module.exports = CHECKOUT_LOCATORS;
