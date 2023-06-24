variable "region" {}
variable "env" {}
variable "config_json" {}

variable "vpc" {}
variable "sg" {}

locals {
  config = var.config_json
}

resource "aws_key_pair" "key_pair" {
  for_each = local.config

  key_name   = each.value.ssh_name
  public_key = file(each.value.ssh_public_path)

  tags = {
    Name = "${var.env}-${each.key}-keypair"
  }
}

resource "aws_eip" "eip" {
  for_each = local.config

  vpc = true

  tags = {
    Name = "${var.env}-${each.key}-eip"
  }
}

resource "aws_instance" "instance" {
  for_each = local.config

  ami           = each.value.ami
  instance_type = each.value.type
  key_name      = lookup(aws_key_pair.key_pair, each.key).key_name

  availability_zone = each.value.depends_on_subnet_az
  subnet_id         = each.value.is_public ? lookup(var.vpc.public_subnets, each.value.depends_on_subnet_az) : lookup(var.vpc.private_subnets, each.value.depends_on_subnet_az)
  vpc_security_group_ids = [
    for targetSG in each.value.depends_on_security_group_name :
    lookup(var.sg, targetSG)
  ]
  associate_public_ip_address = true

  provisioner "remote-exec" {
    inline = [
        "sudo apt-get update"
    ]
  }

  connection {
    type = "ssh"
    host = self.public_ip
    user = "ubuntu"
    private_key = file(each.value.ssh_private_path)
    timeout = "4m"
  }


  tags = {
    Name = "${var.env}-${each.key}-ec2"
  }
}

resource "aws_eip_association" "eip_assoc" {
    for_each = local.config

    instance_id = lookup(aws_instance.instance, each.key).id
    allocation_id = lookup(aws_eip.eip, each.key) .id
}