## Тестовое задание Aviasales ([frontend](https://aviasales.recruitee.com/o/frontend-developer-js-coffeescript-react%C2%A0redux--aviasalesru))

![](./docs/search_preview.png?raw=true "")

## Задачи

### Структура проекта (#task0)
Создал базовую структуру проекта. Настроил рендер, сборку, взимодействие с сервером. Определил как будет работать приложение.


#### bin
Содержит инструменты запуска проекта. Может содержать другие таски, например запуск линтеров или прекоммит хуки.

* **run.dev.sh** - запуск приложения в dev режиме (npm run dev);
* **run.prod.sh** - запуск приложения в production режиме (npm start);

* **client.build.sh** - запуск сборки клиентского кода в prod режиме;
* **client.dev.sh** - запуск сборки клиентского кода в dev режиме. Запуск dev сервера для HMR и проксирование запросов, не относящихся к webpack, на реальный сервер;

* **server.prod.sh** - запуск сервера в prod режиме;
* **server.dev.sh** - запуск сервера в prod режиме. Отслеживание изменений серверного кода и перезапуск процесса;

#### configs
Директория хранения конфигов. Конфиги могут отличатся в зависимотси от откружения. Наследуются от дефолтного конфига.
Конфиги разделены на [клинтский](./config/client/README.md) и серверный.


#### docs
Директория для хранения документов. Сейчас содержит описание задачи

#### i18n
Храние все текста интерфейса в различных переводах. Строка текста может быть не только текстом, но и шаблоном. Шаблоны нужны для того, что бы не потерять контекст.

#### static
Публичная директория в статики. Туда же будут билдиться исходники клиентского кода.

#### webpack
Конфиги сборки. В зависимости от окружения будут использоватья разные настройки сборки. Наследуются от начальных настроек сборки.
В prod режиме, отделяет вендоров от основного бандла. Файл с вендорами и основной js имеют версии в виде хэша сборки что бы не отдавались из кэша браузера в случае нового билда.

#### src/server
Простенький http сервер на express. Умеет отдавать статику и рендерить пустую страницу с её скриптами.
При запросе на получение списка билетов берет из json. В любой момент можно расширить на получение из базы.

#### src/client
Использует под капотом react + redux. Сайд эффектами заимается redux-saga.
Для работы с персистентными структурами данных используется immutable. Для мемоизации используется reselect.
Reselect обучен работать с immutable данными и умеет их сравнивать.

Основной подход – вьюхи отдельно, логика отдельно. Реакт умеет только рисовать и посылать события.
Остальное обеспечивает логика. В нашем случае, этим управляет redux-saga.

Препроцессор для стилей less.

### Рендер билетов (#task1)
По большей части получилось сделать в задаче 0, так как использовал загрузку данных
для тестирования работоспособности архитектуры.

Добавил сортировку, логотипы перевозчиков. 