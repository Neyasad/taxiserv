// Плавный скролл ссылок в head
const navLinks = document.querySelectorAll('head .nav-links a');
const head = document.querySelector('head'); 

const smoothScroll = (element) => {
    element.addEventListener('click', e => {
      const href = element.getAttribute('href');
  
      // Проверяем, является ли ссылка якорной (начинается с #)
      if (href.startsWith('#')) {
        e.preventDefault();
  
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
  
        if (targetSection) {
          // Вычисление высоты head
          const headHeight = head.offsetHeight;
  
          // Прокрутка с учётом высоты head
          const targetPosition = targetSection.offsetTop - headHeight;
  
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      }
      // Для ссылок на другие страницы (например, support.html), ничего не предотвращаем
    });
  };

// Для ссылок в меню
navLinks.forEach(link => smoothScroll(link));

document.querySelectorAll('.question').forEach((question) => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        if (answer) {
            answer.classList.toggle('visible');
        }
    });
});

// Для кнопок с классом .btn
const btn = document.querySelectorAll('.btn');
btn.forEach(link => smoothScroll(link));
  
const form = document.getElementById('auth-form');
const toggleForm = document.getElementById('toggle-form');
const formTitle = document.getElementById('form-title');
const submitButton = document.getElementById('submit-button');
  
let isLogin = false; // Флаг для переключения между регистрацией и авторизацией

document.addEventListener('DOMContentLoaded', () => {
toggleForm.addEventListener('click', () => {
    isLogin = !isLogin;
    if (isLogin) {
        formTitle.textContent = 'Авторизация';
        submitButton.textContent = 'Войти';
        toggleForm.textContent = 'Нет аккаунта? Зарегистрироваться';
    } else {
        formTitle.textContent = 'Регистрация';
        submitButton.textContent = 'Зарегистрироваться';
        toggleForm.textContent = 'Уже есть аккаунт? Войти';
        }
    }
)
});

document.addEventListener('DOMContentLoaded', () => {
form.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (isLogin) {
        // Логика авторизации
        const storedPassword = localStorage.getItem(username);

        if (storedPassword && storedPassword === password) {
            alert('Вы успешно вошли в систему!');
            localStorage.setItem('loggedInUser', username); // Сохраняем авторизованного пользователя
            window.location.href = 'index.html';
        } else {
            alert('Неверное имя пользователя или пароль.');
        }
        } else {
            // Логика регистрации
            if (localStorage.getItem(username)) {
                alert('Имя пользователя уже занято.');
            } else {
                localStorage.setItem(username, password);
                alert('Регистрация успешна! Теперь вы можете войти.');
                toggleForm.click(); // Переключиться на форму авторизации
            }
        }
     
        form.reset();
    }
)
});

function checkAuto(){
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (!loggedInUser) {
        alert("Для того чтобы продолжить вам необходимо авторизоваться");
        window.location.href = 'registration.html'; // Перенаправляем авторизованного пользователя на страницу авторизации
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const authButton = document.getElementById('auth-action');
    const loggedInUser = localStorage.getItem('loggedInUser');
    
    if (loggedInUser) {
        authButton.textContent = 'Выйти из аккаунта';
        authButton.addEventListener('click', () => {
            localStorage.removeItem('loggedInUser'); // Удаляем данные о пользователе
            alert('Вы вышли из аккаунта.');
            window.location.reload(); // Обновляем страницу
        });
    } else {
        authButton.textContent = 'Авторизация';
        authButton.addEventListener('click', () => {
            window.location.href = 'auth.html'; // Переход на страницу авторизации
        });
    }
});

const reviewList = document.getElementById('review-list');
const scrollRight = document.getElementById('scroll-right');
const scrollLeft = document.getElementById('scroll-left');

// Ширина для прокрутки одного элемента
const scrollAmount = reviewList.clientWidth;

scrollRight.addEventListener('click', () => {
    reviewList.scrollBy({ left: scrollAmount, behavior: 'smooth' });
});

scrollLeft.addEventListener('click', () => {
    reviewList.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
});

document.addEventListener('DOMContentLoaded', () => {
    const submitButton = document.getElementById('submit-review');
    const reviewList = document.getElementById('review-list');
    const textArea = document.getElementById('text-area');
    const username = localStorage.getItem('loggedInUser');

    // Функция для получения выбранной оценки
    function getSelectedRating() {
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        for (const input of ratingInputs) {
            if (input.checked) {
                return input.value;
            }
        }
        return null;
    }

    // Добавление нового отзыва
    submitButton.addEventListener('click', () => {
        const rating = getSelectedRating();
        const text = textArea.value.trim();
        const currentDate = new Date();

        if (!rating || !text) {
            alert('Пожалуйста, заполните все поля.');
            return;
        }

        // Форматируем дату
        const formattedDate = currentDate.toLocaleString('ru-RU', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        });

        // Создаем новый отзыв
        const newReview = document.createElement('div');
        newReview.classList.add('review');
        newReview.innerHTML = `
            <div class="review-content">
                <p class="review-text">${text}</p>
                <div class="review-author">
                    <h3>${username}</h3>
                </div>
                <div class="review-stars">
                    ${'★'.repeat(rating)}${'☆'.repeat(5 - rating)}
                </div>
                <div class="time">${formattedDate}</div>
            </div>
        `;

        // Добавляем новый отзыв в список
        reviewList.prepend(newReview);

        // Очищаем форму
        textArea.value = '';
        const ratingInputs = document.querySelectorAll('input[name="rating"]');
        ratingInputs.forEach((input) => (input.checked = false));
    });
});

function checkEmail() {
    var email = document.getElementById("order-email").value;
    var regex = /.+@.+\..+/i;

    if (regex.test(email)) {
        document.getElementById("email").style.color = "yellow";
        document.getElementById("email").innerHTML = "Input correct";
        return true;
    }
    else {
        document.getElementById("email").style.color = "pink";
        document.getElementById("email").innerHTML = "Пожалуйста, введите верное значение";
        return false;
    }
}

function checkPhone() {
    var phone = document.getElementById("phone").value;
    var regex = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;

    if (regex.test(phone)) {
        document.getElementById("phone_Check").style.color = "yellow";
        document.getElementById("phone_Check").innerHTML = "Input correct";
        return true;
    }
    else {
        document.getElementById("phone_Check").style.color = "pink";
        document.getElementById("phone_Check").innerHTML = "Пожалуйста, введите верное значение";
        return false;
    }
}

function checkAddr1() {
    var addr1 = document.getElementById("pickup-address").value;
    var regex = /^([a-zA-Zа-яА-Я\s].{2,50}),([a-zA-Zа-яА-Я\s].{2,50})$/;

    if (regex.test(addr1)) {
        document.getElementById("address_Check1").style.color = "yellow";
        document.getElementById("address_Check1").innerHTML = "Input correct";
        return true;
    }
    else {
        document.getElementById("address_Check1").style.color = "pink";
        document.getElementById("address_Check1").innerHTML = "Пожалуйста, введите верные данные";
        return false;
    }
}

function checkAddr2() {
    var addr2 = document.getElementById("delivery-address").value;
    var regex = /^([a-zA-Zа-яА-Я\s].{2,50}),([a-zA-Zа-яА-Я\s].{2,50})$/;

    if (regex.test(addr2)) {
        document.getElementById("address_Check2").style.color = "yellow";
        document.getElementById("address_Check2").innerHTML = "Input correct";
        return true;
    }
    else {
        document.getElementById("address_Check2").style.color = "pink";
        document.getElementById("address_Check2").innerHTML = "Пожалуйста, введите верные данные";
        return false;
    }
}

document.getElementById("payment").addEventListener("click", function () {
    // Получаем значения всех полей
    const email = document.getElementById("order-email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const pickupAddress = document.getElementById("pickup-address").value.trim();
    const deliveryAddress = document.getElementById("delivery-address").value.trim();
    const taxiClass = document.getElementById("taxi-class").value;

    // Проверяем, что все поля заполнены
    if (email && phone && pickupAddress && deliveryAddress && taxiClass !== "Выберите класс") {
        // Если все поля заполнены
        alert("Ваш заказ успешно оплачен! Водитель приедет в ближайшее время.");
    } else {
        // Если есть незаполненные поля
        alert("Пожалуйста, заполните все поля перед оплатой.");

        // Подсвечиваем незаполненные поля
        const fields = [
            { field: document.getElementById("order-email"), value: email },
            { field: document.getElementById("phone"), value: phone },
            { field: document.getElementById("pickup-address"), value: pickupAddress },
            { field: document.getElementById("delivery-address"), value: deliveryAddress },
            { field: document.getElementById("taxi-class"), value: taxiClass !== "Выберите класс" ? taxiClass : "" }
        ];

        fields.forEach(({ field, value }) => {
            if (!value) {
                field.style.border = "2px solid red";
            } else {
                field.style.border = ""; // Убираем подсветку, если поле заполнено
            }
        });
    }
});


ymaps.ready(function () {
    var myMap = new ymaps.Map('map', {
        center: [56.8519, 60.6122],
        zoom: 10,
        controls: []
    });

    document.getElementById('calculate-route').addEventListener('click', function () {
        var pickupAddress = document.getElementById('pickup-address').value.trim();
        var deliveryAddress = `г. Екатеринбург` + document.getElementById('delivery-address').value.trim();
        var distanceOutput = document.getElementById('distance-output');
        var priceOutput = document.getElementById('price-output');
        var taxiClass = document.getElementById('taxi-class').value;

        if (!pickupAddress || !deliveryAddress) {
            alert('Введите оба адреса!');
            return;
        }

        myMap.geoObjects.removeAll(); // Очищаем карту
        distanceOutput.textContent = 'Рассчёт маршрута...';

        ymaps.geocode(pickupAddress).then(function (pickupRes) {
            var pickupGeoObject = pickupRes.geoObjects.get(0);
            if (!pickupGeoObject) {
                distanceOutput.textContent = 'Адрес отправления не найден.';
                return;
            }
            var pickupCoords = pickupGeoObject.geometry.getCoordinates();

            ymaps.geocode(deliveryAddress).then(function (deliveryRes) {
                var deliveryGeoObject = deliveryRes.geoObjects.get(0);
                if (!deliveryGeoObject) {
                    distanceOutput.textContent = 'Адрес доставки не найден.';
                    return;
                }
                var deliveryCoords = deliveryGeoObject.geometry.getCoordinates();

                // Строим маршрут
                ymaps.route([pickupCoords, deliveryCoords]).then(function (route) {
                    myMap.geoObjects.add(route);

                    // Устанавливаем границы карты по маршруту
                    var bounds = route.getPaths().getBounds();
                    if (bounds) {
                        myMap.setBounds(bounds, { checkZoomRange: true });
                    }

                    // Получаем расстояние из маршрута
                    var distance = route.getLength(); // Возвращает расстояние в метрах
                    distanceOutput.textContent = `Расстояние: ${(distance / 1000).toFixed(2)} км`;

                    switch (taxiClass) {
                        case "Эконом":
                            priceOutput.textContent = `Цена: ${(distance * 34 / 1000).toFixed(2)} рублей`;
                            break;
                        case "Комфорт":
                            priceOutput.textContent = `Цена: ${(distance * 46 / 1000).toFixed(2)} рублей`;
                            break;
                        case "Бизнес":
                            priceOutput.textContent = `Цена: ${(distance * 138 / 1000).toFixed(2)} рублей`;
                            break;
                        case "Экспресс":
                            priceOutput.textContent = `Цена: ${(distance * 28.3 / 1000).toFixed(2)} рублей`;
                            break;
                    }
                }).catch(function (error) {
                    distanceOutput.textContent = 'Ошибка при построении маршрута.';
                    console.error('Ошибка маршрута:', error);
                });
            }).catch(function (error) {
                distanceOutput.textContent = 'Ошибка при обработке адреса доставки.';
                console.error('Ошибка геокодирования доставки:', error);
            });
        }).catch(function (error) {
            distanceOutput.textContent = 'Ошибка при обработке адреса отправления.';
            console.error('Ошибка геокодирования отправления:', error);
        });
        
    });
});











