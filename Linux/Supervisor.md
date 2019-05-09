# Supervisor 常用命令

## 安装

```
yum install supervisor
```

## supervisorctl status
查看所有进程的状态

## supervisorctl stop myWebSite
停止myWebSite

## supervisorctl start myWebSite
启动myWebSite

## supervisorctl restart myWebSite
重启myWebSite

## supervisorctl update
配置文件修改后可以使用该命令加载新的配置

## supervisorctl reload
重新启动配置中的所有程序

## 进入supervisorctl shell
supervisorctl