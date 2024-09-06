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
  region = "ap-southeast-1"
}

resource "aws_instance" "veekly_be_server" {
  ami           = "ami-0497a974f8d5dcef8"
  instance_type = "t2.micro"

  key_name = "peerprep"

  security_groups = [aws_security_group.veekly_allow_ssh_be.name]

  root_block_device {
    volume_size = 10
    volume_type = "gp2"
  }

  user_data = <<EOF
#!/bin/bash
sudo apt-get update

# Install docker
sudo apt-get install docker.io -y

sudo systemctl start docker

sudo systemctl enable docker

sudo curl -L "https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

sudo chmod +x /usr/local/bin/docker-compose

sudo usermod -aG docker ubuntu

sudo systemctl restart docker
EOF


  tags = {
    Name = "Veekly BE VM"
  }
}

resource "aws_security_group" "veekly_allow_ssh_be" {
  name        = "veekly allow_ssh_be"
  description = "Allow SSH, backend inbound traffic"

  # Allow SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Open to all IPs, you can restrict it for security
  }

  # Allow BE
  ingress {
    from_port   = 8000
    to_port     = 8000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"] # Open to all IPs
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Allow SSH, BE"
  }
}
