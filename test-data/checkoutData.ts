export const checkoutData = [
    {
        firstName: 'Tayyaba',
        lastName: 'QA',
        postalCode: '54000',
        expectedResult: 'success'
    },
    {
        firstName: '',
        lastName: 'QA',
        postalCode: '54000',
        expectedResult: 'error'
    },
    {
        firstName: 'Tayyaba',
        lastName: '',
        postalCode: '54000',
        expectedResult: 'error'
    },
    {
        firstName: 'Tayyaba',
        lastName: 'QA',
        postalCode: '',
        expectedResult: 'error'
    }
];