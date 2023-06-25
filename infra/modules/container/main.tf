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

## ALB
resource "aws_s3_bucket" "alb_s3_bucket" {
  for_each = local.config

  policy = jsonencode({
    "Version" : "2012-10-17",
    "Statement" : [
      {
        "Effect" : "Allow",
        "Principal" : {
          "AWS" : "arn:aws:iam::${each.key}:root"
        },
        "Action" : "s3:PutObject",
        "Resource" : "arn:aws:s3:::alb-log-example.com/*"
      }
    ]
  })

  lifecycle_rule {
    id      = "log_lifecycle"
    prefix  = ""
    enabled = true

    transition {
      days          = 30
      storage_class = "GLACIER"
    }

    expiration {
      days = 90
    }
  }
}

resource "aws_alb_target_group" "target_group" {
    for_each = local.config

    name = "${each.key}-target-group"
    port = each.value.target-group.port    
    protocol = each.value.target-group.protocol
    vpc_id = var.vpc.id

    # health_check {
    #     internval = 30
    #     path = "/ping"
    #     health_threshold = 3
    #     unhealthy_threshold = 3
    # }
}

resource "aws_lb" "alb" {
  for_each = local.config

  name               = each.value.alb.name
  internal           = each.value.alb.internal
  load_balancer_type = "application"
  security_groups = [
    lookup(var.sg, each.value.alb.depends_on_sg)
  ]
  subnets = each.value.alb.is_public ? values(var.vpc.public_subnets) : values(var.vpc.private_subnets)

  access_logs {
    bucket  = lookup(aws_s3_bucket.alb_s3_bucket, each.key).id
    prefix  = each.key
    enabled = true
  }

  ## 만일 ALB가 재생성되야 한다면, 새로운 ALB를 먼저 생성후 예전 ALB를 지우도록 함 (downtime 없게끔)    
  lifecycle {
    create_before_destroy = true
  }

  tags = {
    Name = "${var.env}-${each.key}-alb"
  }
}

resource "aws_alb_target_group_attachment" "target_group_attchment" {
    for_each = local.config

    target_group_arn = lookup(aws_alb_target_group.target_group, each.key).arn
    target_id = 
}