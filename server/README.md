# Node-Mini-Todo

## ...

- 장난감용

## Jenkin use Slack

1. Slack 채널을 생성
2. Slack 앱에 Jenkins ci 구성 추가
3. Jenkins Plugin 중 Slack Notification 추가
4. Config 에서 Slack 추가 (Secret Text로 구성)

![slack](./public/slack.png)

## Jenkins use Branching

1. GitHub에서 브랜칭 할 Branch들을 설정한다. (이때 필요한 값들 -> Remote로 올라가게끔 설정)

![branching](./public/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-06-19%20%EC%98%A4%EC%A0%84%202.50.11.png)

2. Jenkins pipeline을 설정한 후 한번 빌드를 한다.

![build](./public/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7%202023-06-19%20%EC%98%A4%EC%A0%84%202.51.30.png)

3. master는 올라가지 않고, deploy/dev, deploy/qa만 올라간다.

4. Github에서 Branching 설정하는 법

## Jenkins pipeline use SCM

1. Pipeline > SCM으로 설정 > URL + Github Hooks 설정

   ![1](./public/1.png)

2. SCM (Git) > Credentials 설정

   - Credentials Password > Github Basic Token
   - Branch 설정 (Default Master)

     ![2](./public/2.png)

3. Script Path 설정 (Github에 있는 폴더기준)

   ![3](./public/3.png)

4. Github > Setting > Webhooks > ~/github-webhook/ 설정

   ![4](./public/4.png)
