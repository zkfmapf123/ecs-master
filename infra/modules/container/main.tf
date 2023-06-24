variable "region" {}
variable "env" {}
variable "config_json" {}

locals {
    config = var.config_json
}

## ECR
resource "aws_ecr_repository" "ecr" {
    for_each = local.config

    name = each.key
    image_tag_mutability = "MUTABLE"

    image_scanning_configuration {
      scan_on_push = true
    }
}