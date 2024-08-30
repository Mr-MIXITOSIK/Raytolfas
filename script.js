document.addEventListener('DOMContentLoaded', () => {
    const calculateTimeButton = document.getElementById('calculate-time');
    const calculateDateButton = document.getElementById('calculate-date');
    const generatePasswordButton = document.getElementById('generate-password');
    const calculateBmiButton = document.getElementById('calculate-bmi');
    const calculateTaxButton = document.getElementById('calculate-tax');
    const calculatePercentButton = document.getElementById('calculate-percent');
    const convertUnitsButton = document.getElementById('convert-units');
    
    // Время
    calculateTimeButton.addEventListener('click', () => {
        const time1 = document.getElementById('time1').value;
        const time2 = document.getElementById('time2').value;

        if (time1 && time2) {
            const [hours1, minutes1] = time1.split(':').map(Number);
            const [hours2, minutes2] = time2.split(':').map(Number);

            const date1 = new Date();
            const date2 = new Date();
            date1.setHours(hours1, minutes1);
            date2.setHours(hours2, minutes2);

            const diff = Math.abs(date2 - date1);
            const hoursDiff = Math.floor(diff / (1000 * 60 * 60));
            const minutesDiff = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            
            document.getElementById('time-difference').textContent = `Разница: ${hoursDiff} ч ${minutesDiff} мин`;
        }
    });

    // Даты
    calculateDateButton.addEventListener('click', () => {
        const date1 = new Date(document.getElementById('date1').value);
        const date2 = new Date(document.getElementById('date2').value);

        if (date1 && date2) {
            const diff = Math.abs(date2 - date1);
            const daysDiff = Math.floor(diff / (1000 * 60 * 60 * 24));

            document.getElementById('date-difference').textContent = `Разница: ${daysDiff} дней`;
        }
    });

    // Пароли
    generatePasswordButton.addEventListener('click', () => {
        const length = parseInt(document.getElementById('password-length').value, 10);
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?';
        let password = '';

        for (let i = 0; i < length; i++) {
            password += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        document.getElementById('generated-password').textContent = `Сгенерированный пароль: ${password}`;
    });

    // ИМТ
    calculateBmiButton.addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);

        if (weight > 0 && height > 0) {
            const bmi = weight / (height * height);
            let category = '';

            if (bmi < 18.5) category = 'Недостаточный вес';
            else if (bmi < 25) category = 'Нормальный вес';
            else if (bmi < 30) category = 'Избыточный вес';
            else category = 'Ожирение';

            document.getElementById('bmi-result').textContent = `ИМТ: ${bmi.toFixed(2)} (${category})`;
        }
    });

    // Налог
    calculateTaxButton.addEventListener('click', () => {
        const income = parseFloat(document.getElementById('income').value);
        const taxRate = parseFloat(document.getElementById('tax-rate').value);

        if (income > 0 && taxRate >= 0) {
            const tax = (income * taxRate) / 100;
            document.getElementById('tax-result').textContent = `Налог: ${tax.toFixed(2)} руб`;
        }
    });

    // Проценты
    calculatePercentButton.addEventListener('click', () => {
        const amount = parseFloat(document.getElementById('amount').value);
        const percent = parseFloat(document.getElementById('percent').value);

        if (amount > 0 && percent >= 0) {
            const result = (amount * percent) / 100;
            document.getElementById('percent-result').textContent = `Процент: ${result.toFixed(2)} руб`;
        }
    });

    // Конверсия единиц
    convertUnitsButton.addEventListener('click', () => {
        const value = parseFloat(document.getElementById('value').value);
        const unitFrom = document.getElementById('unit-from').value;
        const unitTo = document.getElementById('unit-to').value;

        const conversionRates = {
            meters: { kilometers: 0.001, miles: 0.000621371 },
            kilometers: { meters: 1000, miles: 0.621371 },
            miles: { meters: 1609.34, kilometers: 1.60934 }
        };

        if (value > 0 && unitFrom && unitTo) {
            const result = value * conversionRates[unitFrom][unitTo];
            document.getElementById('conversion-result').textContent = `Результат: ${result.toFixed(2)} ${unitTo}`;
        }
    });
});
