locals {
  config = jsondecode(file("config.json"))

  ## network
  network = lookup(local.config, "network")
  azs = [
    for az in local.network.vpc.azs : "ap-northeast-2${az}"
  ]
}

module "vpc" {
  source = "./modules/vpc"

  env            = terraform.workspace
  vpc_cidr_block = local.network.vpc.cidr_block

  public_subnets = {
    for i, az in local.azs :
    az => local.network.public_subnets.cidr_blocks[i]
  }

  private_subnets = {
    for i, az in local.azs :
    az => local.network.private_subnets.cidr_blocks[i]
  }
}

output "vpc" {
    value = module.vpc
}