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

output "ecr" {
  value = {
    for v in aws_ecr_repository.ecr:
      v.name => v.repository_url
  }
}