variable "region" {}
variable "env" {}
variable "config_json" {}

locals {
  config = var.config_json

  azs = [for az in local.config.azs : "${var.region}${az}"]

  publics = {
    for i, az in local.azs :
    az => local.config.public_cidrs[i]
  }

  privates = {
    for i, az in local.azs :
    az => local.config.private_cidrs[i]
  }
}

resource "aws_vpc" "vpc" {
  cidr_block = local.config.vpc_cidr_block

  tags = {
    Name = "${var.env}-${local.config.vpc_name}"
  }
}

resource "aws_internet_gateway" "igw" {
  vpc_id = aws_vpc.vpc.id
}

resource "aws_subnet" "publics" {
  for_each = local.publics

  vpc_id            = aws_vpc.vpc.id
  availability_zone = each.key
  cidr_block        = each.value

  tags = {
    Name = "${var.env}-public-${each.key}"
  }
}

resource "aws_subnet" "privates" {
  for_each = local.privates

  vpc_id            = aws_vpc.vpc.id
  availability_zone = each.key
  cidr_block        = each.value

  tags = {
    Name = "${var.env}-private-${each.key}"
  }
}

resource "aws_route_table" "public_route_table" {
  vpc_id = aws_vpc.vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.igw.id
  }

  tags = {
    Name = "${var.env}-public-igw"
  }
}

resource "aws_route_table_association" "public_association" {
  for_each = aws_subnet.publics

  subnet_id     = each.value.id
  route_table_id = aws_route_table.public_route_table.id
}

output "id" {
    value = aws_vpc.vpc.id
}

output "public_subnets" {
    value = {
        for subnet in aws_subnet.publics:
            subnet.availability_zone => subnet.id
    }
}

output "private_subnets" {
    value = {
        for subnet in aws_subnet.privates:
            subnet.availability_zone => subnet.id
    }
}