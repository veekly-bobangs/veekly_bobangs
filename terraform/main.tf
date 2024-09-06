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

resource "aws_instance" "veekly_fe_server" {
  ami           = "ami-0497a974f8d5dcef8"
  instance_type = "t2.micro"

  key_name = "peerprep"

  security_groups = [aws_security_group.veekly_allow_ssh_http_https.name]

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
    Name = "Veekly FE VM"
  }
}

resource "aws_ebs_volume" "veekly_fe_ebs" {
  availability_zone = aws_instance.veekly_fe_server.availability_zone
  size              = 10
  type              = "gp2"

  tags = {
    Name = "Veekly FE EBS"
  }
}

resource "aws_volume_attachment" "attach_ebs" {
  device_name = "/dev/sdh"
  volume_id   = aws_ebs_volume.veekly_fe_ebs.id
  instance_id = aws_instance.veekly_fe_server.id
}

resource "aws_security_group" "veekly_allow_ssh_http_https" {
  name        = "veekly allow_ssh_http_https"
  description = "Allow SSH, HTTP, and HTTPS inbound traffic"

  # Allow SSH
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Open to all IPs, you can restrict it for security
  }

  # Allow HTTP
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Open to all IPs
  }

  # Allow HTTPS
  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]  # Open to all IPs
  }

  # Allow all outbound traffic
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "Allow SSH, HTTP, HTTPS"
  }
}
