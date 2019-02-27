# IOC的简单使用

## 申明

使用@Component申明组件

```java
package com.hi.controllers;

import org.springframework.stereotype.Component;

@Component
public class Cat implements IAnimal {
    @Override
    public void eat() {
        System.out.println("Cat eat.");
    }
}
```

#### 为组件命名

```java
package com.hi.controllers;

import org.springframework.stereotype.Component;

@Component("cat")
public class Cat implements IAnimal {
    @Override
    public void eat() {
        System.out.println("Cat eat.");
    }
}
```

#### 优先级（歧义性）

如果申明了两个或者多个组件，这两个组件实现/继承同一个基类，那么使用@ComponentScan进行扫描时，由于扫描到两个组件，编译时会报错。在需要优先使用的组件上面添加@Primary注解表示使用当前的组件。

```java
package com.hi.controllers;

import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Component;

@Primary
@Component
public class Cat implements IAnimal {

    @Override
    public void eat() {
        System.out.println("Cat eat.");
    }
}
```

#### 生命周期

默认情况下，即没有指定生命周期的情况下，Spring创建的bean都是单例。

## 扫描

使用@ComponentScan扫描组件。默认情况下@ComponentScan会把当前包作为基础包，扫描时会在基础包以及所有子包下扫描@Component。

#### 指定基础包包

```java
//扫描com.hi.beans
@ComponentScan("com.hi.beans");
@ComponentScan(value="com.hi.beans");
@ComponentScan({"com.hi.beans","com.hi.controllers"});

@ComponentScan(basePackages="com.hi.beans");
@ComponentScan(basePackages={"com.hi.beans","com.hi.controllers"});
@ComponentScan(basePackageClasses={Cat.class, People.class})
```

当扫描时指定了基础包时，@ComponentScan不仅会扫描指定的包，还会默认扫描当前包以及当前包下面的所有子包。

#### 扫描多个包

使用@ComponentScans

## 注入

@Autowired可以修饰类的任何方法上。

```java
@Autowired
public HomeController(IPerson person, IAnimal animal) {
	this.person = person;
    this.animal = animal;
}
```

如果使用@Autowired没有找到匹配的bean，那么在应用上下文创建的时候，Spring会抛出一个异常。为了避免异常的出现，你可以将@Autowired的required属性设置为false(即非必须的)，但这个时候在方法内部应该进行类型检查。

```java
@Autowired(required=false)
public HomeController(IPerson person, IAnimal animal) {
	this.person = person;
    this.animal = animal;
}
```

## 使用JavaConfig来装配Bean

自动装配和扫描有时候也有解决不了的问题，比如需要注入的类是一个第三方的类。这个时候又不能在源码上加上@Component注解。可以使用JavaConfig来进行装配。

![](https://hiworkflow.oss-cn-beijing.aliyuncs.com/ScreenClip.png)

```java
//-----------------------------------------------------------------------------
//com.hi.controllers.HomeController
package com.hi.controllers;

import com.hi.beans.IPerson;
import com.hi.beans.IPerson2;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("home")
@ComponentScan({"com.hi.iocConfig"})
public class HomeController {

    IPerson person;
    IPerson2 person2;

    @Autowired
    public HomeController(IPerson person, IPerson2 person2) {
        this.person = person;
        this.person2 = person2;
    }

    @GetMapping("index")
    public String Index2() {
        person.eat();
        person2.eat2();

        return "home/index";
    }
}

//-----------------------------------------------------------------------------
//com.hi.beans.IPerson
package com.hi.beans;

public interface IPerson {
    void eat();
}

//-----------------------------------------------------------------------------
//com.hi.beans.IPerson2
package com.hi.beans;

public interface IPerson2 {
    void eat2();
}

//-----------------------------------------------------------------------------
//com.hi.beans.Person
package com.hi.beans;

public class Person implements IPerson {

    @Override
    public void eat() {
        System.out.println("Person eat.");
    }
}

//-----------------------------------------------------------------------------
//com.hi.beans.Person2
package com.hi.beans;

public class Person2 implements IPerson2 {

    @Override
    public void eat2() {
        System.out.println("Person2 eat2.");
    }
}

//-----------------------------------------------------------------------------
//com.hi.iocConfig.MyBeanConfig
package com.hi.iocConfig;

import com.hi.beans.Person;
import com.hi.beans.Person2;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MyBeanConfig {

    @Bean
    public Person setPerson(){
        return new Person();
    }

    @Bean
    public Person2 setPerson2(){
        return new Person2();
    }
}

//-----------------------------------------------------------------------------
//com.hi.main.HiMain
package com.hi.main;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
@ComponentScan("com.hi.controllers")
public class HiMain {

    @GetMapping("/")
    public String Index(){
        return "Index";
    }

    public static void main(String[] args){
        SpringApplication.run(HiMain.class, args);
    }
}

```

以上的目录结构中，包`com.hi.beans`中定义了各种接口和其实现类，注意：实现类上并没有使用@Component修饰。

**申明**: Bean的申明逻辑在包`com.hi.iocConfig.MyBeanConfig`中。

**扫描**: 在`com.hi.controllers.HomeController`中进行扫描

**注入**: 在`com.hi.controllers.HomeController`中进行注入









