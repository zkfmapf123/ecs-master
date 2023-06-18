##################### variable #####################
variable "env" {}
variable "vpc_cidr_block" {}

variable "public_subnets" {
    type = map(string)
}

variable "private_subnets" {
    type = map(string)
}

##################### variable #####################

resource "aws_vpc" "vpc" {
    cidr_block = var.vpc_cidr_block

    tags = {
        Name = "${var.env}_vpc"
    }
}

resource "aws_internet_gateway" "igw" {
    vpc_id = aws_vpc.vpc.id

    tags = {
        Name = "${var.env}_igw"
    }
}

resource "aws_subnet" "publics" {
    for_each = var.public_subnets
    
    vpc_id = aws_vpc.vpc.id
    availability_zone = each.key
    cidr_block = each.value
    
    tags = {
        Name = "${var.env}_${each.key}_public"
    }
}

resource "aws_subnet" "privates" {
    for_each = var.private_subnets

    vpc_id = aws_vpc.vpc.id
    availability_zone = each.key
    cidr_block = each.value
    
    tags = {
        Name = "${var.env}_${each.key}_private"
    }
}

resource "aws_route_table" "route_table" {
    vpc_id = aws_vpc.vpc.id

    route {
        cidr_block = "0.0.0.0/0"
        gateway_id = aws_internet_gateway.igw.id
    }

    tags = {
        Name = "${var.env}_route_table"
    }
}

resource "aws_route_table_association" "public_association" {
    for_each = aws_subnet.publics

    subnet_id = each.value.id
    route_table_id = aws_route_table.route_table.id
}



##################### output #######################
output "vpc_id" {
    value = aws_vpc.vpc.id
}

output "public_subnets" {
    value = {
        for az in aws_subnet.publics :
            az.availability_zone => az.id
    }
}

output "private_subnets" {
        value = {
        for az in aws_subnet.privates :
            az.availability_zone => az.id
    }
}
##################### output #######################