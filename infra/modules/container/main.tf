variable "region" {}
variable "env" {}
variable "config_json" {}

variable "vpc" {}
variable "sg" {}

locals {
  config = var.config_json
}

## ECR
resource "aws_ecr_repository" "ecr" {
  for_each = local.config

  name                 = each.key
  image_tag_mutability = "MUTABLE"

  image_scanning_configuration {
    scan_on_push = true
  }
}

resource "aws_ecr_lifecycle_policy" "ecr_policy" {
  for_each = local.config

  repository = lookup(aws_ecr_repository.ecr, each.key).name

  policy = jsonencode({
    rules = [{
      rulePriority = 1
      description  = "keep last 10 images"
      action = {
        type = "expire"
      }
      selection = {
        tagStatus   = "any"
        countType   = "imageCountMoreThan"
        countNumber = 10
      }
    }]
  })
}

## ECS
resource "aws_ecs_cluster" "cluster" {
  for_each = local.config

  name = "${each.key}-cluster"
}

resource "aws_ecs_task_definition" "task_definition" {
  for_each = local.config

  family                   = "${each.key}-family"
  network_mode             = "awsvpc"
  requires_compatibilities = ["FARGATE"]
  cpu                      = 256
  memory                   = 512
  execution_role_arn       = "arn:aws:iam::182024812696:role/ecsTaskExecutionRole"
  task_role_arn            = "arn:aws:iam::182024812696:role/ecsTaskExecutionRole"
  container_definitions = jsonencode([
    {
      name      = "${each.key}-container"
      image     = "${lookup(aws_ecr_repository.ecr, each.key).repository_url}:${each.value.prefix}-latest"
      essential = true
      portMappings = [{
        protocol      = "tcp"
        containerPort = 3000
        hostPort      = 3000
      }]
    }
  ])
}