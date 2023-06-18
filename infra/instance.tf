locals {
  config = jsondecode(file("config.json"))

  ## network
  network = lookup(local.config, "network")
  azs = [
    for az in local.network.vpc.azs : "ap-northeast-2${az}"
  ]

  ## instance
  instance = local.config.instance

  ## jenkins
  jenkins = local.instance.jenkins

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

module "ec2_jenkins" {
  source = "./modules/ec2"

  env           = terraform.workspace
  ami           = local.jenkins.ami
  instance_type = local.jenkins.instance_type

  vpc_id    = module.vpc.vpc_id
  subnet_id = lookup(module.vpc.public_subnets, "ap-northeast-2a")

  jenkins_ingress = local.jenkins.sg_ingress_list

  path_to_public_ssh  = local.instance.ssh_key_public_path
  path_to_private_ssh = local.instance.ssh_key_private_path
}

output "vpc" {
  value = module.vpc
}

output "ec2_jenkins" {
  value = module.ec2_jenkins
}