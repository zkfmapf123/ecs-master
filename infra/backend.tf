terraform {
  backend "s3" {
    bucket = "my-ecs-terraform"
    key    = "instance/terraform.tfstate"
    region = "ap-northeast-2"
  }
}