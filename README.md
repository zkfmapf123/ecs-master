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

## Reference

![Jenkins Branching](./server/README.md)
