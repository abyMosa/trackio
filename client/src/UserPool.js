import { CognitoUserPool } from 'amazon-cognito-identity-js'

const poolData = {
    UserPoolId: 'eu-west-2_ByVMtVqgy',
    ClientId: '4o6hs3qg2mlgicpppu2kcqfpi4',
}

export default new CognitoUserPool(poolData);