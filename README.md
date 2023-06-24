# ECS use Terraform

## ECS Architecture

![archi](./public/archi.png)

- ECS

  - Container를 Orchestration해주는 Tool
  - 이러한 EC2 Container 들을 ECS Cluster가 관리한다 (배포, 생성)
  - EC2 Service들은 Auto Scaling을 처리한다

- ECS Launch Option

  - Fargate

    - Serverless
    - Container에서 사용한 CPU와 Memory 사용량의 대해서만 비용측정
    - 좀더 비싸지만 -> 규칙이 일정하지 않은 Traffic System은 Fargate 비용적으로 더 좋은 제안
    - Serverlss인 만큼 -> Server에 직접 접근해서 Trouble Shooting이 불가능

  - EC2 Type
    - 그냥 EC2 + Auto Scaling

## Jenkins Docker 설치

- docker 설치 ubuntu

```
  sudo apt-get update

sudo apt-get install -y \
 ca-certificates \
 curl \
 gnupg \
 lsb-release

curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

echo \
 "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu \
 $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

docker verision
```

- user, group 추가

```
  sudo groupadd -g <docker-group-id> docker_group
  sudo useradd -u 1000 -g <docker-group-id> -m -s /bin/bash docker_user
```

- Docker volume 추가

```
  chmod 777 /var/run/docker.sock
  docker volume create jenkins_file
```

- Dockerfile 실행

```Dockerfile

## Dockerfile.jenkins
FROM jenkins/jenkins:lts

USER root

RUN apt-get update \
 && apt-get -y install lsb-release \
 && curl -fsSL https://download.docker.com/linux/debian/gpg | gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg \
 && echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/debian $(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null \
 && apt-get update \
 && apt-get -y install docker-ce docker-ce-cli containerd.io

## if user_id = 1111
## if group_id = 1111
## ARG 형태로 진행해도 됨

RUN usermod -u 1111 jenkins && \
    groupmod -g 1111 docker && \
    usermod -aG docker jenkins

USER jenkins
```

- Docker run

```
docker build -f Dockerfile.jenkins -t jenkins .

docker run \
-d \
--name jenkins_container \
-p 8080:8080 \
-v jenkins_file:/var/jenkins_home \
--restart always \
jenkins
```

## Reference

![Jenkins_branch](./server/README.md)
