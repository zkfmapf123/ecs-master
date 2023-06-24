# e-commerce site 만들기

- 원본 사이트 : [gonegani](https://gonegani.id/home)
- 개발 인원 : 1인 (임재혁)
- 빈페이지는 : '상품이 준비중입니다.' 로 처리 하였습니다.

> 구현 사항

      - Home(product list page)
      - Product Detail Page
      - Shopping List

> 사용 스택

      - React
      - React-Query
      - Recoil
      - Styled-components
      - typescript

## 실행 방법

```
    - npm install
    - npm start
```

## 구조 및 내용 설명

      ├── public
            ├── images
            ├── productData
                ├── banner.json
                ├── product.json

         ├── src
            ├── atoms (for recoil)
            ├── componetns
            ├── containers
            ├── hooks
            ├── pages
            ├── styles
            ├── utils

> 설명

      - 각 디렉토리에서 해당하는 기능이나 역할에 맞는 파일들을 모아서 관리하였습니다.

      - public 폴더에서 json 형태로 서버 response를 받는것을 가정하여 mock 데이터로 관리하였습니다.

      - useGetItemList, useGetBanners등을 react query와 axios를 사용하여 데이터를 패칭하는 로직을 hooks로 관리 하였습니다.

      - media query를 사용하여 사이즈별 반응형으로 구현 하였습니다.

### HOME(상품 LIST 및 필터기능)

- 상품 리스트를 렌더링하고 각각 카테고리에 맞게 필터기능 구현
- 필터바에 왼쪽에 있는 태그들을 누르면 각 항목에 맞는 리스트 렌더링

<img src="https://github.com/Jaehyuksssss/team-fresh-term-project/blob/master/public/Images/Filter.gif?raw=true"  width="642" height="200" alt="image">

### PRODUCT DETAIL MODAL

- 가격, 색상, 사이즈 등을 선택하여 장바구니에 추가하는 모달입니다.

- 모달 창 내에서 상품의 다양한 옵션을 시각적으로 표시하고 페이지를 이동하지 않고 모달내에서 빠르게 옵션을 선택 할 수 있다고 판단을 하였습니다.

- 옵션들을 모두 체크 후에 Add to cart 버튼이 활성화 되고 장바구니에 담기면 cart페이지로 이동할 수 있는 모달이 나옵니다.

<img src="https://github.com/Jaehyuksssss/team-fresh-term-project/blob/master/public/Images/Detail.gif?raw=true" width="642" height="400" alt="image">

### SHOPPING LIST (장바구니)

- 장바구니에 담긴 항목들을 보고 삭제 할 수 있는 페이지입니다.

- public 폴더에서 json 형태로 서버 response를 받는것을 가정하여 mock데이터로 관리하였습니다.

- useGetItemList, useGetBanners등을 react query와 axios를 사용하여 데이터를 패칭하는 로직을 hooks로 관리 하였습니다.

<img src="https://github.com/Jaehyuksssss/team-fresh-term-project/blob/master/public/Images/shopping.gif?raw=true" width="642" height="400" alt="image">
