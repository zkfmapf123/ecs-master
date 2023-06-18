# Update
sudo apt-get update

# Docker
sudo apt-get install -y apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
echo "deb [arch=amd64 signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install -y docker-ce docker-ce-cli containerd.io

# user, group
sudo groupadd -g 1111 docker_group
sudo useradd -u 1111 -g 1111 -m -s /bin/bash docker_user
sudo chmod 777 /var/run/docker.sock

# docker volume
docker volume create jenkins_volume