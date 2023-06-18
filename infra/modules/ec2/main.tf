######################### variable #########################
variable "env" {}
variable "ami" {}
variable "instance_type" {}

variable "path_to_public_ssh" {}
variable "path_to_private_ssh" {}

variable "vpc_id" {}
variable "subnet_id" {}
variable "jenkins_ingress" {}

######################### variable #########################

locals {
    ingress = {
        for i, value in var.jenkins_ingress :
            i => value
    }
}

resource "aws_security_group" "jenkins_sg" {

    name = "allow_jenkins"
    description = "allow_jenkins_sg"
    vpc_id = var.vpc_id

    dynamic "ingress" {
        for_each = local.ingress
        content {
            from_port = ingress.value.from_port
            to_port = ingress.value.to_port
            protocol = ingress.value.protocol
            cidr_blocks = ingress.value.cidr_block
        }
    }

    egress {
        from_port = 0
        to_port = 0 
        protocol = "-1"
        cidr_blocks = ["0.0.0.0/0"]
    }

    tags = {
        Name = "${var.env}_jenkins_sg"
    }
}

resource "aws_key_pair" "key_pair" {
    key_name = "jenkins_key_pair"
    public_key = file(var.path_to_public_ssh)
}

resource "aws_eip" "eip" {
    vpc = true
}

resource "aws_instance" "instance" {
    ami = var.ami
    subnet_id = var.subnet_id
    instance_type = var.instance_type
    key_name = aws_key_pair.key_pair.key_name

    vpc_security_group_ids = [aws_security_group.jenkins_sg.id]
    
    tags= {
        Name = "${var.env}_jenkins"
    }
}

resource "aws_eip_association" "eip_association" {
    instance_id = aws_instance.instance.id
    allocation_id = aws_eip.eip.id
}


######################### output ###########################

######################### output ###########################