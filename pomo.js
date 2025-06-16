document.addEventListener('DOMContentLoaded', function() {

    const __ = {

        range: function*(start, stop=null, step=1) {
            if (stop === null) {
                stop = start;
                start = 0;
            }
            for (let i = start; i < stop; i += step) {
                yield i;
            }
        },

        enumerate: function*(iterable, start=0) {
            let i = start;
            for (const item of iterable) {
                yield [i++, item];
            }
        },
        

        zip: function*(...iterables) {
            const iterators = iterables.map(i => i[Symbol.iterator]());
            while (true) {
                const results = iterators.map(iter => iter.next());
                if (results.some(res => res.done)) break;
                yield results.map(res => res.value);
            }
        },
        

        dictGet: (obj, key, defaultValue=null) => {
            return obj.hasOwnProperty(key) ? obj[key] : defaultValue;
        },

        startsWith: (str, prefix) => {
            return str.startsWith(prefix);
        },
        

        endsWith: (str, suffix) => {
            return str.endsWith(suffix);
        },

        choice: (arr) => {
            return arr[Math.floor(Math.random() * arr.length)];
        }
    };


    const chatBtn = document.getElementById('openChat');
    const closeChatBtn = document.getElementById('closeChat');
    const supportChat = document.getElementById('supportChat');
    const chatMessages = document.getElementById('chatMessages');
    const chatInput = document.getElementById('chatInput');
    const sendMessageBtn = document.getElementById('sendMessage');


    const botResponses = [
        {
            keywords: ['привет', 'здравствуйте', 'добрый день', 'хай'],
            response: 'Здравствуйте! Чем могу помочь?'
        },
        {
            keywords: ['проблема', 'ошибка', 'не работает', 'сломал', 'глюк'],
            response: 'Опишите, пожалуйста, вашу проблему подробнее.'
        },
        {
            keywords: ['спасибо', 'благодарю', 'thanks', 'мерси'],
            response: 'Пожалуйста! Обращайтесь, если будут еще вопросы.'
        },
        {
            keywords: ['найти себя', 'потерял себя', 'кто я'],
            response: 'хз иди почитай?'
        },
        {
            keywords: ['отменить заказ', 'вернуть заказ', 'отмена заказа'],
            response: 'Заказы можно отменить в личном кабинете в разделе "Мои заказы" в течение 24 часов после оформления.'
        },
        {
            keywords: ['пароль', 'восстановить пароль', 'забыл пароль'],
            response: 'Перейдите на страницу входа и нажмите "Забыли пароль?". Введите ваш email, и мы отправим инструкции по восстановлению.'
        },
        {
            keywords: ['lol', 'кек', 'ахах', 'ржу'],
            response: 'Это действительно смешно! Чем еще могу помочь?'
        }
    ];

    const defaultResponse = 'Извините, я не понял ваш вопрос. Можете переформулировать?';

    // Открытие/закрытие чата
    chatBtn.addEventListener('click', function() {
        supportChat.classList.add('active');
        if (chatMessages.children.length === 0) {
            addMessageToChat('Здравствуйте! Чем могу помочь?', true);
        }
    });

    closeChatBtn.addEventListener('click', function() {
        supportChat.classList.remove('active');
    });

    function addMessageToChat(message, isBot = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isBot ? 'bot-message' : 'user-message');
        
        const sender = document.createElement('strong');
        sender.textContent = isBot ? 'Поддержка: ' : 'Вы: ';
        
        messageDiv.appendChild(sender);
        messageDiv.appendChild(document.createTextNode(message));
        
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    function getBotResponse(userMessage) {
        const lowerMessage = userMessage.toLowerCase();

        for (const [index, item] of __.enumerate(botResponses)) {
            for (const keyword of item.keywords) {
                if (__.startsWith(lowerMessage, keyword) || __.endsWith(lowerMessage, keyword) || 
                    lowerMessage.includes(keyword)) {
                    return __.choice([item.response, item.response]); 
                }
            }
        }
        
        return defaultResponse;
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            addMessageToChat(message);
            chatInput.value = '';
            

            setTimeout(() => {
                const botResponse = getBotResponse(message);
                addMessageToChat(botResponse, true);
            }, 500 + Math.random() * 1000);
        }
    }

    sendMessageBtn.addEventListener('click', sendMessage);
    chatInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });


    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqSearch = document.getElementById('faqSearch');
    const searchBtn = document.querySelector('.search-btn');


    for (const i of __.range(faqQuestions.length)) {
        faqQuestions[i].addEventListener('click', function() {
            this.classList.toggle('active');
            const answer = this.nextElementSibling;
            answer.classList.toggle('show');
            
            // Плавная анимация
            if (answer.classList.contains('show')) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                answer.style.maxHeight = '0';
            }
        });
    }


    function searchFAQ() {
        const searchTerm = faqSearch.value.toLowerCase().trim();
        const faqItems = document.querySelectorAll('.faq-item');
        
        if (!searchTerm) {
    
            for (const item of faqItems) {
                item.style.display = 'block';
                const answer = item.querySelector('.faq-answer');
                item.querySelector('.faq-question').classList.remove('active');
                answer.classList.remove('show');
                answer.style.maxHeight = '0';
            }
            return;
        }
        
        let foundResults = false;
        
        for (const item of faqItems) {
            const question = item.querySelector('.faq-question').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
            const matches = question.includes(searchTerm) || answer.includes(searchTerm);
            
            item.style.display = matches ? 'block' : 'none';
            
            if (matches) {
                foundResults = true;
                const answerEl = item.querySelector('.faq-answer');
                item.querySelector('.faq-question').classList.add('active');
                answerEl.classList.add('show');
                answerEl.style.maxHeight = answerEl.scrollHeight + 'px';
            }
        }
        
        if (!foundResults) {
            alert('Ничего не найдено');
        }
    }
    
    searchBtn.addEventListener('click', searchFAQ);
    faqSearch.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            searchFAQ();
        }
    });

    const ticketForm = document.getElementById('supportTicketForm');

    if (ticketForm) {
    
        function validateEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        ticketForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const subject = document.getElementById('ticketSubject').value.trim();
            const email = document.getElementById('ticketEmail').value.trim();
            const message = document.getElementById('ticketMessage').value.trim();
            
       
            const validations = [
                [!validateEmail(email), 'Пожалуйста, введите корректный email'],
                [subject.length < 5, 'Тема должна содержать не менее 5 символов'],
                [message.length < 10, 'Описание проблемы должно содержать не менее 10 символов']
            ];
            
            for (const [condition, error] of validations) {
                if (condition) {
                    alert(error);
                    return;
                }
            }
            
            const ticketData = {
                subject,
                email,
                priority: document.getElementById('ticketPriority').value,
                message,
                createdAt: new Date().toISOString(),
                status: 'open'
            };

            saveTicket(ticketData);
            
      
            this.reset();
            
            alert('Ваше обращение принято! Номер вашего тикета: ' + ticketData.createdAt);
        });

        function saveTicket(ticket) {
            try {
                let tickets = JSON.parse(localStorage.getItem('supportTickets') || '[]');
                tickets.push(ticket);
                localStorage.setItem('supportTickets', JSON.stringify(tickets));
                return true;
            } catch (e) {
                console.error('Ошибка сохранения:', e);
                return false;
            }
        }
    }


    function* generateId() {
        let id = 1;
        while (true) {
            yield id++;
        }
    }
    
    const idGenerator = generateId();

    console.log('Сгенерированный ID:', idGenerator.next().value);
    
    function logExecution(func) {
        return function(...args) {
            console.log(`Вызов функции ${func.name} с аргументами:`, args);
            const result = func.apply(this, args);
            console.log(`Функция ${func.name} вернула:`, result);
            return result;
        };
    }
    

    const loggedGetBotResponse = logExecution(getBotResponse);
    
    async function withTimer(func) {
        const start = performance.now();
        try {
            return await func();
        } finally {
            const end = performance.now();
            console.log(`Выполнение заняло ${(end - start).toFixed(2)} мс`);
        }
    }
});