variable "region" {}
variable "env" {}
variable "config_json" {}

variable "vpc" {}
variable "ecr" {}
variable "iam" {}
variable "sg" {}


################################# ECS Clsuter #################################
resource "aws_kms_key" "kms" {
    deletion_window_in_days = 7
}

resource "aws_cloudwatch_log_group" "log_group" {
    for_each = var.config_json
    name = "${each.value.prefix}-cloudwatch-log"
}

## ECS Cluster를 만들면 -> vpc가 기본값으로 지정이 된다.
## ECS Service에 network_configuration 블록을 지정할 수 있다.
resource "aws_ecs_cluster" "cluster" {
    for_each = var.config_json

    name = "${each.value.prefix}-cluster"

    // 컨테이너화된 애플리케이션을 위한 모니터링 및 분석 솔루션
    setting {
        name  = "containerInsights"
        value = "enabled"
    }

    configuration {
        execute_command_configuration {
            kms_key_id = aws_kms_key.kms.arn
            logging = "OVERRIDE"

            log_configuration {
              cloud_watch_encryption_enabled= true
              cloud_watch_log_group_name = lookup(aws_cloudwatch_log_group.log_group, each.key).name
            }
        }
    }
}

resource "aws_ecs_cluster_capacity_providers" "cluster_provider" {
  for_each = aws_ecs_cluster.cluster

  cluster_name       = each.value.name
  capacity_providers = ["FARGATE", "FARGATE_SPOT"]

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE"
    weight            = 1
  }

  default_capacity_provider_strategy {
    capacity_provider = "FARGATE_SPOT"
    weight            = 3
  }
}

################################# Task Definition #################################
resource "aws_ecs_task_definition" "task_definition" {
    for_each = var.config_json

    family = "${each.key}-family"
    requires_compatibilities = ["FARGATE"]
    cpu = 1024
    memory = 2048

    execution_role_arn = var.iam.task_execution_role
    task_role_arn = var.iam.task_role
    network_mode = "awsvpc"

    container_definitions = jsonencode([
        {
            name = "${each.key}"
            image = join("",[lookup(var.ecr,each.key),":",split("-", each.key)[0] == "front" ? "frontend" : split("-", each.key)[0], "-latest"])
            cpu  = 1024
            memory = 2048
            essential = true
            portMappings: [
                {
                    "containerPort" : 3000,
                    "hostPort" : 3000,
                    "protocol" : "tcp" 
                }
            ]
        }
    ])
}

################################# Service #################################
resource "aws_ecs_service" "service" {
    for_each = var.config_json

    launch_type = "FARGATE"
    name = "${each.key}-service"
    cluster = lookup(aws_ecs_cluster.cluster, each.key).arn
    task_definition = lookup(aws_ecs_task_definition.task_definition, each.key).arn
    desired_count = 1

    network_configuration {
      assign_public_ip = true
      subnets = values(var.vpc.public_subnets)
      security_groups = [
        for sg in each.value.depends_on_sg:
            lookup(var.sg, sg)
      ]
    }
}

output "ecs"{
    value = "ecs"
}