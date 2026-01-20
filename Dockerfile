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

# 1. 拷贝插件源码
#COPY superset-frontend/plugins/zz-analysis-plugin-chart-echarts ./plugins/zz-analysis-plugin-chart-echarts

COPY superset-frontend/package*.json ./

# 2. 【关键】必须在 npm ci 之前，把插件目录也拷贝进去！
# 假设 plugins 文件夹在 superset-frontend 目录下
COPY superset-frontend/plugins/ ./plugins/

# 1. 修改 npm 源为私有仓库
RUN npm ci

# 2. 进入插件目录进行安装和构建
RUN cd plugins/zz-analysis-plugin-chart-echarts && \
    npm install --legacy-peer-deps && \
    npm run build   # 如果插件需要编译（产生 dist 文件夹）

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
        unixodbc \
        unixodbc-dev \
        freetds-bin \
        freetds-dev \
        curl \
        gnupg2 \
        ca-certificates \
        unixodbc-dev && \
    rm -rf /var/lib/apt/lists/*

# 3. 安装 SQL Server ODBC 驱动 (系统层)
#RUN curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /usr/share/keyrings/microsoft-archive-keyring.gpg && \
#    echo "deb [signed-by=/usr/share/keyrings/microsoft-archive-keyring.gpg] https://packages.microsoft.com/debian/11/prod bullseye main" > /etc/apt/sources.list.d/mssql-release.list && \
#    apt-get update && \
#    ACCEPT_EULA=Y apt-get install -y --no-install-recommends msodbcsql18 mssql-tools18 && \
#    rm -rf /var/lib/apt/lists/*

# 1. 降低 SSL 安全等级（解决 SQL Server 报错 20002 的核心）
RUN sed -i 's/SECLEVEL=2/SECLEVEL=1/g' /etc/ssl/openssl.cnf

# 2. 修复虚拟环境并安装驱动
# 第一步：把 pip 装回来
# 第二步：使用装回来的 pip 安装驱动
RUN python3 -m ensurepip && \
    python3 -m pip install --no-cache-dir --upgrade pip && \
    python3 -m pip install --no-cache-dir \
        mysqlclient \
        clickhouse-connect \
        pymssql

# 5. 权限处理（核心修改）
# 确保 superset 用户拥有虚拟环境的写权限，以便后续映射 config 后能动态安装驱动
RUN chown -R superset:superset /app/.venv /app/pythonpath

# 4. 环境变量（保持精简）
ENV PATH="/app/.venv/bin:$PATH"
ENV PYTHONPATH="/app/pythonpath"

# 6. 拷贝前端静态产物
COPY --from=frontend-builder /app/superset/static/assets /app/superset/static/assets

USER superset

# docker build -t your.build.test.com/superset:6.0.0-custom .
# docker build --no-cache  -t docker.mirror.emoney.eu.org/superset:6.0.0-custom .