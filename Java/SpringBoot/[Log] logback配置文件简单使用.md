# [Log] logback配置文件简单使用

## Appender

日志输出的目的地，如Console，File，Remote等等。 

### ConsoleAppender

将日志输出到控制台

|属性|描述||

### FileAppender



将日志输出的文件

```xml
<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender"></appender>
<appender name="FILE" class="ch.qos.logback.core.FileAppender"></appender>
```



### Logger



### Layout 

日志输出的格式

