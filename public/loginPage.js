"use strict"

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (responseBody) => {
        if (responseBody.error) {
            userForm.setLoginErrorMessage(responseBody.error);
        } else {
            location.reload();
        }
    });
};
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (responseBody) => {
        if(responseBody.error) {
            userForm.setRegisterErrorMessage(responseBody.error);
        } else {
            location.reload();
        }
    });
};