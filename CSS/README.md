# CSS

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

## Layout

### Flex

#### 컨테이너로 시작

```css
.container {
  display: flex;
}
```

```html
<div class="container">
  <div class="item"></div>
  <div class="item"></div>
  <div class="item"></div>
</div>
```

#### item 요소에 flex 속성

flex는 세부적으로 3가지로 나눠집니다.

- flex-grow
  - 할당 가능한 공간의 정도를 선언합니다.
  - 형제 요소로 렌더링 된 모든 flex-item 요소들이 동일한 flex-grow 값을 갖는다면, 동일한 공간을 할당받습니다.
  - 소수값을 지정한다면, 그에 따라 다른 공간값을 나누어 할당받게 됩니다.
- flex-shrink
  - 요소의 크기가 flex-container 요소의 크기보다 클 때 flex-shrink 속성을 사용
  - 설정된 숫자값에 따라 flex-container 요소 내부에서 flex-item 요소의 크기가 축소됩니다.
- flex-basis
  - 플렉스 아이템의 초기 크기를 지정합니다.
  - box-sizing을 따로 지정하지 않는다면 콘텐츠 박스의 크기를 변경합니다.

각각의 값 타입에 따라 세부 속성이 정해집니다.

```css
/* Keyword values */
flex: auto;
flex: initial;
flex: none;

/* One value, unitless number: flex-grow */
flex: 2;

/* One value, length or percentage: flex-basis */
flex: 10em;
flex: 30%;

/* Two values: flex-grow | flex-basis */
flex: 1 30px;

/* Two values: flex-grow | flex-shrink */
flex: 2 2;

/* Three values: flex-grow | flex-shrink | flex-basis */
flex: 2 2 10%;
```

#### flexbox

- Flexible Box 모듈은 1 차원 레이아웃 모델로 설계
- 항목 간 공간 분포와 강력한 정렬 기능을 제공 할 수있는 방법으로 설계
- flexbox를 1 차원으로 설명 할 때 flexbox는 한 번에 한 차원의 레이아웃을 행 또는 열로 처리

#### flexbox의 두 축(주축과 교차 축)

- 주축은 flex-direction속성에 의해 정의
- 교차 축은 수직

#### 주축 flex-direction

- row
- row-reverse
- column
- column-reverse

##### 주축 row

![flex-direction-row](https://github.com/dineug/DLA/blob/master/CSS/css-02.png?raw=true)

##### 주축 column

![flex-direction-row](https://github.com/dineug/DLA/blob/master/CSS/css-03.png?raw=true)

#### 교차 축

##### 교차 축 row

![flex-direction-row](https://github.com/dineug/DLA/blob/master/CSS/css-04.png?raw=true)

##### 교차 축 column

![flex-direction-row](https://github.com/dineug/DLA/blob/master/CSS/css-05.png?raw=true)

#### align-items

교차 축 기준 정렬

- stretch
  - 가장 큰 아이템의 높이
- flex-start
  - 정렬 위치 top
- flex-end
  - 정렬 위치 bottom
- center
  - 정렬 위치 center

#### justify-content

주축 기준 정렬

- start
  - 정렬 컨테이너의 시작 가장자리를 향해 서로 같은 높이로 포장됩니다.
- end
  - 정렬 컨테이너의 끝 가장자리를 향해 서로 같은 높이로 포장됩니다.
- center
  - 정렬 컨테이너의 중심을 향해 서로 같은 높이로 포장됩니다.

## Reference

- [Selectors](https://developer.mozilla.org/en-US/docs/Learn/CSS/Building_blocks/Selectors)
- [flex](https://developer.mozilla.org/ko/docs/Web/CSS/flex)
- [flex-grow](https://developer.mozilla.org/ko/docs/Web/CSS/flex-grow)
- [flex-shrink](https://developer.mozilla.org/ko/docs/Web/CSS/flex-shrink)
- [flex-basis](https://developer.mozilla.org/ko/docs/Web/CSS/flex-basis)
- [Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- [align-items](https://developer.mozilla.org/en-US/docs/Web/CSS/align-items)
- [justify-content](https://developer.mozilla.org/en-US/docs/Web/CSS/justify-content)
