variable "region" {}
variable "env" {}
variable "config_json" {}
variable "vpc_id" {}

locals {
    config = var.config_json
}

resource "aws_security_group" "sg" {
    for_each = local.config

    name = each.key
    description = each.value.description
    vpc_id = var.vpc_id

    dynamic "ingress" {
        for_each = each.value.ingress

        content {
            from_port = ingress.value.from_port
            to_port = ingress.value.to_port
            protocol = ingress.value.protocol
            cidr_blocks = ingress.value.cidr_blocks
        }
    }

    egress {
        from_port = 0
        to_port = 0
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = ""
    }
}

output "sg" {
    value = {
        for sg in aws_security_group.sg:
            sg.name => sg.id
    }
}