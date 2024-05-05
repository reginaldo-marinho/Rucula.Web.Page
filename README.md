<p align="center">
  <img src="https://raw.githubusercontent.com/reginaldo-marinho/rucula-js/b76e809a44a66de3733e30388e29d672c8b61011/docs/assets/rucula.svg" style="width:200px">
</p>

**Bem vindo ao rucula-js, um gerador de interfaces baseadas em formulário que cria e gerencia todos os pontos necessários da sua interface.** 

## Instalação

### CDN
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rucula-js/rucula-js@master/dist/style/style.css"/>
```
```js
import {Rucula} from 'https://cdn.jsdelivr.net/gh/rucula-js/rucula-js@master/dist/rucula.js'
```

### NPM
```js
npm i @reginaldo-marinho/rucula-js` ou `npm install @reginaldo-marinho/rucula-js`
```

### Olá Mundo!

[Veja agora um exemplo do uso](./docs/docs/exemples/hello-world.html)

```html

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Exemplo Rucula</title>
        <style>
            body{
                margin: 0;
            }
            *{
                font-family: "DM Sans", sans-serif;
            }
        </style>
    </head>
    <body>
        <div id="js">
        </div>

        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/rucula-js/rucula-js@master/dist/style/style.css"/>

        <script type="module" >
            
            import {Rucula} from 'https://cdn.jsdelivr.net/gh/rucula-js/rucula-js@master/dist/rucula.js'
            
            let config = {
                floatLabel:true, 
                environments:[
                    {
                        env:"development",
                        hostname:"http://localhost",
                        port: "5016"
                    }
                ],
                localizations:[
                    {
                        locales:"pt-BR",
                        language:"🇧🇷 Brasil" ,
                        currency:"BRL",
                        maxDecimal:5
                    }
                ] 
            }   

            let input  = {
                name: "Olá Mundo",
                pathController: "/OlaMundo",
                type: "crud",
                crud:"c",
                messageHome: "Ola Mundo",
                iconHome: "bi-rocket-takeoff",
                grid:false,
                frames: [
                    {
                        name: "Ola Mundo!",
                        objectDto: "olaMundo",
                        alias: "aliasOlaMundo",
                        fields: [
                            {
                                propertDto: "codigo",
                                description: "Código",
                                maxLength: 40,
                                requerid:true,
                                width:350
                            },
                            {
                                propertDto: "nome",
                                description: "Nome",
                            }
                        ]
                    }
                ],
                layout:{
                    items:
                    [
                        ["aliasOlaMundo"]
                    ]
                },
                button: [
                    {
                        icon: "bi bi-save",
                        type: "button",
                        target: "r-a-save",
                        body:"."
                    }
                ]}

            let rucula = new Rucula(config,input,"js");
            rucula.object.setValue('aliasOlaMundo.codigo','703e8d2c-b49f-40b4-875a-11022581c0f0')
            rucula.object.setValue('aliasOlaMundo.nome','reginaldo')

        </script>
    </body>
</html>
```
##### Contribuidores

|Contribuidores|
|-|
|<a href="https://github.com/reginaldo-marinho"><img width="45px" height="45px" style="border-radius:30px" alt="reginalso-marinho" title="TheLarkInn" src="https://avatars.githubusercontent.com/u/60780631?v=4"></a>|

<a href="https://github.com/rucula-js/rucula-js">Contamos com a sua estrela 😀 - Visite o projeto rucula-js ⭐</a>

<div style="
    border: 2px solid #ff7906;
    border-radius: 8PX;
    padding: 8px;
    background-color: #ffeaea;
    ">
    <h5>Nos ajude a melhorar o rucula-js.</h5>
    Encontrou um erro? Tem alguma sugestão?  <a href="https://github.com/rucula-js/rucula-js/issues">Abra um novo problema</a><br>    
</div>

