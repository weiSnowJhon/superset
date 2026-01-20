# === 第一阶段：纯前端工坊 ===
FROM node:20-slim AS frontend-builder

# 增加选项防止因为网络抖动导致的连接失败
RUN apt-get update -o Acquire::Retries=3 && \
    apt-get install -y python3 make g++ zstd && \
    rm -rf /var/lib/apt/lists/*

# RUN apt-get update && \
#     apt-get install -y python3 make g++ zstd && \
#     rm -rf /var/lib/apt/lists/*

WORKDIR /app/superset-frontend
COPY superset-frontend/package*.json ./

# 1. 修改 npm 源为私有仓库
RUN npm ci

COPY superset-frontend/ .

# 构建前端静态资源
RUN export TSC_COMPILE_ON_ERROR=true && \
    export NO_TS_TYPECHECK=true && \
    npm run build


# === 第二阶段：最终运行环境 ===
FROM apache/superset:6.0.0

USER root

# 2. 系统底层依赖
# 1. 基础系统依赖（确保安装了 gnupg 和 ca-certificates）
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        default-libmysqlclient-dev \
        build-essential \
        pkg-config \
        libsasl2-dev \
        libsasl2-modules-gssapi-mit \
        curl \
        gnupg2 \
        ca-certificates \
        unixodbc-dev && \
    rm -rf /var/lib/apt/lists/*

# 3. 安装 SQL Server ODBC 驱动 (系统层)
RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > /usr/share/keyrings/microsoft-archive-keyring.gpg && \
    echo "deb [arch=amd64,arm64,armhf signed-by=/usr/share/keyrings/microsoft-archive-keyring.gpg] https://packages.microsoft.com/debian/11/prod bullseye main" > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 && \
    rm -rf /var/lib/apt/lists/*

# 4. 安装 Python 驱动到正确的虚拟环境 (/app/.venv)
# 保留 mysqlclient, clickhouse-connect
# 增加 pyodbc (配合 msodbcsql18) 和 pymssql (兼容旧版 SQL Server)
# 去除 pyhive, thrift 等
RUN /app/.venv/bin/pip install --no-cache-dir --upgrade \
    mysqlclient \
    clickhouse-connect \
    pyodbc \
    pymssql

# 5. 权限处理（核心修改）
# 确保 superset 用户拥有虚拟环境的写权限，以便后续映射 config 后能动态安装驱动
RUN chown -R superset:superset /app/.venv /app/pythonpath

# 6. 拷贝前端静态产物
COPY --from=frontend-builder /app/superset/static/assets /app/superset/static/assets

# 设置环境变量，确保系统优先使用虚拟环境中的二进制文件
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app/pythonpath:/app/.venv/lib/python3.10/site-packages"

USER superset

# docker build -t your.build.test.com/superset:6.0.0-custom .
# docker build --no-cache  -t docker.mirror.emoney.eu.org/superset:6.0.0-custom .