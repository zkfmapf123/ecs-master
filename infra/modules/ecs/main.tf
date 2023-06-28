variable "region" {}
variable "env" {}
variable "config_json" {}
variable "vpc" {}


################################# ECS Clsuter #################################
resource "aws_kms_key" "kms" {
    deletion_window_in_days = 7
}

resource "aws_cloudwatch_log_group" "log_group" {
    for_each = var.config_json
    name = "${each.value.prefix}-cloudwatch-log"
}

## ECS Cluster를 만들면 -> vpc가 기본값으로 지정이 된다.
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

