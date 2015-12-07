#nw.js application example

####Сборка node-webkit приложения с кодеками для работы видео и рабочими настройками WebGl.

В папке ```mpeg_libs``` собраны рабочие кодеки для корректной работы видео в ```nw.js 0.12.3``` с версией движка ```Chromium 41.0.2272.76``` для каждой ОС соответственно.

Для OSX помещаем кодек в директорию ```osx32\nwjs.app\Contents\Frameworks\nwjs Framework.framework\Librariesм```.

Для windows помещаем кодек в корень.

Для linux кодеки пока что в поиске.

Для работы WebGl добавляем настройки в ```package.json``` приложения:

```shell
	"chromium-args": "--child-clean-exit --enable-webgl --ignore-gpu-blacklist --disable-pinch",
	"webkit": {
		"plugin": true
	}
```

WebGl пример на three.js взят [от сюда](http://threejs.org/examples/).

Собрать приложение:
>grunt

===
