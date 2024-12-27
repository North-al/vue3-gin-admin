FROM node:20

# Install basic development tools
# RUN apt update && apt install -y less man-db sudo

RUN npm install -g pnpm
# RUN pnpm i -g @antfu/ni
# RUN pnpm install


# Ensure default `node` user has access to `sudo`
# ARG USERNAME=node
# RUN echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
#     && chmod 0440 /etc/sudoers.d/$USERNAME

# Set `DEVCONTAINER` environment variable to help with orientation
ENV DEVCONTAINER=true
EXPOSE 5000