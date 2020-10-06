# CSS

## CSS는

Cascading Style Sheets의 약자로 HTML 문서의 스타일을 꾸밀 때 사용하는 스타일 시트 언어

## HTML에 CSS를 적용시키는 방법 (3가지)

- 임베디드 방식 head 태그 안에 style 태그를 삽입하여 적용하는 방식

```html
<head>
  <style type=“text/css”>
    h1 {
      background-color: yellow;
    }
  </style>
</head>
```

- 인라인 방식 HTML 태그에 직접 스타일을 적용하는 방식

```html
<h2 style="background-color: red;">Hello World1</h2>
```

- 링크 방식 HTML 문서와는 별개의 CSS 파일을 생성하여 사용하는 방식

```html
<link rel="stylesheet" type="text/css" href=“css/style.css”>
```

## 선택자의 여러 종류

| Name                       | Describe                                                                                         | example                                     |
| -------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------- |
| 요소 선택자                | 특정 타입의 모든 HTML 요소                                                                       | `p { }` -> `<p>`                            |
| 아이디 선택자              | 특정 아이디를 가진 페이지의 요소 (주어진 HTML 페이지에서, 아이디당 딱 하나의 요소만 허용됩니다). | `#my-id { }` -> `<p id="my-id">`            |
| 클래스 선택자              | 특정 클래스를 가진 페이지의 요소 (한 페이지에 클래스가 여러번 나타날 수 있습니다).               | `.my-class { }` -> `<p class="my-class">`   |
| 속성 선택자                | 특정 속성을 갖는 페이지의 요소.                                                                  | `img[src] { }` -> `<img src="myimage.png">` |
| 수도(Pseudo) 클래스 선택자 | 특정 요소이지만 특정 상태에 있을 때만, 예를 들면, hover over 상태일 때.                          | `a:hover { }` -> `<a> 마우스 hover시`       |

## 박스모델

| Name    | Describe                      |
| ------- | ----------------------------- |
| padding | 컨텐트 주위의 공간            |
| border  | padding 의 바깥쪽에 놓인 실선 |
| margin  | 요소의 바깥쪽을 둘러싼 공간   |

![box-model](https://github.com/dineug/DLA/blob/master/CSS/css-01.png?raw=true)

## Reference

- [Selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)
