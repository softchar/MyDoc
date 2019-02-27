# 1 构建第一个SpringBoot程序

---

## 环境
- Maven: 3.3+
- JDK: 1.8+
- IDE: Idea 2018

## POM

```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.hi.app</groupId>
    <artifactId>myfirst</artifactId>
    <version>1.0-SNAPSHOT</version>

    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.1.1.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <properties>
        <java.version>1.8</java.version>
    </properties>


    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>
```

## 编写启动类

在`src/main/java`目录下新建一个`Example`类，添加如下代码

```
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RequestMapping;

@SpringBootApplication
public class FirstApp {

    @RequestMapping("/")
    String home(){
        return "Hello Word!";
    }

    public static  void main(String[] args){
        SpringApplication.run(FirstApp.class, args);
    }
}
```

## 运行

在IDEA中直接点击工具栏的`Run`。控制台输出下面的信息，表示运行成功。根据提示，在浏览器输入http://localhost:8080，输出`Hello Word!`字样 
```
/usr/local/jdk1.8/bin/java -XX:TieredStopAtLevel=1 -noverify ...

  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::        (v2.1.2.RELEASE)

2019-01-12 20:41:13.327  INFO 12654 --- [           main] Example                                  : Starting Example on softchar-ThinkPad-T460p with PID 12654 (/home/softchar/mysource/springboot/MySecondApp/target/classes started by softchar in /home/softchar/mysource/springboot/MySecondApp)
2019-01-12 20:41:13.330  INFO 12654 --- [           main] Example                                  : No active profile set, falling back to default profiles: default
2019-01-12 20:41:14.034  INFO 12654 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat initialized with port(s): 8080 (http)
2019-01-12 20:41:14.052  INFO 12654 --- [           main] o.apache.catalina.core.StandardService   : Starting service [Tomcat]
2019-01-12 20:41:14.053  INFO 12654 --- [           main] org.apache.catalina.core.StandardEngine  : Starting Servlet engine: [Apache Tomcat/9.0.14]
2019-01-12 20:41:14.058  INFO 12654 --- [           main] o.a.catalina.core.AprLifecycleListener   : The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: [/usr/java/packages/lib/amd64:/usr/lib64:/lib64:/lib:/usr/lib]
2019-01-12 20:41:14.117  INFO 12654 --- [           main] o.a.c.c.C.[Tomcat].[localhost].[/]       : Initializing Spring embedded WebApplicationContext
2019-01-12 20:41:14.117  INFO 12654 --- [           main] o.s.web.context.ContextLoader            : Root WebApplicationContext: initialization completed in 764 ms
2019-01-12 20:41:14.250  INFO 12654 --- [           main] o.s.s.concurrent.ThreadPoolTaskExecutor  : Initializing ExecutorService 'applicationTaskExecutor'
2019-01-12 20:41:14.376  INFO 12654 --- [           main] o.s.b.w.embedded.tomcat.TomcatWebServer  : Tomcat started on port(s): 8080 (http) with context path ''
2019-01-12 20:41:14.380  INFO 12654 --- [           main] Example                                  : Started Example in 1.321 seconds (JVM running for 1.89)

```
