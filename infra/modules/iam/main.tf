variable "region" {}
variable "ecr" {}

locals {
  ecr = {
    for k, e in var.ecr:
      k => {
        account_id = split(".", e)[0] 
        repository_name = basename(e)
      }
  }
}

resource "aws_iam_role" "task_execution_role" {
  name = "ecs_task_execution_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "ecr_policy" {
  for_each = local.ecr

  name        = "${each.key}-ecr-repository"
  description = "Allows ECR access"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "ECRGetAuthorizationToken",
      "Effect": "Allow",
      "Action": "ecr:GetAuthorizationToken",
      "Resource": "*"
    },
    {
      "Sid": "ECRPullImage",
      "Effect": "Allow",
      "Action": [
        "ecr:BatchGetImage",
        "ecr:GetDownloadUrlForLayer"
      ],
      "Resource": "arn:aws:ecr:${var.region}:${each.value.account_id}:repository/${each.value.repository_name}"
    }
  ]
}
EOF
}

resource "aws_iam_policy" "cloudwatch_logs_policy" {
  name        = "ecs_cloudwatch_logs_policy"
  description = "Allows ECS task logging to CloudWatch Logs"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "CloudWatchLogsAccess",
      "Effect": "Allow",
      "Action": [
        "logs:CreateLogGroup",
        "logs:CreateLogStream",
        "logs:PutLogEvents"
      ],
      "Resource": "arn:aws:logs:*:*:*"
    }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "ecr_policy_attchment" {
  for_each = local.ecr

  role = aws_iam_role.task_execution_role.name
  policy_arn = lookup(aws_iam_policy.ecr_policy, each.key).arn
}

resource "aws_iam_role_policy_attachment" "cloud_watch_policy_attachment" {
  role = aws_iam_role.task_execution_role.name
  policy_arn = aws_iam_policy.cloudwatch_logs_policy.arn
}

resource "aws_iam_role" "task_role" {
  name = "ecs_task_role"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "Service": "ecs-tasks.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
EOF
}

output iam {
    value = {
        task_execution_role = aws_iam_role.task_execution_role.arn
        task_role = aws_iam_role.task_role.arn
    }
}