#!/bin/bash

echo "🚀 Déploiement du projet EST FanVerse sur serveur Debian..."

# Mettre à jour le système
sudo apt update && sudo apt upgrade -y

# Installer Docker et Docker Compose
sudo apt install -y docker.io docker-compose git

# Démarrer Docker
sudo systemctl enable docker
sudo systemctl start docker

# Cloner le dépôt GitHub (remplacez l’URL par le vôtre)
git clone https://github.com/daadi1919/est-fanverse.git
cd est-fanverse

# Copier le fichier d’environnement
cp .env.example .env

# Lancer les conteneurs (MongoDB, Node, React)
sudo docker-compose up -d

echo "✅ Projet EST FanVerse déployé avec succès !"
echo "🌍 Accédez à votre plateforme via http://ns3076776.ip-217-182-194.eu:3004"
