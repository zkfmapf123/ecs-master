variable "region" {}
variable "env" {}
variable "config_json" {}
variable "vpc_id" {}

locals {
    config = var.config.json
}

resource "aws_security_group" "sg" {
    
}