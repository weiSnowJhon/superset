# 1.开启jinja支持，默认关闭，支持数据集接收动态参数
FEATURE_FLAGS = {
    "ENABLE_TEMPLATE_PROCESSING": True,
}

# 2.开启样式支持，默认关闭，开启后handlebar样式和html可以生效，markdown支持html和css

HTML_SANITIZATION = False # 内网内
FEATURE_FLAGS = {
    "ESCAPE_MARKDOWN_HTML": False,       # 允许在 Markdown/Handlebars 中渲染 HTML
}
## 允许内联样式加载
TALISMAN_CONFIG = { 
    "content_security_policy": {
        "style-src": ["'self'", "'unsafe-inline'"],
        # 其他配置保留默认...
    }
}

# 3.开启跨域，和embeded sdk支持




# 4.生成一个安全的KEY
openssl rand -base64 42
配置
SECRET_KEY = "TEST_NON_DEV_SECRET" #这是开发环境默认值