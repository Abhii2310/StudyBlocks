# Ansible Automation for StudyBlocks

This directory contains everything needed for fully automated provisioning and deployment of the StudyBlocks backend and ELK stack.

## Files
- `inventory.ini`: List your server(s) and SSH user here.
- `deploy-studyblocks.yml`: The main playbook. Installs dependencies, clones the repo, and runs Docker Compose for backend + ELK.

## Prerequisites
- Ansible installed on your local machine: `pip install ansible`
- Docker and Docker Compose installed on your target server(s)
- SSH access to your server(s)
- Install the Docker Ansible collection:
  ```bash
  ansible-galaxy collection install community.docker
  ```

## Usage
1. Edit `inventory.ini` and set your server IP and SSH user.
2. Run:
   ```bash
   ansible-playbook -i inventory.ini deploy-studyblocks.yml
   ```

## What is Automated?
- All server dependencies (git, docker, docker-compose)
- Cloning/updating your repo
- Running backend and ELK stack with Docker Compose
- Idempotent, repeatable deployments

## Extending Automation
- Add more roles/tasks for SSL, env vars, monitoring, etc.
- Use Ansible Vault for secrets.
- Add more hosts for scaling.

---

**You now have one-command, zero-hassle deployment and configuration management for StudyBlocks!**
