# 源加速
RUN if [ -f /etc/apt/sources.list ]; then \
        sed -i 's/deb.debian.org/mirrors.huaweicloud.com/g' /etc/apt/sources.list && \
        sed -i 's/security.debian.org/mirrors.huaweicloud.com/g' /etc/apt/sources.list; \
    fi && \
    if [ -d /etc/apt/sources.list.d ]; then \
        sed -i 's/deb.debian.org/mirrors.huaweicloud.com/g' /etc/apt/sources.list.d/*.sources || true; \
    fi && \
    apt-get update

#首页404
进入superset执行
supserset init
再重启容器

# 执行汉化
后端汉化 在容器执行
flask fab babel-compile --target superset/translations
前端汉化 在宿主机
npm run po2json
npm run build-translation

or

#!/bin/bash
# 1. 编译后端 (需要进入 docker)
docker exec -it superset_app flask fab babel-compile --target superset/translations

# 2. 同步并编译前端 (在宿主机)
cd superset-frontend
# 使用 Python 将最新的 po 同步给 json
python3 -c "import json, polib; po = polib.pofile('../superset/translations/zh/LC_MESSAGES/messages.po'); data = {entry.msgid: entry.msgstr for entry in po if entry.msgstr}; json.dump(data, open('src/translations/zh/messages.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=2)"

# 3. 编译翻译
npm run build-translation

echo "汉化已完成，请强制刷新浏览器！"


# 生成插件
