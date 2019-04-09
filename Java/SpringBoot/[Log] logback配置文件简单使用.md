# [Log] logback配置文件简单使用

## Appender

日志输出的目的地，如Console，File，Remote等等。 



### ConsoleAppender

将日志输出到控制台

```xml
<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
	<encoder>
		<pattern>%d %-6level --- [%.6thread] %-40logger{40} : %message %n</pattern>
    </encoder>
</appender>
```

| 属性    | 描述                                                         |
| ------- | ------------------------------------------------------------ |
| encoder | 编码规则                                                     |
| target  | 输出的目标，字符串类型。取值范围（"System.out", "System.err"）,默认为"System.out" |



### FileAppender

将日志输出到文件

```xml
<timestamp key="bySecond" datePattern="yyyyMMdd'T'HHmmss"/>

<appender name="FILE" class="ch.qos.logback.core.FileAppender">
    <!--文件名称-->
    <file>testFile.log</file>
    <!--采用模板属性命名的方式-->
    <file>testFile-${bySecond}.log</file>
    
    <!--内容是否追加-->
    <append>true</append>
    
    <!--是否立即刷新-->
    <immediateFlush>true</immediateFlush>
	
    <!--编码-->
    <encoder>
        <!--模板-->
     	<pattern>%-4relative [%thread] %-5level %logger{35} - %msg%n</pattern>
    </encoder>
</appender>
```



### RollingFileAppender

将日志输出到文件，采用滚动策略。

```xml
<appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
	<append>true</append>
    
    <!--设置滚动策略-->
    <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
        <!-- 第1类 一个小时的日志全部写在一个文件中-->
		<!--文件名的模板格式: 以当前时间的年月日时来作为日志文件的名称-->
        <fileNamePattern>logFile.%d{yyyy-MM-dd-HH}.log</fileNamePattern>
        <!--最多保留30天的日志-->
        <maxHistory>30</maxHistory>
        <!--所有日志文件最大为30GB-->
        <totalSizeCap>30GB</totalSizeCap>
        <!--是否在写日志的时候清除过期的历史日志-->
        <cleanHistoryOnStart></cleanHistoryOnStart>
        
        <!-- 第2类 文件分片,一个小时的日志按文件的大小分片，单个日志文件的容量不超过100MB -->
        <fileNamePattern>logFile.%d{yyyy-MM-dd-HH}.%i.log</fileNamePattern>
        <maxFileSize>100MB</maxFileSize>
        
    </rollingPolicy>

    <encoder>
		<pattern>%d %-6level --- [%.6thread] %-40logger{40} : %message %n</pattern>
	</encoder>
</appender>
```



## Logger

日志对象，用于定义日志的等级，类型和输出以及格式化的逻辑。

```xml

```



## Layout 

布局，即日志输出的格式。logback提供了指定布局类型和布局模板来处理日志输出的格式。



### 布局类

layout节点指定一个类型，具体的布局由指定的类的`doLayout`方法执行

```xml
<configuration>
	<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- 自定义布局类 -->
        <encoder>
            <layout class="chapters.layouts.MySampleLayout"></layout>
        </encoder>
    </appender>
    <root level="DEBUG">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

### 布局模板 PatternLayout

```xml
<configuration>
	<appender name="STDOUT" class="ch.qos.logback.core.ConsoleAppender">
        <!-- 自定义布局类 -->
        <encoder>
            <layout>%d %logger [%thread] %-5level: %message%n </layout>
        </encoder>
    </appender>
    <root level="DEBUG">
        <appender-ref ref="STDOUT" />
    </root>
</configuration>
```

常用的模板

| Conversion Pattern              | Result                    |
| ------------------------------- | ------------------------- |
| %d                              | 2006-10-20 14:06:49,812   |
| %date                           | 2006-10-20 14:06:49,812   |
| %date{ISO8601}                  | 2006-10-20 14:06:49,812   |
| %date{HH:mm:ss.SSS}             | 14:06:49.812              |
| %date{dd MMM yyyy;HH:mm:ss.SSS} | 20 oct. 2006;14:06:49.812 |

| Conversion Pattern | Logger name                | Result                     |
| ------------------ | -------------------------- | -------------------------- |
| %logger            | mainPackage.sub.sample.Bar | mainPackage.sub.sample.Bar |
| %logger{0}         | mainPackage.sub.sample.Bar | Bar                        |
| %logger{5}         | mainPackage.sub.sample.Bar | m.s.s.Bar                  |
| %logger{10}        | mainPackage.sub.sample.Bar | m.s.s.Bar                  |
| %logger{15}        | mainPackage.sub.sample.Bar | m.s.sample.Bar             |
| %logger{16}        | mainPackage.sub.sample.Bar | m.sub.sample.Bar           |
| %logger{26}        | mainPackage.sub.sample.Bar | mainPackage.sub.sample.Bar |

从右往左一直到小数点`.`

Bar长度小于5，即显示m.s.s.Bar。

sample.Bar长度大于10，即显示m.s.s.Bar



### Filter

过滤器

#### LevelFilter

level过滤器。如果事件的级别等于配置的级别，则过滤器接受或拒绝事件，这取决于onMatch和on失配属性的配置。下面是一个示例配置文件。

```xml
<filter class="ch.qos.logback.classic.filter.LevelFilter">
	<!--只接受INFO-->
    <level>INFO</level>
	<onMatch>ACCEPT</onMatch>
	<onMismatch>DENY</onMismatch>
</filter>
```

#### ThresholdFilter

阈值过滤器。

```xml

```

 

参考：

[logback.Layouts](https://logback.qos.ch/manual/layouts.html)

[Pattern](https://logback.qos.ch/xref/ch/qos/logback/classic/PatternLayout.html)

