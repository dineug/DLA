# HTML

## HTML 이란

HTML - Hypertext Markup Language 마크업 언어이며 특정한 약속을 정의한 스펙

![html-diagram](https://github.com/dineug/DLA/blob/master/HTML/html-01.png?raw=true)

## HTML 구조

```html
<!-- HTML이 어떤 표준을 따르는지 알려주는 것을 DTD(Document Type Definition) -->
<!DOCTYPE html>
<html>
  <!-- 문서에 대한 정보 입력 -->
  <head>
    <!-- 인코딩 -->
    <meta charset="UTF-8" />
    <!-- 문서 설명 -->
    <meta name="description" content="Web Tutorial" />
    <!-- 문서 태그 -->
    <meta name="keywords" content="HTML,CSS" />
    <!-- 문서 작성자 -->
    <meta name="author" content="dineug" />

    <!-- 과거에는 검색 결과에 메타태그가 미치는 영향이 컸지만 이를 상업적으로 악용하는 페이지가 많아
    검색엔진 회사(구글) 들의 경우 메타 태그 대신 웹 표준에 맞게 제작된 웹사이트를 우선적으로 검색에 노출 -->
  </head>
  <body>
    <!-- - 문서 정보를 담는 곳 -->
  </body>
</html>
```

## 블럭 레빌 요소(Block level element) vs 인라인 요소(Inline element)

### 블럭 레빌 요소

- 블록 레벨 요소는 앞뒤 요소 사이에 새로운 줄을 만들고 나타납니다.
- 블록 레벨 요소 이전과 이후 요소사이의 줄을 바꿉니다.
- 블록 레벨 요소는 일반적으로 페이지의 구조적 요소를 나타낼 때 사용됩니다.
- 블록 레벨 요소는 인라인 요소에 중첩될수 없습니다.
- 블록 레벨 요소는 다른 블록 레벨 요소에 중첩될 수 있습니다.

### 인라인 요소

- 인라인 요소는 항상 블록 레벨 요소내에 포함되어 있습니다.
- 인라인 요소는 문서의 한 단락같은 큰 범위에는 적용될 수 없고 문장, 단어 같은 작은 부분에 대해서만 적용될 수 있습니다.
- 인라인 요소는 새로운 줄을 만들지 않습니다.
- 인라인 요소를 작성하면 그것을 작성한 단락내에 나타나게 됩니다.

## 빈 요소(Empty elements)

- 모든 요소가 위에 언급된 여는 태그, 내용, 닫는 태그 패턴을 따르는 것은 아닙니다.
- 문서에 무언가를 첨부하기 위해 단일 태그(Single tag)를 사용하는 요소도 있습니다.

## 시맨틱 웹(Semantic Web)

| Element | Describe                                                                  |
| ------- | ------------------------------------------------------------------------- |
| header  | 브랜드 로고나 메뉴가 삽입되는 곳                                          |
| nav     | 홈페이지 메뉴를 만들 때 사용                                              |
| article | 웹페이지 상에서의 실제 내용을 의미                                        |
| section | 웹사이트 영역을 지정해주는 태그                                           |
| aside   | 웹컨텐츠 제작시 왼쪽이나 오른쪽에 부수적으로 내용이 들어가는 부분, (배너) |
| footer  | 회사소개, 저작권 표기 등 같은 내용이 들어가는 부분                        |

![semantic-web](https://github.com/dineug/DLA/blob/master/HTML/html-02.png?raw=true)

### Heading

- 가급적이면 페이지 당 하나의 h1 만 사용해야 합니다.
- h1은 최상위에 있는 표제이며 나머지 다른 표제들은 계층적으로 이것 밑에 위치합니다.
- 각 표제들을 계층적으로 올바른 순서로 사용해야 함을 명심하세요.
- 6개의 Heading을 사용할 수 있지만 꼭 필요한 것이 아니라면 한 페이지에 3개 이상을 사용하지 않도록 하십시오.

### Lists

- Unordered (순서 없음) - 정렬되지 않은 목록은 항목의 순서가 중요하지 않은 항목 목록을 표시하는 데 사용됩니다
- Ordered (순서 있음) - 순서 있는 리스트는 항목의 순서가 중요한 목록 입니다.

## Reference

- [HTML](https://developer.mozilla.org/ko/docs/Learn/HTML)
- [XML](https://ko.wikipedia.org/wiki/XML)
- [DTD](https://en.wikipedia.org/wiki/Document_type_definition)
- [SGML](https://ko.wikipedia.org/wiki/SGML)
- [character entity references](https://en.wikipedia.org/wiki/List_of_XML_and_HTML_character_entity_references)
- [시맨틱 웹](https://ko.wikipedia.org/wiki/%EC%8B%9C%EB%A7%A8%ED%8B%B1_%EC%9B%B9)
- [SEO](https://developer.mozilla.org/ko/docs/Glossary/SEO)
- [Responsive_images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
- [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/WAI-ARIA_basics)
- [Viewport](https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag)
