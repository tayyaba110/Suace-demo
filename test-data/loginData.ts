export const loginData = [
    {
        username: 'standard_user',
        password: 'secret_sauce',
        expectedResult: 'success'
    },
    {
        username: 'locked_out_user',
        password: 'secret_sauce',
        expectedResult: 'locked'
    },
    {
        username: 'wrong_user',
        password: 'secret_sauce',
        expectedResult: 'error'
    },
    {
        username: 'standard_user',
        password: 'wrong_password',
        expectedResult: 'error'
    }
];