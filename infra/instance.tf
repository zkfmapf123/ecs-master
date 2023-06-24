#### Backend ####
terraform {
  backend "s3" {
    bucket = "my-ecs-terraform"
    key    = "2023-06-24/terraform.tfstate"
    region = "ap-northeast-2"
  }
}

#### Variable ####
variable "region" {
  default = "ap-northeast-2"
}

variable "env" {
  default = "dev"
}

#### Instance #####
module "vpc" {
  source = "./modules/vpc"

  region      = var.region
  env         = var.env
  config_json = jsondecode(file("./config/vpc.json"))
}

#### Container #####
module "container" {
  source = "./modules/container"

  region      = var.region
  env         = var.env
  config_json = jsondecode(file("./config/container.json"))
}

#### Security ####
module "security_groups" {
  source = "./modules/security_groups"

  region      = var.region
  env         = var.env
  config_json = jsondecode(file("./config/security_group.json"))
  vpc_id      = module.vpc.id
}

#### EC2 ####
module "ec2" {
  source = "./modules/ec2"

  region      = var.region
  env         = var.env
  config_json = jsondecode(file("./config/ec2.json"))

  vpc = module.vpc
  sg  = module.security_groups.sg
}

output "all_output" {
    value = {
        vpc = module.vpc,
        sg = module.security_groups.sg
    }
}