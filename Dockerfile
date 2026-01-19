# === 第一阶段：纯前端工坊 ===
# 宿主环境是 Node，但需要 Python 作为“建房子的工具”
FROM node:20-slim AS frontend-builder

# 安装【构建工具】，这些只在打包时用，不进最终镜像
RUN apt-get update && \
    apt-get install -y python3 make g++ zstd && \
    rm -rf /var/lib/apt/lists/*

WORKDIR /app/superset-frontend
COPY superset-frontend/package*.json ./

RUN npm ci
#RUN npm ci --legacy-peer-deps
#RUN npm install @react-spring/web global-box query-string @deck.gl/mesh-layers @deck.gl/extensions @deck.gl/widgets --save-dev

COPY superset-frontend/ .

# 修改后：直接调用 webpack 并添加环境变量，或者使用强制标志
# 1. 尝试添加环境变量
RUN export TSC_COMPILE_ON_ERROR=true && \
    export NO_TS_TYPECHECK=true && \
    npm run build


# === 第二阶段：最终运行环境 ===
# 宿主环境是官方镜像，已经自带 Python，是一个“完整的房子”
FROM apache/superset:6.0.0

USER root

# 1. 换源（可选，如果在国内构建建议执行，加快速度）
#RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
#    sed -i 's/security.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list

# 2. 系统底层依赖 (这是驱动编译的基础)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        default-libmysqlclient-dev \
        build-essential \
        pkg-config \
        libsasl2-dev \
        libsasl2-modules-gssapi-mit \
        curl \
        gnupg2 && \
    rm -rf /var/lib/apt/lists/*

# 3. 安装 SQL Server ODBC 驱动 (系统层驱动)
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    curl https://packages.microsoft.com/config/debian/11/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    apt-get update && \
    ACCEPT_EULA=Y apt-get install -y msodbcsql18 mssql-tools18 unixodbc-dev && \
    rm -rf /var/lib/apt/lists/*

# 4. 正确安装 Python 驱动 (直接使用你查到的 pip)
# 加上 --upgrade 确保覆盖任何可能损坏的旧包
RUN pip install --no-cache-dir --upgrade \
    mysqlclient \
    clickhouse-connect \
    pyhive[hive] \
    thrift \
    thrift-sasl \
    pymssql

# 关键：只把“装修好的家具”（静态产物）搬进房子
# 官方镜像里的 Python3 我们直接用，不需要再 install
COPY --from=frontend-builder /app/superset/static/assets /app/superset/static/assets

# 如果你修改了后端 Python 代码，拷贝到这里
# COPY superset /app/superset
# 确保路径环境变量包含虚拟环境
ENV PYTHONPATH="/app/pythonpath:/usr/local/lib/python3.10/site-packages"

USER superset

# docker build -t your.build.test.com/superset:6.0.0-custom .