
# Cadastro de Portfolios para IntranetOne
Cadastro de Portfolios para IntranetOne.
IOPortifólio requires IntranetOne
## Conteúdo
 
## Instalação

```sh
composer require dataview/iopopup
```
```sh
php artisan io-popup:install
```

- Configure o webpack conforme abaixo 
```js
...
let popup = require('io-popup');
io.compile({
  services:[
    ...
    new popup(),
    ...
  ]
});

```
- Compile os assets e faça o cache
```sh
npm run dev|prod|watch
php artisan config:cache
```
