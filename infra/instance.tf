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

    region = var.region
    env = var.env
    config_json = jsondecode(file("./config/container.json"))
}