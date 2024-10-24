# Rucula

```js
<div id="js">
</div>

<script>
    let targetId = 'js'

    let rucula = new Rucula({
        global: global,
        window: window,
        id:targetId,
        reload:callback
    });
</script>
```
## Objeto de Instancia
### global
Configuração Global
### window
Configuração da Janela
### id
Elemento Target
### reload
callback que é chamado sempre que a ação reload é iniciada

## Propriedades
### [managmentObject]()
### [tableDependency]()
  
### [popup](./popup.md)
### [event]()
### [buttons]()
### [url]()

## Métodos
### create
```js
rucula.create();
```
### setValue
```js
rucula.setValue('aliasObject.propert', 'value')
```
### getValue
```js
getValue ('aliasObject.propert')
```
### objectUnique
```js
rucula.objectUnique('aliasObject');
```
### getFullObject
```js
rucula.objgetFullObjectectUnique();
```
### getSepareteObject
```js
rucula.getSepareteObject();
```

