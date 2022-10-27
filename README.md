# Задача:

Получить список пива отсюда - https://api.punkapi.com/v2/beers?page=1&limit=25

1. Вывести на странице:
   1. Порядковый номер
   2. name
   3. img
   4. description
   5. brewers_tips
2. Внизу добавить кнопку ‘Show next’ (пагинация)
   1. По клику на кнопку получить от api следуюущую страницу предыдущие данные остаются на месте, новые отображаются ниже
      1. Параметр page отвечает за номер страницы
   2. Если от сервера возвращается пустой массив - кнопка должна скрываться
   3. Пока данные поступают от сервера:
      1. При первой загрузки данных - кнопка отсутствует
      2. При загрузке следующей странички текст меняется на loading
3. Добавить кнопку Edit возле каждого пива
   1. По клику открывается формочка где мы можем редактировать 2 параметра (name, description)
4. Добавить кнопку Delete возле каждого пива
   1. По клику пиво удаляется из списка

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
