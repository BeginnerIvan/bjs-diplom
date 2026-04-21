
const logoutButton = new LogoutButton()
   
logoutButton.action = () => {
    ApiConnector.logout( (responseBody) => {
        if (!responseBody.error) {
            location.reload();
        } else {
            console.log("Ошибка при выходе");
        }
    })
}
ApiConnector.current((responseBody) => {
    if(!responseBody.error) {
    ProfileWidget.showProfile(responseBody.data);
    } else {
        console.error('Ошибка получения профиля:', responseBody.error);
    }
})

const ratesBoard = new RatesBoard() 

function ratesBrd() {
    ApiConnector.getStocks( (responseBody) => {
        if(!responseBody.error) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(responseBody.data);
        } else {
            responseBody.error;
        }
    })
}

ratesBrd()
setInterval(ratesBrd, 60000);
    
const moneyManager = new MoneyManager()
moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (responseBody) => {
        if (!responseBody.error) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, "Баланс пополнен!");
        } else {
            moneyManager.setMessage(false, `😥 Что-то пошло не так, проверьте данные... \n` + (responseBody.error));
        }
    })
}
moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (responseBody) => {
        if (!responseBody.error) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, "Конвертирование прошло успешно!");
        } else {
            moneyManager.setMessage(false, `😥 Что-то пошло не так, проверьте данные... \n` + (responseBody.error));
        }
    });
}

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (responseBody) => {
        if (!responseBody.error) {
            ProfileWidget.showProfile(responseBody.data);
            moneyManager.setMessage(true, "Перевод выполнен!");
        } else {
            moneyManager.setMessage(false, `😥 Что-то пошло не так, проверьте данные... \n` + (responseBody.error));
        }
    });
}

const favoritesWidget = new FavoritesWidget()
ApiConnector.getFavorites( (responseBody) => {
    if(!responseBody.error) {
        favoritesWidget.clearTable(); 
        favoritesWidget.fillTable(responseBody.data);
        moneyManager.updateUsersList(responseBody.data);   
    } else {
        favoritesWidget.setMessage(responseBody.error);
    }
})

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (responseBody) => {
        if(!responseBody.error) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
            favoritesWidget.setMessage(true, "Пользователь добавлен в избранное");
        } else {
            favoritesWidget.setMessage(false, `Упс, что то пошло не так..😥 \n` + (responseBody.error))
        }
    })
}

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (responseBody) => {
        if(!responseBody.error) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responseBody.data);
            moneyManager.updateUsersList(responseBody.data);
            favoritesWidget.setMessage(true, "Пользователь удален из избранного");
        } else {
            favoritesWidget.setMessage(false, `Упс, что то пошло не так..😥 \n` + (responseBody.error))
        }
    })
}