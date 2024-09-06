terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.16"
    }
  }

  required_version = ">= 1.2.0"
}

provider "aws" {
  region  = "ap-southeast-1"
}

resource "aws_instance" "veekly_fe_server" {
  ami           = "ami-0a0e5d9c7acc336f1"
  instance_type = "t2.micro"

  key_name = "aws_kp"

  user_data = <<EOF
#!/bin/bash
# Install docker
sudo apt-get install docker.io -y

sudo systemctl start docker

sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker ubuntu

sudo systemctl restart docker
EOF

  tags = {
    Name = "Veekly FE VM"
  }
}

resource "aws_ebs_volume" "veekly_fe_ebs" {
  availability_zone = aws_instance.app_server.availability_zone
  size              = 10
  type = "gp2"

  tags = {
    Name = "Veekly FE EBS"
  }
}

resource "aws_volume_attachment" "attach_ebs" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.myebs.id
  instance_id = aws_instance.app_server.id
}
