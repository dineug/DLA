# 13장

이벤트는 `리스너`로 추적하며 리스너는 이벤트가 일어날 때만 실행됩니다.  
전통적인 소프트웨어 공학에서는 이 모델을 옵저버 패턴이라 부릅니다.  
이 패턴은 자바스크립트에서 정의하는 페이지 외형사이에 `느슨한 연결을 형성`합니다.

## 이벤트 흐름

> 페이지에서 이벤트가 전달되는 순서

## 이벤트 버블링

> 이벤트 흐름상 문서 트리에서 가장 깊이 위치한 요소에서 시작해 거슬러 흐르는 이벤트

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Event Bubbling Example</title>
  </head>
  <body>
    <div id="myDiv">Click Me</div>
  </body>
</html>
```

페이지에서 `<div>` 요소를 클릭하면 click 이벤트가 다음 순서대로 발생합니다.

1. `<div>`
1. `<body>`
1. `<html>`
1. `document`

click 이벤트가 처음 발생한 요소는 직접 클릭한 `<div>` 요소입니다.  
그다음 click 이벤트는 document 객체를 만날 때까지 DOM 트리를 거술러 올라가면서 각 노드에서 모두 발생합니다.

### 이벤트 캡처링

> 이벤트 캡처링에서는 최상위 노드에서 처음으로 이벤트가 발생하며 가장 명시적인 노드에서 마지막으로 발생합니다.

1. `document`
1. `<html>`
1. `<body>`
1. `<div>`

DOM 레벨2 이벤트 명세에서는 이벤트 캡처링이 document에서 시작해야 한다고 명시했지만 사실 이들 브라우저의 이벤트는 window에서 시작합니다.

### DOM 이벤트 흐름

DOM 레벨 2 이벤트에서 정희한 이벤트 흐름

- 이벤트 캡처링 단계
- 타깃 단계
- 이벤트 버블링 단계

> 이벤트 캡처링이 처음 발생하므로 필요하다면 이 단계에서 이벤트를 가로챕니다.

1. `document`
1. `<html>`
1. `<body>`
1. `<div>`
1. `<body>`
1. `<html>`
1. `document`

## 이벤트 핸들러

- onclick
- onload
- ...

### HTML 이벤트 핸들러

```html
<input type="button" value="Click Me" onclick="alert('Clicked')" />
```

```html
<script type="text/javascript">
  function showMessage() {
    alert("Hello world!");
  }
</script>
<input type="button" value="Click Me" onclick="showMessage()" />
```

```html
<input type="button" value="Click Me" onclick="alert(event.type)" />
```

```html
<input type="button" value="Click Me" onclick="alert(this.value)" />
```

```html
<form method="post">
  <input type="text" name="username" value="" />
  <input type="button" value="Echo Username" onclick="alert(username.value)" />
</form>
```

### DOM 레벨 0 이벤트 핸들러

```js
// 단일
var btn = document.getElementById("myBtn");
btn.onclick = function () {
  console.log(this.id);
};
btn.onclick = null;
```

### DOM 레벨 2 이벤트 핸들러

```js
// 여러개
var btn = document.getElementById("myBtn");
var handler = function () {
  console.log(this.id);
};
btn.addEventListener("click", handler, false);
btn.removeEventListener("click", handler);
```

## event 객체

> DOM과 관련된 이벤트가 발생하면 관련정보는 모두 event라는 객체에 저장

### DOM event 객체

- preventDefault()
  - 이벤트의 기본 동작을 취소합니다.
  - 이벤트를 취소하려면 해당 이벤트의 cancelable 프로퍼티가 true여야 합니다.
- stopPropagation()
  - 메서드는 이벤트 흐름을 즉시 멈춰서 이벤트 캡처링이나 버블링을 모두 취소

## 크로스 브라우저 이벤트 핸들러

```js
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent(`on${type}`, handler);
    } else {
      element[`on${type}`] = null;
    }
  },
  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
};
```

## 이벤트 타입

DOM 레벨 3 이벤트는 DOM 레벨 2 이벤트에서 구분한 목록을 재정의하고 몇가지 이벤트를 더 정의했습니다.

```js
var isSupported = document.implementation.hasFeature("HTMLEvents", "2.0");
var isSupported = document.implementation.hasFeature("UIEvent", "3.0");
var isSupported = document.implementation.hasFeature("FocusEvent", "3.0");
var isSupported = document.implementation.hasFeature("MouseEvents", "2.0");
var isSupported = document.implementation.hasFeature("MouseEvent", "3.0");
```

- UI 이벤트
  > load unload abort error select resize scroll
- Focus 이벤트
  > blur focus focusin focusout
- 마우스 이벤트와 휠 이벤트
  > click dblclick mousedown mouseenter mouseleave mousemove mouseout mouseover mouseup

click 이벤트는 같은 요소에서 mousedown 이벤트와 mouseup 이벤트가 연속으로 발생할 때 발생합니다.

이들 네 가지 마우스 이벤트는 항상 다음 순서대로 발생합니다.

1. mousedown
1. mouseup
1. click
1. mousedown
1. mouseup
1. click
1. dblclick

### 좌표

- 클라이언트 좌표: 뷰포트 기준
  - clientX, clientY
- 페이지 좌표: 페이지 기준
  - pageX, pageY
- 화면 좌표: 전체화면 기준
  - screenX, screenY

```js
event.pageX ===
  event.clientX +
    (document.body.scrollLeft || document.documentElement.scrollLeft);
event.pageY ===
  event.clientY +
    (document.body.scrollTop || document.documentElement.scrollTop);
```

### 키보드 수정

- event.shiftKey
- event.ctrlKey
- event.altKey
- event.metaKey

### 관련 요소

> mouseover mouseout

```js
var EventUtil = {
  getRelatedTarget: function (event) {
    if (event.relatedTarget) {
      return event.relatedTarget;
    } else if (event.toElement) {
      return event.toElement;
    } else if (event.fromElement) {
      return event.fromElement;
    } else {
      return null;
    }
  },
};
```

### 버튼

> mousedown mouseup 이벤트는 event 객체에 어떤 버튼을 누르거나 뗐는지 나타내는 button 프로퍼티가 있습니다.

- `0`은 마우스 기본 버튼(왼쪽)
- `1`은 마우스 가운데 버튼
- `2`은 마우스 두번째 버튼(오른쪽)

```js
var EventUtil = {
  getButton: function (event) {
    if (document.implementation.hasFeature("MouseEvents", "2.0")) {
      return event.button;
    } else {
      switch (event.button) {
        case 0:
        case 1:
        case 3:
        case 5:
        case 7:
          return 0;
        case 2:
        case 6:
          return 2;
        case 5:
          return 1;
      }
    }
  },
};
```

## Reference
